import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm, Resolver, Controller } from "react-hook-form";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Spinner from "../components/Spinner";
import LargeImage from "../components/LargeImage";
import Hero from "../components/Hero";

//This page loads without hydration/dehydration

interface Props {
  imageData: {
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

interface Inputs {
  inputDate: string;
}

//kept this for reference to use on future applications
const resolver: Resolver<Inputs> = async (values) => {
  return {
    values: values.inputDate ? values : {},
    errors: !values.inputDate
      ? {
          inputDate: {
            type: "minLength",
            message: "Please enter a date in yyyy-mm-dd format.",
          },
        }
      : {},
  };
};

const Home = (props: Props) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["getImages"], {
    initialData: props.imageData,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver });
  const onSubmit = handleSubmit((data) =>
    router.push(`/nasa/${data.inputDate}`)
  );

  const [searchDate, setSearchDate] = useState(new Date());

  const [showBigImage, setShowBigImage] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [error, setError] = useState("");

  function handleSubmitPicker() {
    if (!searchDate) {
      setError("Error, please enter a valid date");
      return;
    }
    const formattedDate = searchDate.toISOString().split("T"[0]);
    const noZeroFormattedDate = formattedDate[0].replace(/-0+/g, "-");
    console.log("handleSubmit", noZeroFormattedDate);
    router.push(`/nasa/${noZeroFormattedDate}`);
  }

  function handleImageClick(imgSrc: string) {
    setImageSource(imgSrc);
    setShowBigImage(true);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NASA App</title>
        <meta name="NASA app homepage" content="Generated by ryank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          <div className="w-fit m-auto min-h-[1000px]">
            <Hero />
            <div className="text-center p-6">
              <p className="p-8 sm:p-6">Search for images by date</p>
              <form>
                <DatePicker
                  // dateFormat={"yyy-M-d"}
                  className="mx-4 text-gray-900 w-24 rounded-sm px-1"
                  selected={searchDate}
                  onChange={(date: Date) => setSearchDate(date)}
                />
                <div className="pt-6">
                  {error ? <p>{error}</p> : null}
                  <button
                    className="mt-8 button"
                    onClick={(e) => {
                      e.preventDefault(), handleSubmitPicker();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
              {/* kept below code for reference only, replaced with calendar picker */}
              {/* <form className="p-4" onSubmit={onSubmit}>
                <label className="p-8">
                  Earth Date:{" "}
                  <input
                    className="mx-4 text-gray-900"
                    placeholder="2020-9-15"
                    {...register("inputDate")}
                  />
                </label>

                <input
                  className="mt-8  sm:mt-auto bg-transparent hover:cursor-pointer hover:bg-blue-500 text-gray-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  type={"submit"}
                />
              </form> */}
              {errors.inputDate && <p>{errors.inputDate.message}</p>}
            </div>

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
              ) : props.imageData ? (
                <div className="flex flex-wrap justify-around">
                  {props.imageData.photos.map((image) => {
                    return (
                      <ul className="p-6" key={image.id}>
                        <li className="  bg-gray-300 ">
                          <button
                            onClick={() => handleImageClick(image.img_src)}
                            className=" hover:scale-105 transform duration-300 ease-in-out flex justify-center"
                          >
                            <Image
                              className="hover:opacity-90 hover:cursor-pointer"
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
              ) : data ? (
                <div className="flex flex-wrap justify-around">
                  {data.photos.map((image) => {
                    return (
                      <div key={image.id}>
                        <Image src={image.img_src} height={250} width={250} />
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const NASA_API = process.env.NASA_API;
  const link = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-8-20&page=1&api_key=${NASA_API}`;

  const imageData = await fetch(link)
    .then((response) => response.json())
    .then((data: Props) => {
      return data;
    });

  return {
    props: {
      imageData,
    },
  };
}

export default Home;
