import type { Client } from "../types/client"
import type { ClientFormState } from "../types/clientForm"

export default function clientToFormState(client:Client):ClientFormState {
 return{
   name:client.name,
   companyType:client.companyType,
   contactName:client.contactName,
   email:client.email,
   phone:client.phone
 }
}
