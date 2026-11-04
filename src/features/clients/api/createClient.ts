import { API_URL } from "../../../shared/config/api"

import type { Client, ClientInput } from "../types/client"
export default async function createClient(newClient:ClientInput):Promise<Client> {

    const response = await fetch(`${API_URL}/clients`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(newClient)})

    if(!response.ok){
        throw new Error("Error creating client")
    }

    const data:Client = await response.json()
  return data
}
