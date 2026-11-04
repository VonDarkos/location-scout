import {describe, expect, test } from "vitest";

import type { Project } from "../types/project";
import sortProjects from "./sortProjects";


describe("sortProjects",()=>{
        
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
            endDate: "2027-05-15",
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

        const result = sortProjects(projects, "name-asc", [])

        test("sortProjects" , ()=>{
            const name =  result.map((project)=>project.name)

            expect(name).toEqual([ 
                "Spot Spiagge Bianche",
                "Spring Campaign",
                "Summer Campaign",
                "Winter Editorial"
            ])
        })
            

            
        test("does not mutate the original projects array" , ()=>{
            const originalName = projects.map((name)=>name.name)
            sortProjects(projects, "name-desc", [])
            const nameAfterSort = projects.map((project)=>project.name)
           expect(nameAfterSort).toEqual(originalName)
        })

        const resultBudget = sortProjects(projects,"budget-asc", [])
        test("sorts projects by budget ascending" , ()=>{
            const budget = resultBudget.map((project)=>project.locationBudget)
            expect(budget).toEqual([2000,2500,5000,7000])
        })

    })