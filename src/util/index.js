import { locations } from "../api/locations";

export function getLocationName(locationId) {
  const location = locations.filter(item => {
    return Number(item.value) === Number(locationId);
  });

  if (location.length) {
    return location[0].name;
  }
}
