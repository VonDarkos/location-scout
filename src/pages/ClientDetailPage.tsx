
import useClientQuery from "../features/clients/hooks/useClientQuery";
import usePageTitle from "../shared/hooks/usePageTitle"
import useDeleteClientMutation from "../features/clients/hooks/useDeleteClientMutation";
import useProjectsQuery from "../features/projects/hooks/useProjectsQuery";
import { Link, useNavigate, useParams } from "react-router";


export default function ClientDetailPage() {
  const navigate = useNavigate()
  const {clientId} = useParams<{clientId:string}>()
  const {data:client,isPending:isPendingClient,isError:isErrorClient,error:errorClient}=useClientQuery(clientId)
  usePageTitle(client?.name ?? "Client")
  const {data:projects,isPending:isPendingProjects,isError:isErrorProjects,error:errorProjects}= useProjectsQuery()
  const {mutate:deleteClient,isPending:isPendingDeleteClient,isError:isErrorDeleteClient,error:errorDeleteClient}=useDeleteClientMutation()


  const handleDelete = ()=>{
    if(clientId){
      const isConfirmed = window.confirm(
        "Delete this client?\n\nAll of its projects will be deleted too, together with their location associations.\nThe locations themselves will not be deleted.\n\nThis cannot be undone."
      )
      if(isConfirmed){
        deleteClient(clientId,{onSuccess:()=>navigate(`/clients/`)})
      }
    }
  }


  if(!clientId){
    return <p className="state">Invalid clientId</p>
  }
  
  if(isPendingClient){
    return <p className="state" role="status">Loading Client</p>
  }

  if(isErrorClient){
    return <p className="state state-error" role="alert">{errorClient?.message}</p>
  }

   if(!client){
    return <p className="state">Invalid Client</p>
  }

  if(isPendingProjects){
    return <p className="state" role="status">Loading Project...</p>
  }

  if(isErrorProjects){
    return <p className="state state-error" role="alert">{errorProjects?.message}</p>
  }

   if(!projects){
    return <p className="state">Invalid Projects</p>
  }

  const clientProjects = projects.filter((project)=>project.clientId===client.id)



  return (
    <>
    <div className="page-header">
      <div>
        <h1>{client.name }</h1>
        <div className="badges">
          <span className="badge">{client.companyType}</span>
        </div>
      </div>
      <div className="actions">
        <Link to={`/clients/${client.id}/edit`} className="btn btn-secondary">Edit</Link>
        <button type="button" className="btn btn-danger" disabled={isPendingDeleteClient} onClick={handleDelete}>{isPendingDeleteClient ? "Deleting..." : "Delete Client"}</button>
      </div>
    </div>

    {isErrorDeleteClient&&<p className="alert" role="alert">{errorDeleteClient?.message}</p>}

    <div className="card">
      <dl className="detail-list">
        <div><dt>Contact</dt><dd>{client.contactName}</dd></div>
        <div><dt>Email</dt><dd>{client.email}</dd></div>
        <div><dt>Phone</dt><dd>{client.phone}</dd></div>
      </dl>
    </div>

    <h2 className="section-title">Projects</h2>
    <div className="list">
      {clientProjects.length === 0 ? <p className="empty">No client projects found</p> :
      clientProjects.map((clientProject)=>(
        <div key={clientProject.id} className="list-item">
          <div className="list-item-main">
            <Link to={`/projects/${clientProject.id}`} className="list-item-title">{clientProject.name}</Link>
            <p className="meta">{clientProject.city} · {clientProject.startDate} → {clientProject.endDate}</p>
          </div>
        </div>
        
      ))}
    </div>
    </>
    
  )
}
