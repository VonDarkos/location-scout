import { useNavigate } from "react-router";
import usePageTitle from "../shared/hooks/usePageTitle"
import useClientsQuery from "../features/clients/hooks/useClientsQuery";
import useCreateProjectMutation from "../features/projects/hooks/useCreateProjectMutation";
import type { CreateProjectInput } from "../features/projects/types/project";
import ProjectForm from "../features/projects/components/ProjectForm";
import { initialProjectFormData } from "../features/projects/types/projectForm";


export default function CreateProjectPage() {
  usePageTitle("New Project")
    const navigate = useNavigate()
    const {data:clients,isPending:isClientsPending,isError:isClientsError,error:clientsError} = useClientsQuery()
    const{mutate,isPending,isError,error}=useCreateProjectMutation()
    const handleCreateProject = (data:CreateProjectInput)=>{
        mutate(data,{
          onSuccess:(createdProject)=>{
            navigate(`/projects/${createdProject.id}`);
          }
        })
      }

      if(isClientsPending){
        return <p className="state" role="status">Loading Clients...</p>
      }

      if(isClientsError){
        return <p className="state state-error" role="alert">{clientsError?.message}</p>
      }

      if(!clients || clients.length===0){
        return <p className="state">No Clients Found</p>
      }

  return (
    <>
    <div className="page-header"><h1>New Project</h1></div>
    {isError&&<p className="alert" role="alert">{error?.message}</p>}

    <ProjectForm initialValue={initialProjectFormData} onSubmit={handleCreateProject} isPending={isPending} submitLabel="Create Project" clients={clients}/>

    </>
  )
}