import type { Location } from "../types/location";
import type { LocationFormState } from "../types/locationForm";

export default function locationToFormState(location: Location,): LocationFormState {
  return {
    name:location.name,
    city:location.city,
    address:location.address,
    type:location.type,
    environment:location.environment,
    dailyPrice:String(location.dailyPrice),
    capacity:String(location.capacity),
    surface:String(location.surface),
    parking:location.parking,
    naturalLight:location.naturalLight,
    electricity:location.electricity,
    accessible:location.accessible,
    image:location.image,
    contactName:location.contactName,
    phone:location.phone ?? "",
    email:location.email ?? "",
    description:location.description ?? "",
    notes:location.notes ?? "",
  };
}