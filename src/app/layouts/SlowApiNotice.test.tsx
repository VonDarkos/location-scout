import { describe, expect, test } from "vitest"
import { act, render, screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import SlowApiNotice from "./SlowApiNotice"

const NOTICE = /waking up the demo server/i

function renderWithRequest(request: Promise<string>, delayMs: number) {
  function PendingRequest() {
    useQuery({ queryKey: ["slow"], queryFn: () => request })
    return null
  }
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={queryClient}>
      <PendingRequest />
      <SlowApiNotice delayMs={delayMs} />
    </QueryClientProvider>,
  )
}

describe("SlowApiNotice", () => {
  test("stays hidden while requests are fast", async () => {
    renderWithRequest(Promise.resolve("ok"), 50)

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)))

    expect(screen.queryByText(NOTICE)).not.toBeInTheDocument()
  })

  test("explains a slow request and disappears when it completes", async () => {
    let finishRequest: (value: string) => void = () => {}
    renderWithRequest(new Promise<string>((resolve) => { finishRequest = resolve }), 50)

    expect(await screen.findByRole("status")).toHaveTextContent(NOTICE)

    await act(async () => finishRequest("ok"))

    // TanStack Query notifies observers in a batch, so the notice goes away asynchronously
    await waitFor(() => expect(screen.queryByText(NOTICE)).not.toBeInTheDocument())
  })
})
