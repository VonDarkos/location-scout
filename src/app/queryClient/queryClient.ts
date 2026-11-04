import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The default (3 retries with backoff) keeps a missing record, e.g. /projects/unknown-id,
      // on "Loading..." for ~7 seconds. One retry still covers a temporary network error.
      retry: 1,
    },
  },
})
