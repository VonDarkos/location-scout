import { useParams } from "react-router";
import usePageTitle from "../shared/hooks/usePageTitle"
import useLocationQuery from "../features/locations/hooks/useLocationQuery";
import locationToFormState from "../features/locations/utils/locationToFormState";
import useUpdateLocationMutation from "../features/locations/hooks/useUpdateLocationMutation";
import { useNavigate } from "react-router";
import type { UpdateLocationInput } from "../features/locations/types/location";
import LocationForm from "../features/locations/components/LocationForm";


export default function EditLocationPage() {
  const{locationId}=useParams<{locationId:string}>()
  const { data, isPending, isError, error } = useLocationQuery(locationId);
  usePageTitle(data ? `Edit ${data.name}` : "Edit Location")
  const {mutate,isPending: isUpdating,isError: isUpdateError,error: updateError,} = useUpdateLocationMutation();
  
  const navigate = useNavigate()
  if(!locationId) return <p className="state">Invalid location</p>
  if(isPending)return <p className="state" role="status">Loading...</p>
  if(isError)return <p className="state state-error" role="alert">{error?.message}</p>
  if (!data) return <p className="state">Location not found</p>;
  
  
  const initialValues = locationToFormState(data)

  
 const handleUpdateLocation = (updatedData:UpdateLocationInput) => {
  mutate({locationId,data:updatedData,},
    {
      onSuccess: () => {
        navigate(`/locations/${locationId}`);
      },
    },
  );
  };
  
  return (
  <>
  <div className="page-header"><h1>Edit Location</h1></div>
  {isUpdateError && <p className="alert" role="alert">{updateError?.message}</p>}
  <LocationForm initialValue={initialValues} onSubmit={handleUpdateLocation} isPending={isUpdating} submitLabel="Update Location"/>
</>
  )
}
