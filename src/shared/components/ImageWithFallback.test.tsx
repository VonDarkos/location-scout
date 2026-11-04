import { describe, expect, test } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import ImageWithFallback from "./ImageWithFallback"

describe("ImageWithFallback", () => {
  test("shows the image while it loads correctly", () => {
    render(<ImageWithFallback src="https://example.com/loft.jpg" alt="Loft Navigli" className="thumb" />)

    expect(screen.getByRole("img", { name: "Loft Navigli" })).toHaveAttribute("src", "https://example.com/loft.jpg")
  })

  test("replaces a broken image with a placeholder that keeps the alt text", () => {
    render(<ImageWithFallback src="https://example.com/broken.jpg" alt="Loft Navigli" className="thumb" />)

    fireEvent.error(screen.getByRole("img", { name: "Loft Navigli" }))

    const placeholder = screen.getByRole("img", { name: "Loft Navigli" })
    expect(placeholder.tagName).toBe("DIV")
    expect(placeholder).toHaveClass("thumb", "image-fallback")
    expect(screen.getByText("No image")).toBeInTheDocument()
  })
})
