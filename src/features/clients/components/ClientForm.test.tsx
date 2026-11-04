import { describe, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ClientForm from "./ClientForm"
import { initialClientFormData } from "../types/clientForm"

describe("ClientForm", () => {
  test("focuses Name and links it to its error on empty submit", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ClientForm initialValue={initialClientFormData} onSubmit={onSubmit} isPending={false} submitLabel="Create Client" />)

    await user.click(screen.getByRole("button", { name: "Create Client" }))

    const nameInput = screen.getByRole("textbox", { name: "Name" })
    expect(nameInput).toHaveFocus()
    expect(nameInput).toHaveAttribute("aria-invalid", "true")
    expect(nameInput).toHaveAccessibleDescription("Name is required")
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test("focuses the first invalid field when the earlier ones are valid", async () => {
    const user = userEvent.setup()
    render(
      <ClientForm
        initialValue={{ ...initialClientFormData, name: "Maison Vela", companyType: "brand", contactName: "Anna", email: "not-an-email" }}
        onSubmit={vi.fn()}
        isPending={false}
        submitLabel="Create Client"
      />,
    )

    await user.click(screen.getByRole("button", { name: "Create Client" }))

    const emailInput = screen.getByRole("textbox", { name: "Email" })
    expect(emailInput).toHaveFocus()
    expect(emailInput).toHaveAccessibleDescription("Enter a valid email address")
    // Phone is invalid too, but comes later in the form
    expect(screen.getByRole("textbox", { name: "Phone" })).toHaveAttribute("aria-invalid", "true")
  })
})
