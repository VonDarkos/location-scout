import { API_URL } from "../../../shared/config/api"

import type { Client } from "../types/client"

export default async function getClient(clientId:string):Promise<Client> {

    const response = await fetch(`${API_URL}/clients/${clientId}`)

    if(!response.ok){
        throw new Error("Error loading client")
    }

    const data:Client = await response.json()

  return data
}
