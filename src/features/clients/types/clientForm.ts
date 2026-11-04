import type { Client, CompanyType } from "./client";


export type ClientFormState = Omit<Client,"id" |"companyType"> & { //MI COPIO CLIENT MA CI ELIMINO ID E CAMBIO IL COMPANY TYPE
    companyType : CompanyType | ""
}

export type ClientFormErrors = Partial<Record<keyof ClientFormState, string>>

export const initialClientFormData:ClientFormState = {
    name:"",
    companyType : "", 
    contactName:"",
    email:"",
    phone:""

}