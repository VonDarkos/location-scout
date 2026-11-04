import { http, HttpResponse } from "msw"
import { describe, test, expect, vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, fireEvent  } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import userEvent from "@testing-library/user-event"

import { server } from "../test/mocks/server"
import { API_URL } from "../shared/config/api"
import CreateProjectPage from "./CreateProjectPage"

describe("CreateProjectPage", () => {
  test("show form after clients loading", async () => {

    const receivedProject = vi.fn()
    // 1. Simuliamo il caricamento dei clienti
    server.use(
      http.get(`${API_URL}/clients`, () => {
        return HttpResponse.json([
          {
            id: "c-1",
            name: "Studio Paglioni",
            companyType: "agency",
            contactName: "Federico Paglioni",
            email: "federicopaglioni@mail.it",
            phone: "+3939939393",
          },
        ])
      })
    )
    server.use(
      http.post(`${API_URL}/projects`,async({request})=>{
       const body = await request.json()
                receivedProject(body)
        return HttpResponse.json({
          id:"p1",
          clientId:"c-1",
          name: "Summer Campaign",
          startDate: "2026-12-01",
          endDate: "2027-01-13",
          city:"Barcelona",
          area: "center",
          locationBudget: 2000,
          peopleCount: 10,
          productionType: "fashion",
          operationalStatus: "paused"   
            }, {status:201} )

      })
    )

    // 2. Creiamo un QueryClient isolato
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    // 3. Renderizziamo la pagina
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/projects/new"]}>
          <Routes>
            <Route path="/projects/new" element={<CreateProjectPage/>}/>
            <Route path="/projects/:id" element={<h1>Project Detail Reached</h1>}/>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    const user = userEvent.setup()

    const nameInput = await screen.findByRole("textbox" , {name:"Name"})

    await user.type(nameInput,"Summer Campaign")

    await user.selectOptions(
    screen.getByLabelText("Client"),"c-1")
      
    await user.selectOptions(
      screen.getByLabelText("Production type"), "fashion"
    )

    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2026-11-06" }
      })

    fireEvent.change(screen.getByLabelText("End date"),{
      target:{value:"2026-12-05"}
    })

    await user.type(
      screen.getByLabelText("City"), "Barcelona"
    )

    await user.type(
      screen.getByLabelText("Area"), "center"
    )
//Pulizia e verifica dell'input numerico
    const budget = screen.getByLabelText("Location budget per day (€)")
    await user.clear(budget)
    await user.type(budget,"2000")
    
//Pulizia e verifica dell'input numerico
    const peopleInput = screen.getByLabelText("People count")
    await user.clear(peopleInput)
    await user.type(peopleInput,"10")
  

    await user.click(
      await screen.findByRole("button" , {name:"Create Project"})
    )

    expect(
      await screen.findByRole("heading",{
        name:"Project Detail Reached"
      })
    ).toBeInTheDocument()

    expect(receivedProject).toHaveBeenCalledWith(
  expect.objectContaining({
    name: "Summer Campaign",
    clientId: "c-1",
    city: "Barcelona",
    locationBudget: 2000,
  })
)

  
  })
})