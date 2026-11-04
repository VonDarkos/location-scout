import { Link } from 'react-router'
import usePageTitle from "../shared/hooks/usePageTitle"
import useClientsQuery from '../features/clients/hooks/useClientsQuery'

export default function ClientsPage() {
  usePageTitle("Clients")

  const {data:clients,isPending:isPendingClients,isError:isErrorClients,error:errorClients} = useClientsQuery()

  if(isPendingClients){
    return <p className="state" role="status">Loading Clients ...</p>
  }

  if(isErrorClients){
    return <p className="state state-error" role="alert">{errorClients?.message}</p>
  }

  return (
    <>
      <div className="page-header">
        <h1>Clients</h1>
        <Link to="/clients/new" className="btn btn-primary">New Client</Link>
      </div>

      <div className="list">
      {!clients || clients.length===0 ? <p className="empty">No clients found</p> :
      clients.map((client)=>
      (
        <div key={client.id} className="list-item">
          <div className="list-item-main">
            <h2><Link to={`/clients/${client.id}`} className="list-item-title">{client.name}</Link></h2>
            <p className="meta">{client.contactName}</p>
          </div>
          <span className="badge">{client.companyType}</span>
        </div>
      ))}
      </div>
    </>
  )
}
