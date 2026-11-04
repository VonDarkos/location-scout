import { useNavigate, useParams } from "react-router"
import usePageTitle from "../shared/hooks/usePageTitle"
import useProjectQuery from "../features/projects/hooks/useProjectQuery";
import useUpdateProjectMutation from "../features/projects/hooks/useUpdateProjectMutation";
import useClientsQuery from "../features/clients/hooks/useClientsQuery";
import projectToFormState from "../features/projects/utils/projectToFormState";
import type { UpdateProjectInput } from "../features/projects/types/project";
import ProjectForm from "../features/projects/components/ProjectForm";


export default function EditProjectPage() {

  const{projectId}=useParams<{projectId:string}>()
  const navigate = useNavigate()

  const{data:project,isPending:isProjectPending,isError:isProjectError,error:projectError} = useProjectQuery(projectId)
  usePageTitle(project ? `Edit ${project.name}` : "Edit Project")
  const{data:clients,isPending:isClientsPending,isError:isClientsError,error:clientsError}=useClientsQuery()
  const{mutate,isPending:isUpdating,isError:isUpdateError,error:updateError}=useUpdateProjectMutation()

  if(!projectId){
    return <p className="state">Invalid Project</p>
  }

  if(isProjectPending || isClientsPending){
    return <p className="state" role="status">Loading Project....</p>
  }
  if(isProjectError){
    return <p className="state state-error" role="alert">{projectError?.message}</p>
  }
  if(isClientsError){
    return <p className="state state-error" role="alert">{clientsError?.message}</p>
  }
  if(!project){
    return <p className="state">Project not found</p>
  }
  if(!clients || clients.length===0){
    return <p className="state">No Clients Found</p>
  }

  const initialValues = projectToFormState(project)

  const handleUpdateProject = (updatedData:UpdateProjectInput)=>{
    mutate({projectId,data:updatedData},
      {
        onSuccess:()=>{
          navigate(`/projects/${projectId}`);
        },
      },
    )
  }

  return (
    <>
    <div className="page-header"><h1>Edit Project</h1></div>
    {isUpdateError&&<p className="alert" role="alert">{updateError?.message}</p>}

    <ProjectForm initialValue={initialValues} onSubmit={handleUpdateProject} isPending={isUpdating} submitLabel="Update Project" clients={clients} showOperationalStatus/>

    </>
  )
}
