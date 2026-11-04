import { API_URL } from "../../../shared/config/api"
import type { UpdateClientInput } from '../types/client'
import type { Client } from '../types/client'
export default async function updateClient(clientId:string,updateClientInput:UpdateClientInput):Promise<Client> {

    const response = await fetch(`${API_URL}/clients/${clientId}` , {method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(updateClientInput)})
 
    if(!response.ok){
        throw new Error("Error updating client")
    }
    const data:Client = await response.json()

    return data
}
