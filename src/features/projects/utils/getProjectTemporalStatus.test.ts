import { describe,expect,test } from "vitest";
import getProjectTemporalStatus from "./getProjectTemporalStatus";

describe("getProjectTemporalStatus", ()=>{
    test("upcoming before 10/10/2026" , ()=>{
        const result = getProjectTemporalStatus("2026-10-10","2026-10-20","2026-10-05") //l'ultima data è quella che vogliamo testare
        expect (result).toBe("upcoming") //se il 5 ottobre è minore della data d'inizio che è il 10 allora significa che il progetto è upcoming
    })
    test("active === start date" , ()=>{
        const result = getProjectTemporalStatus("2026-10-10","2026-10-20","2026-10-10")
        expect(result).toBe("active")
    })
    test("active between start date and end date", ()=>{
        const result = getProjectTemporalStatus("2026-10-10","2026-10-20","2026-10-15")
        expect(result).toBe("active") //l'ultima data cioè quella che vogliamo testare è maggiore a quella di'inizio 10/10 e minore di quella di fine ovvero 20/10 allora è active
    })
    test("active === endDate", ()=>{
        const result  = getProjectTemporalStatus("2026-10-10","2026-10-20","2026-10-20")
        expect(result).toBe("active")
    })
    test("today>endDate is completed", ()=>{
        const result = getProjectTemporalStatus("2026-10-10","2026-10-20","2026-10-21")
        expect(result).toBe("completed") //data da testare ovvero 21 ottobre è maggiore di data di fine ovvero 20/10 allora è completed
    })
})

