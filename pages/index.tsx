import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm, Resolver } from "react-hook-form";
import Image from "next/image";

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

  return (
    <div className={styles.container}>
      <Head>
        <title>NASA App</title>
        <meta name="NASA app homepage" content="Generated by ryank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          <h1 className="text-4xl text-center p-4">NASA</h1>

          <div>
            <form className="p-4" onSubmit={onSubmit}>
              <label className="p-8">
                Earth Date:{" "}
                <input className="text-gray-900" {...register("inputDate")} />
              </label>

              <input
                className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type={"submit"}
              />
            </form>
            {errors.inputDate && <p>{errors.inputDate.message}</p>}
          </div>

          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : props.imageData ? (
              <div className="flex flex-wrap justify-around">
                {props.imageData.photos.map((image) => {
                  return (
                    <div key={image.id}>
                      <div>
                        <Image src={image.img_src} height={250} width={250} />
                      </div>{" "}
                    </div>
                  );
                })}
              </div>
            ) : isError ? (
              <p>Error fetching data</p>
            ) : data ? (
              <div>
                {data.photos.map((image) => {
                  return (
                    <div key={image.id}>
                      <img src={image.img_src} />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const NASA_API = process.env.NASA_API;
  const link = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${NASA_API}`;

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
