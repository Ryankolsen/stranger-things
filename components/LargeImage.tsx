import Image from "next/image";
import MobileClosedDark from "../assets/MobileClosedDark.svg";

interface Props {
  imageSource: string;
  setShowBigImage: React.Dispatch<React.SetStateAction<boolean>>;
}

function LargeImage(props: Props) {
  const { imageSource, setShowBigImage } = props;
  function handleCloseClick() {
    setShowBigImage(false);
  }
  return (
    <>
      <div className="flex justify-center ">
        <div>
          <button
            onClick={handleCloseClick}
            className="w-full absolute -mt-5 text-end pr-2 justify-end  z-20 "
          >
            <Image
              className=" hover:scale-125"
              src={MobileClosedDark}
              alt="Close image window"
              height={20}
              width={20}
            />
          </button>
        </div>
        <div className=" flex h-auto  p-1 sm:p-4"></div>
        <Image
          className="object-cover object-top rounded"
          src={imageSource}
          alt="image of mars"
          width={700}
          height={700}
        />
        <div className=" flex h-auto p-1 sm:p-4"></div>
      </div>
      <div className="w-28 m-auto pb-8">
        <button onClick={handleCloseClick} className="mt-8  button-light-bg">
          Close
        </button>
      </div>
    </>
  );
}

export default LargeImage;
