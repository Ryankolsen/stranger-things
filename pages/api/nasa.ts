// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { date } = req.query;
  console.log("date", date);
  const API_KEY = process.env.NASA_API;

  const link = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-12-15&page=1&api_key=${API_KEY}`;
  const data = await fetch(link).then((res) => res.json());

  res.status(200).json({ data: data });
}
