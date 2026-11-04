import { useEffect, useRef } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import "./AppLayout.css";


export default function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPathname = useRef(pathname)

  // After a client-side navigation focus would stay on the clicked link (or be lost):
  // move it to the new content. Only pathname changes count, so typing in filters
  // (which updates search params) never steals focus.
  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    mainRef.current?.focus()
  }, [pathname])

  return (
    <>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <header className="app-header">
          <div className="app-header-inner">
            <Link to="/" className="app-brand">
              <span className="app-brand-mark" aria-hidden="true" />
              Location Scout
            </Link>
            <nav className="app-nav" aria-label="Main">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/locations">Locations</NavLink>
                <NavLink to="/clients">Clients</NavLink>
            </nav>
          </div>
        </header>
            <main id="main-content" className="app-main" tabIndex={-1} ref={mainRef}>
                <Outlet/>
            </main>

    </>
  )
}
