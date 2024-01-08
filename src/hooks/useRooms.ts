import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { RoomTypes } from "src/utils/types";

export const useRooms = ({ enabled = true }: { enabled?: boolean }) => {
  const token = useAppSelector(tokenSelector);

  return useQuery({
    queryKey: ["rooms"],
    queryFn: () =>
      apiClient
        .get({
          url: "/app/rooms",
        })
        .then(response => {
          return response.data as RoomTypes[];
        }),
    enabled: enabled && !!token,
  });
};
export default useRooms;
