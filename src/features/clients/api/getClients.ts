import { API_URL } from "../../../shared/config/api"

import type { Client } from "../../clients/types/client"
export default async function getClients():Promise<Client[]> {

    const response = await fetch(`${API_URL}/clients`)

    if(!response.ok){
        throw new Error("Error loading Clients")
    }

    const data = await response.json()

  return  data as Client[]
}
