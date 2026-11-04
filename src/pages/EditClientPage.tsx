import { useNavigate, useParams } from "react-router";
import usePageTitle from "../shared/hooks/usePageTitle"
import useClientQuery from "../features/clients/hooks/useClientQuery";
import ClientForm from "../features/clients/components/ClientForm";
import clientToFormState from "../features/clients/utils/clientToFormState";
import useUpdateClientMutation from "../features/clients/hooks/useUpdateClientMutation";
import type { UpdateClientInput } from "../features/clients/types/client";



export default function EditClientPage() {

  const {clientId} = useParams<{clientId:string}>()
  const navigate = useNavigate()
  const {data:client,isPending:isPendingClient,isError:isErrorClient,error:errorClient}=useClientQuery(clientId)
  usePageTitle(client ? `Edit ${client.name}` : "Edit Client")
  const {mutate,isPending:isUpdating,isError:isUpdateError,error:updateError} = useUpdateClientMutation()

if(!clientId){
  return <p className="state">Invalid Client</p>
}

  if(isPendingClient){
    return <p className="state" role="status">Loading Client</p>
  }
   
  if(isErrorClient){
    return <p className="state state-error" role="alert">{errorClient?.message}</p>
  }

  if(!client){
    return <p className="state">Client not found</p>
  }

    const initialValue = clientToFormState(client)

    const handleUpdateClient = (updatedClient:UpdateClientInput)=>{
        mutate({clientId,data:updatedClient},
          {onSuccess:()=>{
            navigate(`/clients/${clientId}`)
          }}
        )
    }

  return (
    <>
      <div className="page-header"><h1>Edit Client</h1></div>
      {isUpdateError && <p className="alert" role="alert">{updateError?.message}</p>}
      <ClientForm  initialValue={initialValue} isPending={isUpdating}  onSubmit={handleUpdateClient} submitLabel="Update Client"/>
    </>
  )
  
  
}
