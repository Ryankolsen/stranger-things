import { NextPage } from "next";
import openMenuSvg from "../assets/MobileOpen.svg";
import closeMenuSvg from "../assets/MobileClosed.svg";
import bellSvg from "../assets/Bell.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useNavStore } from "../hooks/store/zustand";

const Navbar: NextPage = () => {
  const router = useRouter();
  const showMobileMenu = useNavStore((state) => state.showMobileMenu);
  const changeMobileState = useNavStore((state) => state.changeState);
  //NextAuth:
  const { data: session, status } = useSession();
  function handleMobileMenuClick() {
    changeMobileState();
  }

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                onClick={() => handleMobileMenuClick()}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                {showMobileMenu ? (
                  <Image
                    src={closeMenuSvg}
                    alt="Open Menu"
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src={openMenuSvg}
                    alt="Open Menu"
                    height={20}
                    width={20}
                  />
                )}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium link-about">
                    <Link href="/">Home</Link>
                  </div>

                  <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <Link href="/about/">About</Link>
                  </div>
                  <a
                    href="https://www.ryansportkey.com/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Other Projects
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                {/* <!--  outline/bell --> */}
                <Image src={bellSvg} alt="Open Menu" height={20} width={20} />
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3">
                <div className=" ">
                  {session?.user?.image ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => signOut()}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout {session.user.name}
                      </button>
                      <div className="flex flex-col justify-center  ">
                        <Image
                          className="rounded-full"
                          src={session.user.image}
                          height={45}
                          width={45}
                          alt={`Profile image for ${session.user.name}`}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => signIn("discord")}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login With Discord
                    </button>
                  )}
                </div>

                {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on showMobileMenu state. --> */}
        <div
          className={`${
            showMobileMenu ? "visible " : "invisible h-0"
          } sm:invisible sm:h-0  `}
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            <div className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium w-fit cursor-pointer">
              <Link href="/">Home</Link>
            </div>
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              <Link href="/about/">About</Link>
            </div>

            <a
              href="https://www.ryansportkey.com/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Other Projects
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
