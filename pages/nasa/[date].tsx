import { useRouter } from "next/router";
import Head from "next/head";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import { fetchImages, useImages } from "../../hooks/index";
/*
SSR (getServerSideProps and paths) is recommended for apps in which you have to pre-render frequently updated data from external sources. 
This technique is especially recommended when the data cannot be statically generated before a user request takes place, 
and at the same time needs to be available to search engines.
*/
interface Props {
  date: string;
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

const NasaByDate = (props: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(["fetchData"], () =>
    fetchImages(props.date)
  );

  return (
    <>
      <Head>
        <title>NASA App</title>
        <meta
          name="NASA app images by search date"
          content="Generated by ryank"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          {router.isFallback || isLoading ? (
            <p>loading...</p>
          ) : props.data ? (
            <div>
              <h1 className="text-center text-3xl p-8">
                Images From {props.date}
              </h1>
              <div className="flex flex-wrap justify-around pt-2">
                {props.data.photos.map((photo) => {
                  return (
                    <div className="p-4 " key={photo.id}>
                      <Image
                        className="rounded-lg"
                        width={250}
                        height={250}
                        src={photo.img_src}
                        alt={`Image from ${photo.camera.full_name}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : data?.data.photos.length === 0 ? (
            <>
              {" "}
              <div className="text-center flex flex-col justify-center h-screen">
                <h1 className="text-lg  sm:text-2xl p-2">
                  Error! No images found for Earth Date: {props.date}{" "}
                </h1>
                <p className="sm:text-xl p-2">
                  Please go to homepage and search a different date{" "}
                </p>
              </div>
            </>
          ) : data?.data.photos ? (
            <>
              <div>
                <h1 className="text-center text-3xl p-8">
                  Images From {props.date}
                </h1>
                <div className="flex flex-wrap justify-around pt-2">
                  {data.data.photos.map((photo) => {
                    return (
                      <div className="p-4" key={photo.id}>
                        <Image
                          className="rounded-lg"
                          width={250}
                          height={250}
                          src={photo.img_src}
                          alt={`Image from ${photo.camera.full_name}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : !data ? (
            <div className="text-center flex flex-col justify-center h-screen">
              <p>An error occurred, please go home and try to search again</p>
            </div>
          ) : isError ? (
            <p> {isError}</p>
          ) : null}
        </>
      </main>
    </>
  );
};
export default NasaByDate;

interface Context {
  params: {
    date: string;
  };
}
export async function getServerSideProps(context: Context) {
  const queryClient = new QueryClient();
  const { date } = context.params;

  await queryClient.prefetchQuery(["fetchData"], () => fetchImages(date));

  return {
    props: {
      date,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export function getServerSidePaths() {
  return {
    paths: [
      {
        params: {
          date: "2015-6-3",
        },
      },
      {
        params: {
          date: "2015-12-15",
        },
      },
    ],
    fallback: true,
  };
}
