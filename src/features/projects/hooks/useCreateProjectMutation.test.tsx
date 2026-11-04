import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, type ReactNode } from "react";
import { server } from "../../../test/mocks/server";
import { http, HttpResponse } from "msw";
import { API_URL } from "../../../shared/config/api";
import { renderHook, waitFor } from "@testing-library/react";
import useCreateProjectMutation from "./useCreateProjectMutation";
import type { CreateProjectInput } from "../types/project";

describe("create project" , ()=>{
    
    function createWrapper (){
        const queryClient = new QueryClient({
        defaultOptions : {
            queries:{
                retry:false
            }
        }
    })

    const wrapper = ({children}: {children:ReactNode} )=>{
        return(
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    }
    return {wrapper,queryClient}
}
    test("simulazione Post" , async()=>{

        const receivedProject = vi.fn()

        

        server.use(
            http.post(`${API_URL}/projects`, async ({ request }) => {
                
                const body = await request.json()
                receivedProject(body)
            
            return HttpResponse.json({
                id: "1",
                clientId:"c1",
                name: "Summer Campaign",
                startDate: "2026-12-01",
                endDate: "2027-01-13",
                city:"Barcelona",
                area: "center",
                locationBudget: 2000,
                peopleCount: 10,
                productionType: "fashion",
                operationalStatus: "paused"   
            }, {status:200} )

            
        } ))

        const {result} = renderHook(()=>useCreateProjectMutation(), {wrapper:createWrapper().wrapper})

        const newProject:CreateProjectInput = {
                clientId:"c1",
                name: "Summer Campaign",
                startDate: "2026-12-01",
                endDate: "2027-01-13",
                city:"Barcelona",
                area: "center",
                locationBudget: 2000,
                peopleCount: 10,
                productionType: "fashion",
                operationalStatus: "paused"
        }


        act(() => {
  result.current.mutate(newProject)
  
})

    await waitFor(()=>{
        expect(result.current.isSuccess).toBe(true)
    })

    expect(receivedProject).toHaveBeenCalledWith(newProject)
        

    })

    test("errror" , async()=>{
        const receivedProject = vi.fn()

        

        server.use(
            http.post(`${API_URL}/projects`, async ({ request }) => {
                
                const body = await request.json()
                receivedProject(body)
            
            return HttpResponse.json({message:"Server Error"} , {status:500})           
        } ))

        const {result} = renderHook(()=>useCreateProjectMutation(), {wrapper:createWrapper().wrapper})

        const newProject:CreateProjectInput = {
                clientId:"c1",
                name: "Summer Campaign",
                startDate: "2026-12-01",
                endDate: "2027-01-13",
                city:"Barcelona",
                area: "center",
                locationBudget: 2000,
                peopleCount: 10,
                productionType: "fashion",
                operationalStatus: "paused"
        }

        act(()=>{
            result.current.mutate(newProject)
        })

        await waitFor(()=>{
            expect(result.current.isError).toBe(true)
        })

        expect(result.current.isSuccess).toBe(false)
    })

    test("invalidateQueries" , async()=>{

        server.use(
            http.post(`${API_URL}/projects`, async ({ request }) => {
                const body = await request.json() as CreateProjectInput
                return HttpResponse.json({ id: "1", ...body }, {status:201})
        } ))

        const {wrapper,queryClient} = createWrapper()
        const { result } = renderHook(() => useCreateProjectMutation(),{ wrapper })

        const newProject:CreateProjectInput = {
                clientId:"c1",
                name: "Summer Campaign",
                startDate: "2026-12-01",
                endDate: "2027-01-13",
                city:"Barcelona",
                area: "center",
                locationBudget: 2000,
                peopleCount: 10,
                productionType: "fashion",
                operationalStatus: "paused"
        }

        queryClient.setQueryData(["projects"], [])

        expect(queryClient.getQueryState(["projects"])?.isInvalidated).toBe(false)

        act(()=>{
            result.current.mutate(newProject)
        })

        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
        })

        expect(queryClient.getQueryState(["projects"])?.isInvalidated).toBe(true)
    })

})