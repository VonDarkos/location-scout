import { useNavigate } from "react-router";
import usePageTitle from "../shared/hooks/usePageTitle"
import useCreateClientMutation from "../features/clients/hooks/useCreateClientMutation";
import type { ClientInput } from "../features/clients/types/client";
import ClientForm from "../features/clients/components/ClientForm";
import { initialClientFormData } from "../features/clients/types/clientForm";

export default function CreateClientPage() {
  usePageTitle("New Client")

  
  const{mutate,isPending,isError,error}=useCreateClientMutation()
  const navigate = useNavigate()

  const handleCreateClient = (data:ClientInput)=>{
    mutate(data,{
      onSuccess:(createdClient)=>{
        navigate(`/clients/${createdClient.id}`)
      }
    })
  }

  return (
    <>
      <div className="page-header"><h1>New Client</h1></div>
      {isError&&<p className="alert" role="alert">{error?.message}</p>}
      <ClientForm  initialValue={initialClientFormData} onSubmit={handleCreateClient} isPending={isPending} submitLabel="Create Client"  />
    </>
  )
}
