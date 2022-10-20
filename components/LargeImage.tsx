import Image from "next/image";

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
        <button>Prev</button>
        <Image
          className="object-cover object-top "
          src={imageSource}
          alt="image of mars"
          width={700}
          height={700}
        />
        <button>Next</button>
      </div>
      <button onClick={handleCloseClick} className="w-full flex justify-center">
        Close
      </button>
    </>
  );
}

export default LargeImage;
