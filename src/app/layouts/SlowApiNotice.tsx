import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { useEffect, useState } from "react"

type SlowApiNoticeProps = {
  delayMs?: number
}

// The demo API runs on a free host that sleeps when idle: the first request can take
// up to a minute. Requests are never that slow otherwise, so a long one gets an explanation.
export default function SlowApiNotice({ delayMs = 4000 }: SlowApiNoticeProps) {
  const isBusy = useIsFetching() + useIsMutating() > 0
  const [isSlow, setIsSlow] = useState(false)

  useEffect(() => {
    if (!isBusy) return
    const timer = setTimeout(() => setIsSlow(true), delayMs)
    return () => {
      clearTimeout(timer)
      setIsSlow(false)
    }
  }, [isBusy, delayMs])

  if (!isBusy || !isSlow) return null

  return (
    <p className="slow-api-notice" role="status">
      Waking up the demo server… The free hosting pauses it when idle, so the first request can take up to a minute.
    </p>
  )
}
