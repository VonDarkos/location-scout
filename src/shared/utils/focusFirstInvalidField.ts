// Moves focus to the first invalid control of a form, in the order it appears on screen.
// querySelector with a selector list returns the first match in DOM order,
// so the order of fieldNames does not matter.
export default function focusFirstInvalidField(form: HTMLFormElement | null, fieldNames: string[]) {
  if (!form || fieldNames.length === 0) return

  const selector = fieldNames.map((name) => `[name="${name}"]`).join(",")
  form.querySelector<HTMLElement>(selector)?.focus()
}
