import { Fragment, Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import ExploreCategories from "@/components/HomePage/ExploreCategories";

const RandomPlaces = lazy(() => import("@/components/HomePage/RandomPlaces"));

export default async function Home() {
  return (
    <Fragment>
      <section className="pb-20 2xl:pb-28 pt-10 2xl:pt-20 relative">
        <div className="absolute -bottom-52 left-0 -z-10">
          <Image
            priority
            width="301"
            height="691"
            className="w-full"
            src="/home-icons/shape-left.svg"
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="absolute -top-40 right-0 -z-10">
          <Image
            priority
            width="1262"
            height="1356"
            className="w-full"
            src="/home-icons/shape-right.svg"
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="absolute z-10 hidden xl:block opacity-25 2xl:opacity-100 top-0 bottom-0 right-0 left-0">
          <span className="animate-1 absolute left-16 bottom-0">
            <Image
              width="101"
              height="75"
              src="/home-icons/rectangular-pattern-green.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-2 absolute left-28 bottom-52">
            <Image
              width="20"
              height="20"
              src="/home-icons/green-dot.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-3 absolute left-32 top-40">
            <Image
              width="38"
              height="38"
              src="/home-icons/star.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-2 absolute left-96 top-20">
            <Image
              width="20"
              height="20"
              src="/home-icons/green-dot.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-3 absolute right-96 top-0">
            <Image
              width="101"
              height="75"
              src="/home-icons/rectangular-pattern-green.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-1 absolute right-52 top-60">
            <Image
              width="38"
              height="38"
              src="/home-icons/star.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-2 absolute right-1/3 bottom-20">
            <Image
              width="93"
              height="75"
              src="/home-icons/rectangular-pattern-yellow.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
          <span className="animate-3 absolute right-16 bottom-32">
            <Image
              width="20"
              height="20"
              src="/home-icons/green-dot.svg"
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </span>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="hero-content xl:pr-20 lg:col-span-3">
              <h2 className="text-3xl lg:text-4xl 2xl:text-6xl leading-tight font-bold text-gray-900">
                Find the <span className="bg-yellow-100">BEST</span> Place
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 inline-block">
                  on our interactive map
                </span>
              </h2>
              <p className="text-lg md:text-xl leading-tight font-medium text-gray-600 my-6 2xl:my-12">
                Our collection of more than 1,500 remarkable places will take
                your trip to the next level. Look for illustrations on our maps
                and visit unique places!
              </p>
              <div className="flex flex-wrap items-center">
                <Link href="/map">
                  <Button type="button" className="w-64">
                    Explore the map
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-3 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 aos-init aos-animate">
              <Image
                width={16}
                height={9}
                className="w-full max-w-xl hidden lg:block"
                src="/hero-image.png"
                alt=""
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Random places section */}
      {/* <div class="mx-auto px-4 sm:px-6 lg:px-8 md:w-3/5 mb-10">
        <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Guide to Enchanting Places
        </h2>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Discover extraordinary places that will take your breath away and
          leave you with unforgettable memories. Our app will take you on a
          journey through fascinating corners of the world, from mystical
          ancient ruins to picturesque beaches and surprising natural wonders.
          Are you ready for amazing adventures? Start your journey now!
        </p>
      </div> */}
      {/* <CardSlider places={randomPlaces} /> */}
      <Suspense>
        <RandomPlaces />
      </Suspense>

      {/* Categories section */}
      <ExploreCategories />

      {/* On all your devices section */}
      <div className="bg-green-50 py-16">
        <div className="container m-auto space-y-8 px-4 md:px-12 lg:px-20">
          <div className="items-center justify-center gap-16 text-center md:flex md:text-left">
            <div className="order-last mb-6 space-y-6 md:mb-0 md:w-7/12 lg:w-6/12">
              <h1 className="text-3xl lg:text-4xl font-bold text-green-900">
                On all your devices
              </h1>
              <p className="text-lg leading-tight text-gray-600">
                Our app is designed to work perfectly on any device, providing a
                smooth and responsive experience.
              </p>
            </div>
            <Image
              src="/cross-device-asset.png"
              width="832"
              height="608"
              className="m-auto md:w-5/12"
              loading="lazy"
              alt="Mobility illustration"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>

      {/* Ready to start section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <Image
            alt="Sunrise icon"
            width="295"
            height="125"
            className="mx-auto w-72"
            src="/sunrise.svg"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <h2 className="max-w-screen-md mx-auto mt-6 text-center text-gray-900 text-3xl lg:text-4xl 2xl:text-6xl font-bold">
            <span className="block">Ready to start </span>
            <span className="relative block">
              <span className="relative">
                <Image
                  alt="Underline simple light purple icon"
                  width="1126"
                  height="64"
                  className="absolute inset-0 transform translate-y-9 sm:translate-y-11 xl:translate-y-14"
                  src="/underline-simple-light-purple.svg"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <span className="relative">your adventure?</span>
              </span>
            </span>
          </h2>
          <div className="flex justify-center mt-12 xl:mt-14">
            <Link href="/map">
              <Button type="button" className="w-64">
                Explore the map
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-3 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
