import { useQuery } from "@tanstack/react-query";
import getConfig from "next/config";
interface Data {
  data: {
    photos: {
      id: number;
      sol: number;
      camera: {
        id: number;
        name: string;
        rover_id: string;
        full_name: string;
      };
      img_src: string;
      earth_date: string;
      rover: {
        id: number;
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
      };
    }[];
  };
}
const fetchImages = async (date: string) => {
  const parsed = await fetch(`/api/nasa/${date}`)
    .then((res) => res.json())
    .then((data: Data) => {
      return data;
    });
  return parsed;
};

const useImages = (date: string) => {
  return useQuery([date, () => fetchImages(date)]);
};

export { useImages, fetchImages };
