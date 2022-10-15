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
  console.log("link", link);

  // const link = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;
  const parsed = await fetch(link)
    .then((res) => res.json())
    .then((data: Data) => {
      return data;
    });
  console.log("parsed", parsed);
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
