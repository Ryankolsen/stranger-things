import heroImg from "../assets/mars-space-image.jpg";
import Image from "next/image";
import { useNavStore } from "../hooks/store/zustand";

function Hero() {
  const showMobileMenu = useNavStore((state) => state.showMobileMenu);
  return (
    <>
      <div className="w-fit mx-auto enter">
        <Image
          className="w-full object-cover object-top opacity-50"
          src={heroImg}
          alt="image of mars"
          width={1280}
          height={460}
        />
      </div>
      <div
        className={
          showMobileMenu
            ? "absolute top-56 inset-x-3 text-center text-gray-50  sm:left-a sm:top-32 lg:top-48 "
            : " absolute top-28 sm:top-32 lg:top-48 inset-x-3  self-center  text-center text-gray-50 "
        }
      >
        <h1 className="text-4xl md:5xl lg:text-6xl">NASA</h1>
        <p className="pt-4 text-2xl md:3xl lg:text-4xl">
          Search the Mars Rover API
        </p>
      </div>
    </>
  );
}
export default Hero;
