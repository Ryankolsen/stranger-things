import { useQuery } from "@tanstack/react-query";
import getConfig from "next/config";
interface Data {
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
}
const fetchImages = async (link: string, date: string, limit = 10) => {
  const parsed = await fetch(link)
    .then((res) => res.json())
    .then((data: Data) => {
      return data;
    });
  return parsed;
};

const useImages = (link: string, date: string, limit: number) => {
  return useQuery([
    "images",
    link,
    date,
    limit,
    () => fetchImages(link, date, limit),
  ]);
};

export { useImages, fetchImages };
