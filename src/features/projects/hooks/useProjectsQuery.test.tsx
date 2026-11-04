import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import type {ReactNode } from "react"
import useProjectsQuery from "./useProjectsQuery"
import { http, HttpResponse } from "msw"
import { server } from "../../../test/mocks/server"
import { API_URL } from "../../../shared/config/api"




        


describe("useProjectsQuery", ()=>{

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

    return wrapper
    }
    

    test("recupero" , async()=>{
        server.use(
            http.get(`${API_URL}/projects`, ()=>{
                return HttpResponse.json([{ id: "1", name: "Summer Campaign" },
                                          { id: "2", name: "Winter Editorial" },])
            })
        )

        const {result} = renderHook(()=>useProjectsQuery(), {wrapper:createWrapper()})


    await waitFor(()=>{
        expect(result.current.data).toHaveLength(2)
    })

    expect(result.current.data?.map((project) => project.name)).toEqual([
        "Summer Campaign",
         "Winter Editorial",
        ])

    expect(result.current.isPending).toBe(false)
    expect(result.current.isError).toBe(false)
        
    })

    test("errore API", async()=>{
            server.use(
                http.get(`${API_URL}/projects`, ()=>{
                    return HttpResponse.json({message : "Server Error"}, {status:500})
            }))

           const {result} = renderHook(()=>useProjectsQuery(), {wrapper:createWrapper()})

        await waitFor(()=>{
            expect(result.current.isError).toBe(true) 
        })         
            expect(result.current.isPending).toBe(false)
            expect(result.current.data).toBeUndefined()
            expect(result.current.error?.message).toBe("Error loading projects")
    }) 
})