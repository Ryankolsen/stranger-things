import Image from "next/image";
import marsImg from "../assets/mars-about-img.jpg";

interface CardProps {
  cardProps: {
    title: string;
    info: string;
    name: string;
    moreInfo?: string;
  };
}

function Card(cardProps: CardProps) {
  const { info, name, title, moreInfo } = cardProps.cardProps;
  return (
    <>
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div
          className="h-48 sm:h-auto lg:w-[800px] flex bg-black overflow-hidden"
          // style="background-image: url('/img/card-left.jpg')"
          title="Image of planet Mars"
        >
          <div className="m-auto">
            <Image
              className="flex sm:flex-col justify-center"
              src={marsImg}
              height={120}
              width={200}
              objectFit="contain"
              alt="Planet Mars"
            />
          </div>
        </div>

        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl p-2 mb-2">
              {title}
            </div>
            <p className="text-gray-700 text-base p-2">{info}</p>

            {moreInfo ? (
              <p className="text-gray-700 text-base p-2">{moreInfo} </p>
            ) : null}
          </div>
          <div className="flex items-center p-2">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">Created By: {name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
