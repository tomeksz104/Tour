"use client";

import { useState } from "react";
import Link from "next/link";

import {
  HomeIcon,
  Users,
  Baby,
  Tag,
  Dices,
  Files,
  PieChart,
  GanttChartSquare,
  AlarmSmoke,
  MapPinned,
} from "lucide-react";

import Logo from "@/components/Logo";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Zgłoszenia", href: "/admin/reports", icon: Files, current: false },
  { name: "Użytkownicy", href: "/admin/users", icon: Users, current: false },

  {
    name: "Miejsca",
    href: "/admin/places",
    icon: GanttChartSquare,
    current: false,
  },
  {
    name: "Kategorie",
    href: "/admin/categories",
    icon: PieChart,
    current: false,
  },
  { name: "Tematy", href: "/admin/topics", icon: Dices, current: false },
  { name: "Tagi", href: "/admin/tags", icon: Tag, current: false },
  {
    name: "Udogodnienia dla dzieci",
    href: "/admin/child-friendly-amenity",
    icon: Baby,
    current: false,
  },
  {
    name: "Udogodnienia",
    href: "/admin/amenities",
    icon: AlarmSmoke,
    current: false,
  },
  {
    name: "Miasta",
    href: "/admin/cities",
    icon: MapPinned,
    current: false,
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div
        className={`relative z-50 lg:hidden transition-all `}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`fixed inset-0 bg-gray-900/80 transition-opacity duration-500 pointer-events-none ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          className={`fixed inset-0 flex  duration-500 ${
            sidebarOpen ? "translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <Logo classes="flex shrink-0" imgClasses="h-7 md:h-8 w-full" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={` ${
                              item.current
                                ? "bg-gray-50 text-green-600"
                                : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                            }
                              group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                            `}
                          >
                            <item.icon
                              className={`
                                ${
                                  item.current
                                    ? "text-green-600"
                                    : "text-gray-400 group-hover:text-green-600"
                                }
                                "h-6 w-6 shrink-0"
                                `}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-400">
                      Your teams ZARZĄDZAJ
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      <li>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600">
                            H
                          </span>
                          <span className="truncate">Heroicons</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600">
                            T
                          </span>
                          <span className="truncate">Tailwind Labs</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600">
                            W
                          </span>
                          <span className="truncate">Workcation</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Logo classes="flex shrink-0" imgClasses="h-7 md:h-8 w-full" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={` ${
                          item.current
                            ? "bg-gray-50 text-green-600"
                            : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        }
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          `}
                      >
                        <item.icon
                          className={`
                            ${
                              item.current
                                ? "text-green-600"
                                : "text-gray-400 group-hover:text-green-600"
                            }
                            "h-6 w-6 shrink-0"
                          `}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600">
                        H
                      </span>
                      <span className="truncate">Heroicons</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600">
                        T
                      </span>
                      <span className="truncate">Tailwind Labs</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-green-600 group-hover:text-green-600">
                        W
                      </span>
                      <span className="truncate">Workcation</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">Tom Cook</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
      </div>
    </>
  );
};

export default Sidebar;
