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
    // <>
    //   <nav className="absolute w-full">
    //     <div className="relative z-30 bg-white dark:bg-gray-900">
    //       <div className="container m-auto md:px-12 lg:py-0 lg:px-10">
    //         <div className="flex flex-wrap items-center justify-between py-4 gap-6 md:gap-0">
    //           <input
    //             type="checkbox"
    //             name="toggle_nav"
    //             id="toggle_nav"
    //             className="peer hidden"
    //           />
    //           <div className="w-full px-6 flex justify-between md:w-max md:px-0 z-30">
    //             <a href="#" aria-label="logo">
    //               <img
    //                 src="images/logo.svg"
    //                 className="w-36 dark:hidden"
    //                 alt="tailus logo"
    //                 width="144"
    //                 height="68"
    //               />
    //               <img
    //                 src="images/logo-white.svg"
    //                 className="w-36 hidden dark:block"
    //                 alt="tailus logo"
    //                 width="144"
    //                 height="68"
    //               />
    //             </a>

    //             <div className="flex items-center md:hidden max-h-10">
    //               <label
    //                 role="button"
    //                 htmlFor="toggle_nav"
    //                 aria-label="humburger"
    //                 id="hamburger"
    //                 className="relative p-2"
    //               >
    //                 <div
    //                   id="line"
    //                   className="m-auto h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
    //                 ></div>
    //                 <div
    //                   id="line2"
    //                   className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
    //                 ></div>
    //               </label>
    //             </div>
    //           </div>
    //           <label
    //             htmlFor="toggle_nav"
    //             className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-green-200 bg-opacity-30 backdrop-blur backdrop-filter"
    //           ></label>
    //           <div
    //             className="hidden z-40 peer-checked:flex w-11/12 mx-auto md:mx-0 flex-col
    //                         justify-end items-center gap-y-8 p-6
    //                         rounded-xl bg-white dark:bg-gray-800 md:flex md:w-8/12
    //                         md:gap-y-0 md:gap-x-4 md:divide-x md:p-0
    //                         md:flex-row md:bg-transparent lg:w-7/12"
    //           >
    //             <div className="block w-full md:w-max">
    //               <ul
    //                 className="gap-y-6 tracking-wide
    //                                 text-gray-500 dark:text-gray-300 font-medium flex flex-col md:flex-row md:gap-y-0"
    //               >
    //                 <li>
    //                   <a href="#" className="block md:px-4">
    //                     <div
    //                       className="relative text-green-600 dark:text-green-400
    //                                                         before:absolute before:-bottom-2 md:before:-bottom-7 before:w-full before:h-1 before:mx-auto before:mt-auto before:rounded-t-full before:bg-green-500"
    //                     >
    //                       <span>Home</span>
    //                     </div>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" className="block md:px-4 group">
    //                     <div
    //                       className="relative group
    //                                                         before:absolute before:-bottom-2 md:before:-bottom-7 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
    //                     >
    //                       <span className="group-hover:text-green-500">
    //                         Services
    //                       </span>
    //                     </div>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" className="block md:px-4 group">
    //                     <div
    //                       className="relative group
    //                                                         before:absolute before:-bottom-2 md:before:-bottom-7 before:w-full before:h-0.5 before:origin-left before:mt-auto before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
    //                     >
    //                       <span className="group-hover:text-green-500">About</span>
    //                     </div>
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>

    //             <div
    //               className="w-full pl-2
    //                             sm:w-max gap-4 flex min-w-max flex-col sm:flex-row"
    //             >
    //               <button
    //                 type="button"
    //                 title="Start buying"
    //                 className="w-full py-3 px-6 rounded-xl text-center transition dark:active:bg-green-900 dark:focus:bg-gray-800 active:bg-green-200 focus:bg-green-100 sm:w-max"
    //               >
    //                 <span className="block text-green-600 dark:text-green-500 font-semibold">
    //                   Login
    //                 </span>
    //               </button>
    //               <button
    //                 type="button"
    //                 title="Start buying"
    //                 className="w-full py-3 px-6 rounded-xl text-center transition bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-500 sm:w-max"
    //               >
    //                 <span className="block text-white font-semibold">
    //                   Book Demo
    //                 </span>
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       aria-hidden="true"
    //       className="container h-4 -mt-6 mx-auto bg-green-600/30 dark:bg-green-900/30 blur md:-mt-4"
    //     ></div>
    //   </nav>
    // </>
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
                        href="/signin"
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
                // <div className="w-full gap-y-4 md:w-full md:gap-y-0 md:gap-x-4 flex md:flex-row flex-col justify-end">
                //   <button>
                //     <Link
                //       className="font-medium text-green-600 transition-all duration-150 ease-in-out hover:text-green-500"
                //       href="/signin"
                //     >
                //       Sign in
                //     </Link>
                //   </button>
                //   <button className="ml-6">
                //     <Link
                //       className="inline-flex items-center justify-center rounded-full border border-transparent font-medium px-3 py-1 relative w-full text-green-600 transition-all duration:150 ease-in-out button-bg-gradient before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gray-200/10 hover:text-green-500 group"
                //       href="signup"
                //     >
                //       <span className="relative inline-flex items-center">
                //         Sign up
                //         <span className="ml-1 tracking-normal transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                //           -&gt;
                //         </span>
                //       </span>
                //     </Link>
                //   </button>
                // </div>
              )}
              {session?.user && <UserMenu user={session?.user} />}
            </div>
          </div>
        </div>
      </nav>
    </>

    // <div className=" relative bg-white border-b-2 border-gray-100">
    //   <div className="px-4 mx-auto sm:px-6">
    //     <div className="flex items-center justify-between py-4">
    //       <Link href="/">
    //         <div className="flex items-center">
    //           <img
    //             className="w-auto h-8 sm:h-10"
    //             src="https://slashapi.com/images/logo-64.png"
    //             alt="Excursionists logo"
    //           />
    //           <span className="ml-2 text-2xl font-extrabold text-gray-700">
    //             Excursionists
    //           </span>
    //         </div>
    //       </Link>

    //       <nav className="hidden space-x-10 md:flex">
    //         <a
    //           href="https://slashapi.com/collections"
    //           className="text-base font-medium text-gray-500 hover:text-gray-900"
    //         >
    //           Collections
    //         </a>

    //         <a
    //           href="https://slashapi.com/pricing"
    //           className="text-base font-medium text-gray-500 hover:text-gray-900"
    //         >
    //           Pricing
    //         </a>

    //         <Link
    //           href="/signin"
    //           className="text-base font-medium text-gray-500 hover:text-gray-900"
    //         >
    //           Sign In
    //         </Link>
    //       </nav>

    //       {!session?.user && (
    //         <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
    //           <Link
    //             href="/signin"
    //             className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
    //           >
    //             Sign in
    //           </Link>
    //           <Link
    //             href="/signup"
    //             className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
    //           >
    //             Sign up
    //           </Link>
    //         </div>
    //       )}
    //       <div className="flex items-center">
    //         {session?.user && <UserMenu user={session?.user} />}
    //         <button
    //           onClick={handleMobileMenuToggle}
    //           type="button"
    //           className="inline-flex items-center justify-center md:hidden p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    //         >
    //           <span className="sr-only">Open menu</span>
    //           <svg
    //             className="w-6 h-6"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             aria-hidden="true"
    //           >
    //             <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               d="M4 6h16M4 12h16M4 18h16"
    //             ></path>
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <MobileMenu
    //     isMobileMenuOpen={isMobileMenuOpen}
    //     mobileMenuDismissed={mobileMenuDismissed}
    //     handleDismissMobileMenu={handleDismissMobileMenu}
    //   />
    // </div>
  );
};

export default Navigation;
