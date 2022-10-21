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
      <div className="flex justify-center">
        <div>
          <button
            onClick={handleCloseClick}
            className="w-full absolute text-end  justify-end px-2 z-20 "
          >
            <Image
              src={MobileClosedDark}
              alt="Close image window"
              height={20}
              width={20}
            />
          </button>
        </div>
        <button>Prev</button>
        <Image
          className="object-cover object-top"
          src={imageSource}
          alt="image of mars"
          width={700}
          height={700}
        />
        <button>Next</button>
      </div>
      <div className="w-28 m-auto p-4">
        <button onClick={handleCloseClick} className="mt-8  button-light-bg">
          Close
        </button>
      </div>
    </>
  );
}

export default LargeImage;
