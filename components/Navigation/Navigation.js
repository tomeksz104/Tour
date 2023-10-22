"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import Logo from "../Logo";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "./UserMenu";

import "./Navigation.css";

const navigationMenuItems = [
  { name: "Home", url: "/" },
  { name: "Map", url: "/map" },
];

const Navigation = () => {
  const currentRoute = usePathname();
  const { data: session } = useSession();
  const [hideLogo, setHideLogo] = useState(false);

  const handleHideLogo = (value) => {
    setHideLogo(value);
  };

  return (
    <>
      <nav className="relative w-full z-50 bg-white shadow-sm">
        <div className="px-3 lg:px-7">
          <div className="flex items-center justify-between py-1.5 md:py-2.5 gap-3 md:gap-0 relative">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="peer hidden"
            />

            <div className="flex items-center md:hidden max-h-10">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="humburger"
                id="hamburger"
                className="relative z-40 px-2 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </label>
            </div>

            {hideLogo && (
              <Logo
                classes="flex shrink-0 md:hidden"
                imgClasses="h-7 md:h-8 w-full"
              />
            )}

            <label
              role="button"
              htmlFor="toggle_nav"
              className="fixed w-full z-30 h-full top-0 left-0 bg-gray-700 bg-opacity-40 hidden peer-checked:block md:peer-checked:hidden"
            ></label>

            <div
              className="flex  z-50 flex-col md:flex-row 
                    items-center gap-y-4 p-6 bg-white dark:bg-gray-800 md:w-auto
                    md:gap-y-4 md:p-0
                    md:bg-transparent fixed top-0 -left-full transition-all duration-500 peer-checked:left-0 max-w-sm h-full
                    md:left-0 md:h-auto w-4/5 md:relative lg:first-letter:top-0"
            >
              <div className="flex pb-5 md:pb-0">
                <Logo classes="flex shrink-0" imgClasses="h-8 w-auto" />
              </div>

              {/* MENU ORG */}
              <div className="md:ml-5 block w-full md:w-auto h-full md:h-auto">
                <ul className="space-y-8 tracking-wide font-medium md:flex md:space-y-0">
                  {navigationMenuItems.map((menuItem, index) => (
                    <li key={index} className="text-white">
                      <Link href={menuItem.url} className="block md:px-4 group">
                        <div
                          className={`relative before:absolute before:-bottom-2 md:before:-bottom-5 before:w-full before:mt-auto ${
                            currentRoute === menuItem.url
                              ? "text-green-600 before:h-1 before:mx-auto before:rounded-t-full before:bg-green-500"
                              : "text-gray-600 before:h-0.5 before:origin-left before:rounded-full before:bg-green-800 before:transition before:scale-x-0 group-hover:before:scale-x-100"
                          }`}
                        >
                          <span
                            className={`${
                              currentRoute !== menuItem.url &&
                              "group-hover:text-green-500"
                            }`}
                          >
                            {menuItem.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <SearchBar onHideLogo={handleHideLogo} />

            {!session?.user && (
              <div className="relative inline-block text-left dropdown z-10">
                <button className="inline-flex items-center rounded-full hover:ring-green-500 focus:ring-green-500 focus:ring-offset-4 ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4">
                  <span className="h-8 w-8 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                      <img
                        className="h-8 w-8 flex-shrink-0 rounded-full bg-slate-100 dark:bg-slate-800"
                        src="/avatar.svg"
                        alt="user menu"
                      />
                    </div>
                  </span>
                </button>
                <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                  <div
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    role="menu"
                  >
                    <div>
                      <Link
                        href="/signin"
                        className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 mx-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>

                        <span className="mx-1">Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          className="w-5 h-5 mx-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                            fill="currentColor"
                          ></path>
                        </svg>

                        <span className="mx-1">Register</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {session?.user && <UserMenu user={session?.user} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
