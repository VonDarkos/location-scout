import type { TemporalStatus } from "../types/project"

function getTodayDateString():string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

export default function getProjectTemporalStatus(startDate:string, endDate:string, today:string = getTodayDateString()):TemporalStatus {

    if(today<startDate){
        return "upcoming"
    }
    if(today>endDate){
        return "completed"
    }

    return "active"
}
