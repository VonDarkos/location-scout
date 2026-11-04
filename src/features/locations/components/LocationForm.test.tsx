import { describe, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LocationForm from "./LocationForm"
import { initialLocationFormData, type LocationFormState } from "../types/locationForm"

const validWithoutContacts: LocationFormState = {
  ...initialLocationFormData,
  name: "Studio Luce Nord",
  city: "Milano",
  address: "Via Tortona 1",
  type: "studio",
  environment: "indoor",
  dailyPrice: "850",
  capacity: "25",
  surface: "120",
  image: "https://example.com/studio.jpg",
  contactName: "Marco",
}

describe("LocationForm", () => {
  test("focuses Name and links it to its error on empty submit", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LocationForm initialValue={initialLocationFormData} onSubmit={onSubmit} submitLabel="Create Location" />)

    await user.click(screen.getByRole("button", { name: "Create Location" }))

    const nameInput = screen.getByRole("textbox", { name: "Name" })
    expect(nameInput).toHaveFocus()
    expect(nameInput).toHaveAccessibleDescription("Name is required")
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test("focuses Phone when neither phone nor email is given", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LocationForm initialValue={validWithoutContacts} onSubmit={onSubmit} submitLabel="Create Location" />)

    await user.click(screen.getByRole("button", { name: "Create Location" }))

    const phoneInput = screen.getByRole("textbox", { name: "Phone" })
    expect(phoneInput).toHaveFocus()
    expect(phoneInput).toHaveAccessibleDescription("Add at least a phone number or an email")
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true")
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
