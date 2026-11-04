import {vi, afterEach, describe, expect, test } from "vitest";
import filterProjects from "./filterProjects";
import type { Project } from "../types/project";

describe("filterProjects",()=>{

        afterEach(() => {vi.useRealTimers()})

        const projects:Project[] = [
            {id: "1",
            name: "Summer Campaign",
            clientId: "c1",
            productionType: "fashion",
            startDate: "2026-06-01",
            endDate: "2026-06-10",
            city: "Barcelona",
            area: "Center",
            locationBudget: 2000,
            peopleCount: 10,
            operationalStatus: "none",
            },
            {id: "2",
            name: "Winter Editorial",
            clientId: "c2",
            productionType: "video",
            startDate: "2026-09-01",
            endDate: "2026-12-10",
            city: "Madrid",
            area: "Center",
            locationBudget: 5000,
            peopleCount: 12,
            operationalStatus: "paused",
            },

            {id: "3",
            name: "Spring Campaign",
            clientId: "c3",
            productionType: "commercial",
            startDate: "2027-03-01",
            endDate: "2027-5-15",
            city: "Castiglioncello",
            area: "beach",
            locationBudget: 7000,
            peopleCount: 20,
            operationalStatus: "cancelled",
            },

            {
            id:"4",
            name: "Spot Spiagge Bianche",
            clientId: "c4",
            productionType: "commercial",
            startDate: "2027-04-28",
            endDate: "2027-05-28",
            city: "Rosignano",
            area: "beach",
            locationBudget: 2500,
            peopleCount: 10,
            operationalStatus: "none",

            }
        
        ]
        
        test("filtro per search", ()=>{
            const result = filterProjects(projects, {
                search:"winter", //cerchiamo winter
                client:"all",
                budget:"all",
                temporalStatus:"all",
                operationalStatus:"all"
            })
            expect(result).toHaveLength(1) // mi aspetto che il risultato contenga 1 progetto
            expect(result[0].name).toBe("Winter Editorial")  //mi aspetto che il nome del progetto sia Winter Editorial
        })

        test("filtro per client",()=>{ //Testo il client che mi aspetto c2 ed il c2 mi aspetto sia winter editorial
            const result = filterProjects(projects,{
                search:"",
                client:"c2",
                budget:"all",
                temporalStatus:"all",
                operationalStatus:"all"
            })
            expect(result).toHaveLength(1)
            expect(result[0].name).toBe("Winter Editorial")
        })

        test("budget" , ()=>{ //testo il budget e mi aspetto che mi restituisca il progetto tra 1000 e 2500 overo summer campaign
            const result = filterProjects(projects,{
                search:"",
                client:"all",
                budget: "1000-2500",
                temporalStatus:"all",
                operationalStatus:"all"
            })
            expect(result).toHaveLength(2)
            expect(result[0].name).toBe("Summer Campaign")
            expect(result[1].name).toBe("Spot Spiagge Bianche")
        })

        test("operational status", ()=>{ // testo operational status che è pause e mi aspetto che l'unico progetto pause è winter editorial
            const result = filterProjects(projects,{
                    search: "",
                    client: "all",
                    budget: "all",
                    temporalStatus: "all",
                    operationalStatus:"paused" //eccolo qui il test
            })
            expect(result).toHaveLength(1)
            expect(result[0].name).toBe("Winter Editorial")
        })

        test("temporal status" , ()=>{ //testo la data ed imposto progetto con data active ovvero che ancora non sia scaduto o non iniziato e dovrebbe essere quello di winter editorial perchè gli ho dato come data 19/10/2026
            vi.useFakeTimers()
            vi.setSystemTime(new Date(2026, 9 , 19 , 12))

            const result = filterProjects(projects, {
                search: "",
                    client: "all",
                    budget: "all",
                    temporalStatus: "active",
                    operationalStatus:"all"
            })
            expect(result).toHaveLength(1)
            expect(result[0].name).toBe("Winter Editorial")
        })

        test("All filters = winter" , ()=>{ // testo tutti i filtri
            vi.useFakeTimers()
            vi.setSystemTime(new Date(2026, 9 , 19 , 12))
            const result = filterProjects(projects,{
                    search: "winter",
                    client: "c2",
                    budget: "2501-5000",
                    temporalStatus: "active",
                    operationalStatus:"paused"
            })

            expect(result).toHaveLength(1)
            expect(result[0].name).toBe("Winter Editorial")
        })

    
})