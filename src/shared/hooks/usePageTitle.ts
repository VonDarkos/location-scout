import { useEffect } from "react"

const APP_NAME = "Location Scout"

// Each route sets its own document title, read first by screen readers after navigation.
export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · ${APP_NAME}`
  }, [title])
}
