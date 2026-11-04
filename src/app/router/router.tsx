import AppLayout from "../layouts/AppLayout";
import { createBrowserRouter } from "react-router";
import DashboardPage from "../../pages/DashboardPage";
import ProjectsPage from "../../pages/ProjectsPage";
import CreateProjectPage from "../../pages/CreateProjectPage";
import ProjectDetailPage from "../../pages/ProjectDetailPage";
import EditProjectPage from "../../pages/EditProjectPage";
import AddProjectLocationsPage from "../../pages/AddProjectLocationsPage";
import LocationsPage from "../../pages/LocationsPage";
import CreateLocationPage from "../../pages/CreateLocationPage";
import LocationDetailPage from "../../pages/LocationDetailPage";
import EditLocationPage from "../../pages/EditLocationPage";
import ClientsPage from "../../pages/ClientsPage";
import CreateClientPage from "../../pages/CreateClientPage";
import ClientDetailPage from "../../pages/ClientDetailPage";
import EditClientPage from "../../pages/EditClientPage";
import NotFoundPage from "../../pages/NotFoundPage";
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
        {index: true, element: <DashboardPage />,},
        {path:"projects", element:<ProjectsPage/>},
        {path:"projects/new", element:<CreateProjectPage/>},
        {path:"projects/:projectId", element:<ProjectDetailPage/>},
        {path:"projects/:projectId/edit", element:<EditProjectPage/>},
        {path:"projects/:projectId/locations/add", element:<AddProjectLocationsPage/>},
        {path:"locations", element:<LocationsPage/>},
        {path:"locations/new", element:<CreateLocationPage/>},
        {path:"locations/:locationId", element:<LocationDetailPage/>},
        {path:"locations/:locationId/edit", element:<EditLocationPage/>},
        {path:"clients", element:<ClientsPage/>},
        {path:"clients/new", element:<CreateClientPage/>},
        {path:"clients/:clientId", element:<ClientDetailPage/>},
        {path:"clients/:clientId/edit", element:<EditClientPage/>},
        {path:"*", element:<NotFoundPage/>}
    ],
  },
]);
