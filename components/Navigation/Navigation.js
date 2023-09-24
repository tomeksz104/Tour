"use client";

import Link from "next/link";
//import { useAuthContext } from "@/contexts/AuthContext";
import { useSession } from "next-auth/react";

import { useToast } from "@/hooks/useToast.js";
import useMobileMenu from "@/hooks/useMobileMenu";

import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

import "./Navigation.css";

// const Navigation = ({ session }) => {
const Navigation = () => {
  const { data: session } = useSession();
  const {
    isMobileMenuOpen,
    mobileMenuDismissed,
    handleMobileMenuToggle,
    handleDismissMobileMenu,
  } = useMobileMenu();
  const toast = useToast();

  return (
    <>
      <nav className="relative w-full z-50 bg-white shadow-sm">
        <div className="px-6 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-6 gap-6 md:py-3 md:gap-0 relative">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="peer hidden"
            />
            <div className="w-full flex justify-between py-1 md:w-max md:px-0">
              <a href="#" aria-label="logo">
                <img
                  src="https://tailus.io/sources/blocks/ecommerce-shoes/preview/images/logo.svg"
                  className="w-36 grayscale dark:contrast-50 contrast-200"
                  alt="tailus logo"
                  width="144"
                  height="68"
                />
              </a>

              <div className="flex items-center md:hidden max-h-10">
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="humburger"
                  id="hamburger"
                  className="relative z-40 px-2 py-3 sm:-mr-6"
                >
                  <div
                    id="line"
                    className="m-auto h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                  <div
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                </label>
              </div>
            </div>

            <label
              role="button"
              htmlFor="toggle_nav"
              className="fixed w-full z-30 h-full top-0 left-0 bg-gray-700 bg-opacity-40 hidden peer-checked:block md:peer-checked:hidden"
            ></label>

            <div
              className="flex z-50 flex-col md:flex-row justify-between
                    items-center gap-y-4 p-6 bg-white dark:bg-gray-800 md:w-8/12
                    md:gap-y-4 md:p-0
                    md:bg-transparent lg:w-7/12 fixed top-0 -left-full transition-all duration-500 peer-checked:left-0 max-w-sm h-full
                    md:left-0 md:h-auto w-4/5 md:max-w-none md:relative lg:first-letter:top-0"
            >
              <div className="flex md:hidden w-full pb-5">
                <a href="#" aria-label="logo">
                  <img
                    src="https://tailus.io/sources/blocks/ecommerce-shoes/preview/images/logo.svg"
                    className="w-36 grayscale contrast-200"
                    alt="tailus logo"
                    width="144"
                    height="68"
                  />
                </a>
              </div>
              <div className="block w-full h-full md:h-auto">
                <ul className="space-y-8 tracking-wide font-medium md:flex md:space-y-0">
                  <li>
                    <Link href="/" className="block md:px-4 group">
                      <div className="relative text-gray-600 before:absolute before:-bottom-2 md:before:-bottom-6 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100">
                        <span className="group-hover:text-green-500 dark:text-gray-300 ">
                          Home
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="block md:px-3 group">
                      <div
                        className="relative text-green-600 dark:text-green-400
                        before:absolute before:-bottom-2 md:before:-bottom-6 before:w-full before:h-1 before:mx-auto before:mt-auto before:rounded-t-full before:bg-green-500"
                      >
                        <span>Map</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="block md:px-4 group">
                      <div className="relative text-gray-600 before:absolute before:-bottom-2 md:before:-bottom-6 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100">
                        <span className="group-hover:text-green-500 dark:text-gray-300 ">
                          Reviews
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="block md:px-4 group">
                      <div className="relative text-gray-600 before:absolute before:-bottom-2 md:before:-bottom-6 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100">
                        <span className="group-hover:text-green-500 dark:text-gray-300 ">
                          Services
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              {!session?.user && (
                <div className="w-full flex justify-end">
                  <div>
                    <p className="text-xs">Nie masz konta?</p>
                    <p className="text-sm">
                      <Link
                        className="font-semibold hover:text-green-600 transition-all duration-150 ease-in-out underline"
                        href="/signup"
                      >
                        Zarejestruj się
                      </Link>
                      <span className="whitespace-normal"> lub </span>
                      <Link
                        className="font-semibold hover:text-green-600 transition-all duration-150 ease-in-out underline"
                        href="/signin"
                      >
                        Zaloguj
                      </Link>
                    </p>
                  </div>
                </div>
              )}
              {session?.user && <UserMenu user={session?.user} />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
