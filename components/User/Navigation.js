"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const Navigation = () => {
  const currentRoute = usePathname();

  return (
    <ScrollArea className="whitespace-nowrap px-3">
      <div className="block bg-white">
        <div className="border-b border-gray-200">
          <nav
            className="justify-center -mb-px flex space-x-8"
            aria-label="Tabs"
          >
            <Link
              href="/user/places"
              className={`group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
               ${
                 currentRoute === "/user/places"
                   ? "border-green-500 text-green-600"
                   : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
               }
               `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="white"
                className="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>

              <span>Moje miejsca</span>
            </Link>
            <Link
              href="/user/watchlist"
              className={`group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
              ${
                currentRoute === "/user/watchlist"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }
              `}
            >
              <svg
                className="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
              </svg>

              <span>Ulubione</span>
            </Link>
            <Link
              href="/user/settings"
              className={`group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
              ${
                currentRoute === "/user/settings"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }
              `}
              aria-current="page"
            >
              <svg
                className="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
              <span>Ustawienia konta</span>
            </Link>
          </nav>
        </div>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Navigation;
