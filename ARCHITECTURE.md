# Architecture

This document explains how Location Scout is organised and why. It is meant for anyone reading or extending the code.

## Feature-based structure

Code is grouped by domain feature, not by technical type.

```text
src/
├── app/                 # application wiring: router, AppLayout, QueryClient
├── pages/               # one component per route
├── features/
│   ├── clients/         # api/ components/ hooks/ types/ utils/
│   ├── locations/       # ... + store/ for favorites
│   ├── projects/        # ... including the project ↔ location workflow
│   └── dashboard/       # selectors that pick data for the dashboard
├── shared/              # code that knows nothing about the domain
│   ├── components/      # e.g. ImageWithFallback
│   ├── config/          # API base URL
│   ├── hooks/           # e.g. usePageTitle
│   ├── types/           # ProjectLocation, used by both projects and locations
│   └── utils/           # e.g. focusFirstInvalidField
└── test/                # test setup and the MSW server
```

Rules followed throughout:

- If something belongs to one feature, it stays in that feature (`LocationCard`, `useLocationsQuery`, `getProjectTemporalStatus`).
- `shared/` holds only code without domain knowledge, or types that sit between two features.
- **Pages compose, features decide.** A page reads route params, calls feature hooks and arranges feature components. Business rules live in feature utilities and API functions, where they can be tested on their own.
- Tests sit next to the code they test. `src/test/` contains only shared test infrastructure.
- Folders are created only when something needs to live in them.

Inside a feature the flow is always the same:

```text
api/      fetch functions: one HTTP concern each, throw on !response.ok
hooks/    TanStack Query wrappers around api/ (queries and mutations)
utils/    pure domain logic (filters, sorting, derived status)
components/  UI for this feature only
types/    domain types and form state types
```

## Server state: TanStack Query

Clients, Projects, Locations and ProjectLocations come from the API, so TanStack Query owns them: fetching, caching, loading and error states, and keeping them fresh after mutations.

- **Query keys** follow the shape of the data: `["projects"]`, `["projects", id]`, `["projects", id, "locations"]`.
- **Mutations invalidate** what they change. Cascades are explicit: deleting a location also invalidates every `["projects", id, "locations"]` query, because the location disappears from those lists.
- **Deleted records are removed** from the cache with `removeQueries`, so a stale detail page cannot be shown.
- **One retry** for failed queries: the default (three retries with backoff) left a missing record on "Loading…" for about seven seconds.
- **No optimistic updates.** Mutations are quick against a local API, and invalidation keeps the code simple and correct.

## Client state: Zustand

Zustand holds a single thing: `favoriteLocationIds`. It is a preference of this browser that the server does not know about, so it is saved to `localStorage` with the `persist` middleware.

API data is never copied into Zustand. Two copies of the same data would sooner or later disagree.

## Routing: React Router

- `AppLayout` is a layout route (navigation + `<Outlet />`) shared by every page. It also moves focus to the main content after each navigation, and holds the skip link.
- Dynamic segments (`/projects/:projectId`) identify records; nested paths express actions (`/projects/:projectId/edit`, `/projects/:projectId/locations/add`).
- **Search, filters and sort are search params**, read and written by `useProjectFiltersParams` and `useLocationFiltersParams`. The URL is the single source of truth for these controls: they survive a refresh and can be shared.
- Unknown paths render `NotFoundPage`.

## Domain rules

| Rule | Where |
| --- | --- |
| Temporal status from start / end dates (not stored) | `features/projects/utils/getProjectTemporalStatus.ts` |
| Capacity blocks selection; budget and city only warn | `pages/AddProjectLocationsPage.tsx` → `LocationSelectionCard` |
| New project locations start as `candidate` | `features/projects/api/createProjectLocations.ts` |
| Approval assigns the next order; ↑ / ↓ swap orders | `pages/ProjectDetailPage.tsx` |
| Cascade deletes | `features/*/api/delete*.ts` |

### Why cascades are in the frontend

JSON Server stores plain JSON: it has no foreign keys and no transactions. To keep data consistent, the API functions delete the dependent records first (for example a project's `ProjectLocation`s) and then the record itself.

This is a teaching compromise. With a real backend the server would do it, in one transaction, so a failure halfway through cannot leave orphaned records.

## Forms

Forms use controlled inputs and plain TypeScript validation, without a form library. Each form:

- keeps string state for inputs and converts to domain types on submit;
- validates on submit, shows a message under each invalid field, and links it with `aria-describedby` and `aria-invalid`;
- moves focus to the first invalid field (`focusFirstInvalidField`, which uses the form element and the fields' `name` attributes, not one ref per input).

## Testing strategy

- **Vitest + React Testing Library**, querying by role and accessible name, the way users find things.
- **MSW** mocks the HTTP layer, so hooks and pages are tested against real `fetch` calls.
- Each test builds its own `QueryClient` (no retries) and resets the Zustand store when needed, so tests do not affect each other.
- `NODE_ENV` is forced to `test` in `vite.config.ts`. React's development build, which provides `act`, then loads even when the shell exports `NODE_ENV=production`.
