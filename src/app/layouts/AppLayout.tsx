import {  NavLink, Outlet} from "react-router";




export default function AppLayout() {
  return (
    <>
        <nav>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/locations">Locations</NavLink>
            <NavLink to="/clients">Clients</NavLink> 
        </nav>
            <main>
                <Outlet/>
            </main>
        
    </>
  )
}
