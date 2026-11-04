import { Link } from "react-router";
import usePageTitle from "../shared/hooks/usePageTitle"

export default function NotFoundPage() {
  usePageTitle("Page Not Found")
  return (
    <div className="state">
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
    </div>
  )
}
