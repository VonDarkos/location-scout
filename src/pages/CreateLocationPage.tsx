
import useCreateLocationMutation from "../features/locations/hooks/useCreateLocationMutation";
import usePageTitle from "../shared/hooks/usePageTitle"
import type { CreateLocationInput} from "../features/locations/types/location";
import { useNavigate } from "react-router";
import { initialLocationFormData} from "../features/locations/types/locationForm";
import LocationForm from "../features/locations/components/LocationForm";

export default function CreateLocationPage() {
  usePageTitle("New Location")

  const{mutate,isPending,isError,error}=useCreateLocationMutation()
  const navigate = useNavigate()
  const handleCreateLocation = (data:CreateLocationInput)=>{
    mutate(data,{
      onSuccess:(createdLocation)=>{
        navigate(`/locations/${createdLocation.id}`);
      }
    })
  }
  
  return (
    <>
    <div className="page-header"><h1>New Location</h1></div>
    {isError&&<p className="alert" role="alert">{error?.message}</p>}
    <LocationForm initialValue={initialLocationFormData} onSubmit={handleCreateLocation} isPending={isPending} submitLabel="Create Location"/>
    </>
  );
}
