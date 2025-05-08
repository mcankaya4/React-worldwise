import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // Değerleri yakalıyoruz.
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
