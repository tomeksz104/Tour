"use client";

import Link from "next/link";
//import { useAuthContext } from "@/contexts/AuthContext";
import { useSession } from "next-auth/react";

import { useToast } from "@/hooks/useToast.js";
import useMobileMenu from "@/hooks/useMobileMenu";

import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

import "./Navigation.css";

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
      <nav class="relative w-full z-10 bg-white">
        <div class="px-6 md:px-12 lg:px-7">
          <div class="flex flex-wrap items-center justify-between py-6 gap-6 md:py-4 md:gap-0 relative">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              class="peer hidden"
            />
            <div class="w-full flex justify-between md:w-max md:px-0">
              <a href="#" aria-label="logo">
                <img
                  src="https://tailus.io/sources/blocks/ecommerce-shoes/preview/images/logo.svg"
                  class="w-36 grayscale dark:contrast-50 contrast-200"
                  alt="tailus logo"
                  width="144"
                  height="68"
                />
              </a>

              <div class="flex items-center md:hidden max-h-10">
                <label
                  role="button"
                  for="toggle_nav"
                  aria-label="humburger"
                  id="hamburger"
                  class="relative z-40 px-2 py-3 sm:-mr-6"
                >
                  <div
                    id="line"
                    class="m-auto h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                  <div
                    id="line2"
                    class="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                </label>
              </div>
            </div>

            <label
              role="button"
              for="toggle_nav"
              class="fixed w-full z-30 h-full top-0 left-0 bg-gray-700 bg-opacity-40 hidden peer-checked:block md:peer-checked:hidden"
            ></label>

            <div
              class="flex z-50 flex-col md:flex-row justify-between
                    items-center gap-y-4 p-6 bg-white dark:bg-gray-800 md:w-8/12
                    md:gap-y-4 md:p-0
                    md:bg-transparent lg:w-7/12 fixed top-0 -left-full transition-all duration-500 peer-checked:left-0 max-w-sm h-full
                    md:left-0 md:h-auto w-4/5 md:max-w-none md:relative lg:first-letter:top-0"
            >
              <div class="flex md:hidden w-full pb-5">
                <a href="#" aria-label="logo">
                  <img
                    src="https://tailus.io/sources/blocks/ecommerce-shoes/preview/images/logo.svg"
                    class="w-36 grayscale contrast-200"
                    alt="tailus logo"
                    width="144"
                    height="68"
                  />
                </a>
              </div>
              <div class="block w-full h-full md:h-auto">
                <ul class="space-y-8 tracking-wide font-medium md:flex md:space-y-0">
                  <li>
                    <a href="#" class="block md:px-3">
                      <div
                        class="relative text-yellow-800 dark:text-yellow-300
                                                    before:absolute before:-inset-2 before:w-full before:h-0.5 before:origin-left dark:before:bg-yelloe-500 before:mx-auto before:mt-auto before:rounded-full before:bg-yellow-800"
                      >
                        <span>Mapa</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block md:px-3 group">
                      <div
                        class="relative text-gray-600
                                                    before:absolute before:-inset-2 before:w-full before:h-0.5 before:origin-left dark:before:bg-yellow-500 before:mx-auto before:mt-auto before:rounded-full before:bg-yellow-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
                      >
                        <span class="transition group-hover:text-yellow-700 dark:text-gray-300 dark:group-hover:text-yellow-300">
                          Recenzje
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block md:px-3 group">
                      <div
                        class="relative text-gray-600
                                                    before:absolute before:-inset-2 before:w-full before:h-0.5 before:origin-left dark:before:bg-yelloe-500 before:mx-auto before:mt-auto before:rounded-full before:bg-yellow-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
                      >
                        <span class="transition group-hover:text-yellow-700 dark:text-gray-300 dark:group-hover:text-yellow-300">
                          Cart
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              {!session?.user && (
                <div class="w-full gap-y-4 md:w-full md:gap-y-0 md:gap-x-4 flex md:flex-row flex-col justify-end">
                  <button>
                    <Link
                      class="font-medium text-yellow-700 transition-all duration-150 ease-in-out hover:text-yellow-600"
                      href="/signin"
                    >
                      Sign in
                    </Link>
                  </button>
                  <button class="ml-6">
                    <Link
                      class="inline-flex items-center justify-center rounded-full border border-transparent font-medium px-3 py-1 relative w-full text-yellow-700 transition-all duration:150 ease-in-out button-bg-gradient before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gray-200/10 hover:text-yellow-600 group button-bg-gradient"
                      href="signup"
                    >
                      <span class="relative inline-flex items-center">
                        Sign up
                        <span class="ml-1 tracking-normal transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                          -&gt;
                        </span>
                      </span>
                    </Link>
                  </button>
                </div>
              )}
              {session?.user && <UserMenu user={session?.user} />}
            </div>
          </div>
        </div>
      </nav>
    </>

    // <div class=" relative bg-white border-b-2 border-gray-100">
    //   <div class="px-4 mx-auto sm:px-6">
    //     <div class="flex items-center justify-between py-4">
    //       <Link href="/">
    //         <div class="flex items-center">
    //           <img
    //             class="w-auto h-8 sm:h-10"
    //             src="https://slashapi.com/images/logo-64.png"
    //             alt="Excursionists logo"
    //           />
    //           <span class="ml-2 text-2xl font-extrabold text-gray-700">
    //             Excursionists
    //           </span>
    //         </div>
    //       </Link>

    //       <nav class="hidden space-x-10 md:flex">
    //         <a
    //           href="https://slashapi.com/collections"
    //           class="text-base font-medium text-gray-500 hover:text-gray-900"
    //         >
    //           Collections
    //         </a>

    //         <a
    //           href="https://slashapi.com/pricing"
    //           class="text-base font-medium text-gray-500 hover:text-gray-900"
    //         >
    //           Pricing
    //         </a>

    //         <Link
    //           href="/signin"
    //           class="text-base font-medium text-gray-500 hover:text-gray-900"
    //         >
    //           Sign In
    //         </Link>
    //       </nav>

    //       {!session?.user && (
    //         <div class="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
    //           <Link
    //             href="/signin"
    //             class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
    //           >
    //             Sign in
    //           </Link>
    //           <Link
    //             href="/signup"
    //             class="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
    //           >
    //             Sign up
    //           </Link>
    //         </div>
    //       )}
    //       <div class="flex items-center">
    //         {session?.user && <UserMenu user={session?.user} />}
    //         <button
    //           onClick={handleMobileMenuToggle}
    //           type="button"
    //           class="inline-flex items-center justify-center md:hidden p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    //         >
    //           <span class="sr-only">Open menu</span>
    //           <svg
    //             class="w-6 h-6"
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
