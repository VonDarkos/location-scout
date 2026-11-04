import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryRouter, RouterProvider } from "react-router"
import AppLayout from "./AppLayout"
import NotFoundPage from "../../pages/NotFoundPage"

function renderLayout(initialPath: string) {
  const router = createMemoryRouter(
    [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <h1>Dashboard</h1> },
          { path: "/clients", element: <h1>Clients</h1> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )
  render(<RouterProvider router={router} />)
}

describe("AppLayout", () => {
  test("does not steal focus on the first render", () => {
    renderLayout("/")

    expect(screen.getByRole("main")).not.toHaveFocus()
  })

  test("moves focus to the main content after navigating", async () => {
    const user = userEvent.setup()
    renderLayout("/")

    await user.click(screen.getByRole("link", { name: "Clients" }))

    expect(screen.getByRole("heading", { name: "Clients" })).toBeInTheDocument()
    expect(screen.getByRole("main")).toHaveFocus()
  })

  test("sets the document title of the current page", () => {
    renderLayout("/a-page-that-does-not-exist")

    expect(document.title).toBe("Page Not Found · Location Scout")
  })
})
