import React from "react";
import Card from "../components/Card";
import Image from "next/image";
import roverImg from "../assets/rover-img.jpg";

function about() {
  const cardProps = {
    title: "About: This site connects to the NASA API",
    info: `This is a Typescript, NextJS application built using Server Side Rendering with React Query (Tanstack) to help prefetch data and use hydration to manage the process of caching and refetching queries.
    In order to get around the way Next uses environmental variables I used an api route to fetch data and handle the env variables securely.    
    `,
    moreInfo: `Also...this application is titled "Stranger Things" because I intended to use the Stranger things API...however, the API is quite pricey so Instead check out this app that links up to a NASA API! You're Welcome!`,
    name: "Ryan Olsen",
  };
  return (
    <div className="p-12">
      <div className="flex justify-center">
        <Card cardProps={cardProps} />
      </div>
      <div className="flex justify-center p-20 ">
        <Image src={roverImg} height={1000} width={1500} />
      </div>
    </div>
  );
}

export default about;
