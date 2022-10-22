import Image from "next/image";
import { useState } from "react";
import LargeImage from "./LargeImage";
import Spinner from "./Spinner";

interface Props {
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

  isLoading: boolean;
  isError: boolean;
}

function DisplayImg(props: Props) {
  const { isLoading, isError, photos } = props;

  const [showBigImage, setShowBigImage] = useState(false);
  const [imageSource, setImageSource] = useState("");

  function handleImageClick(imgSrc: string) {
    setImageSource(imgSrc);
    setShowBigImage(true);
  }
  return (
    <>
      {/* Handle large image view when thumbnail is clicked */}
      {showBigImage ? (
        <div className="fixed m-auto pt-6 top-10 left-0 right-0 z-10 w-fit h-fit bg-gray-300 rounded-md">
          <div>
            <LargeImage
              imageSource={imageSource}
              setShowBigImage={setShowBigImage}
            />
          </div>{" "}
        </div>
      ) : null}
      <div>
        {isLoading ? (
          <Spinner />
        ) : photos ? (
          <div className="flex flex-wrap justify-around">
            {photos.map((image) => {
              return (
                <ul className="p-6" key={image.id}>
                  <li className="  bg-gray-300 ">
                    <button
                      onClick={() => handleImageClick(image.img_src)}
                      className=" hover:scale-105 transform duration-300 ease-in-out flex justify-center"
                    >
                      <Image
                        className="hover:opacity-90 hover:cursor-pointer"
                        alt={`Image from Mars rover date: ${image.earth_date}`}
                        src={image.img_src}
                        height={250}
                        width={250}
                      />
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : photos ? (
          <div className="flex flex-wrap justify-around">
            {props.photos.map((image) => {
              return (
                <div key={image.id}>
                  <Image src={image.img_src} height={250} width={250} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default DisplayImg;
