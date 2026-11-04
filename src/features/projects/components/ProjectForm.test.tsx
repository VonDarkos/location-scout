
import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import ProjectForm from './ProjectForm';
import type { ProjectFormState } from '../types/projectForm';
import type { Client } from '../../clients/types/client';

const initialValue: ProjectFormState = {
  name: "",
  clientId: "",
  startDate: "",
  endDate: "",
  city: "",
  area: "",
  locationBudget: "",
  peopleCount: "",
  description: "",
  notes: "",
  productionType: "",
  operationalStatus: "none",
}

const clients:Client[] = [{id:"c1", name: "Mario Rossi", companyType: "brand", contactName: "Mario", email: "mariorossi@gmail.com", phone: "333333333"}]

describe('ProjectForm', () => {
  test('shows validation errors on empty submit', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<ProjectForm initialValue={initialValue} isPending={false} onSubmit={onSubmit} submitLabel='Create Project' clients={[]}/> )
  

    await user.click(
      screen.getByRole('button', { name: 'Create Project' })
    );

  
    expect(
        screen.getByText('Name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  //DOPO OGNI TEST NELLA ROUTE src/test/setup.ts ho aggiunto cleanup in modo da ripulire prima di iniziare un nuovo test

  test("calls onSubmit with valid project data" , async()=>{
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ProjectForm initialValue={initialValue} isPending={false} onSubmit={onSubmit} submitLabel='Create Project' clients={clients}/> )
    
    await user.selectOptions(
      screen.getByRole("combobox", {name:"Client"}),"c1"
    )

    await user.type(
      screen.getByRole("textbox", {name:"Name"}),"Summer Campaign"
    )

    await user.selectOptions(
      screen.getByRole("combobox" , {name:"Production type"}),"fashion"
    )

    fireEvent.change(screen.getByLabelText("Start date"), {
  target: { value: "2026-11-01" }
  })

  fireEvent.change(screen.getByLabelText("End date"), {
  target: { value: "2026-12-01" }
})

await user.type(
  screen.getByRole("textbox", {name:"City"}),"Barcelona"
)

await user.type(
  screen.getByRole("textbox" , {name:"Area"}),"center"
)

await user.type(
  screen.getByRole("spinbutton", {name:"Location budget per day (€)"}),"2000"
)

await user.type(
  screen.getByRole("spinbutton", {name:"People count"}),"10"
)

await user.click(
  screen.getByRole("button", {name:"Create Project"})
)

expect(onSubmit).toHaveBeenCalledTimes(1)

expect(onSubmit).toHaveBeenCalledWith(
  expect.objectContaining({
    clientId:"c1",
    name:"Summer Campaign",
    productionType:"fashion",
    startDate: "2026-11-01", 
    endDate : "2026-12-01",
    city : "Barcelona",
    area: "center",
    locationBudget: 2000,
    peopleCount: 10,

  })
) 
  })

  test("prevents submit when end date is before start date" , async()=>{
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    const invalidDateValues: ProjectFormState = { //COPIO TYPE E DATI DEL TEST PRECEDENTE IN MODO DA NON RIVERIFICARE COL TYPE TUTTO 
      ...initialValue, startDate: "2026-11-20",
       endDate: "2026-11-10",
        clientId:"c1",
        name:"Summer Campaign",
        productionType:"fashion",
        city : "Barcelona",
        area: "center",
        locationBudget: "2000",
        peopleCount: "10",
         
    }
    render(<ProjectForm initialValue={invalidDateValues} isPending={false} onSubmit={onSubmit} submitLabel='Create Project' clients={clients}/> )
    await user.click(
      screen.getByRole("button", {name:"Create Project"})
    )
    expect(
      screen.getByText("End date cannot be before start date")
    ).toBeInTheDocument()

    expect(onSubmit).not.toHaveBeenCalled()
  })

  test("focuses Name and links it to its error on empty submit", async () => {
    const user = userEvent.setup()
    render(<ProjectForm initialValue={initialValue} isPending={false} onSubmit={vi.fn()} submitLabel='Create Project' clients={clients}/> )

    await user.click(screen.getByRole("button", {name:"Create Project"}))

    const nameInput = screen.getByRole("textbox", {name:"Name"})
    expect(nameInput).toHaveFocus()
    expect(nameInput).toHaveAttribute("aria-invalid", "true")
    expect(nameInput).toHaveAccessibleDescription("Name is required")
  })

  test("focuses the first invalid field when Name is valid", async () => {
    const user = userEvent.setup()
    const missingClientAndCity: ProjectFormState = {
      ...initialValue,
      name: "Summer Campaign",
      productionType: "fashion",
      startDate: "2026-11-01",
      endDate: "2026-12-01",
      area: "center",
      locationBudget: "2000",
      peopleCount: "10",
    }
    render(<ProjectForm initialValue={missingClientAndCity} isPending={false} onSubmit={vi.fn()} submitLabel='Create Project' clients={clients}/> )

    await user.click(screen.getByRole("button", {name:"Create Project"}))

    expect(screen.getByRole("combobox", {name:"Client"})).toHaveFocus()
    expect(screen.getByRole("textbox", {name:"Name"})).toHaveAttribute("aria-invalid", "false")
    // City is invalid too, but comes later in the form
    expect(screen.getByRole("textbox", {name:"City"})).toHaveAttribute("aria-invalid", "true")
  })

  test("focuses End date when it is before Start date", async () => {
    const user = userEvent.setup()
    const invalidDateValues: ProjectFormState = {
      ...initialValue,
      name: "Summer Campaign",
      clientId: "c1",
      productionType: "fashion",
      startDate: "2026-11-20",
      endDate: "2026-11-10",
      city: "Barcelona",
      area: "center",
      locationBudget: "2000",
      peopleCount: "10",
    }
    render(<ProjectForm initialValue={invalidDateValues} isPending={false} onSubmit={vi.fn()} submitLabel='Create Project' clients={clients}/> )

    await user.click(screen.getByRole("button", {name:"Create Project"}))

    const endDateInput = screen.getByLabelText("End date")
    expect(endDateInput).toHaveFocus()
    expect(endDateInput).toHaveAccessibleDescription("End date cannot be before start date")
  })

});
