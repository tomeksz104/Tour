import { Fragment, Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import { Button as ButtonShadcn } from "@/components/ui/button";
import ExploreProvinces from "@/components/HomePage/ExploreProvinces/ExploreProvinces";
import SearchBar from "@/components/HomePage/SearchBar";
import { db } from "@/lib/db";

const LatestPlaces = lazy(() =>
  import("@/components/HomePage/LatestPlaces/LatestPlaces")
);
import ExploreCategory from "./../components/HomePage/ExploreCategories/ExploreCategory";
import { getPlacesForCategories } from "@/actions/getPlacesForCategories";
import Footer from "@/components/Footer";

export default async function Home() {
  const categories = await db.category.findMany();
  const categoriesWithPlaces = await getPlacesForCategories(categories);
  const provinces = await db.province.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          places: true,
        },
      },
    },
  });

  return (
    <Fragment>
      <section className="bg-gray-100 pt-10 relative">
        <div
          className="absolute left-0 top-0 lg:-top-20 h-full w-full bg-cover bg-repeat-x bg-bottom-left opacity-70 "
          style={{
            backgroundImage:
              "url('https://gaviaspreview.com/wp/lestin/wp-content/uploads/2023/07/bg-03.png')",
            mixBlendMode: "multiply",
          }}
        ></div>
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
              src="/home-icons/rectangular-pattern-yellow.svg"
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-8"> */}
            <div className="xl:pr-20 lg:col-span-3 mt-0 md:mt-20">
              <h2 className="font-primary text-3xl lg:text-4xl 2xl:text-6xl leading-tight font-extrabold	 text-gray-900">
                Znajdź miejsca{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 inline-block">
                  które pokochasz
                </span>
              </h2>
              {/* <p className="text-lg md:text-xl leading-tight font-medium text-gray-600 my-6 2xl:my-12">
                Our collection of more than 1,500 remarkable places will take
                your trip to the next level. Look for illustrations on our maps
                and visit unique places!
              </p> */}
              <SearchBar categories={categories} provinces={provinces} />

              {/* <div className="flex flex-wrap items-center">
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
              </div> */}
            </div>
            <div className="lg:col-span-2">
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

      <section className="relative bg-green-500 lg:-mt-20 mb-16 pt-10 lg:pt-0">
        <div
          className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat bg-top-right opacity-20 transition-all duration-300"
          style={{
            backgroundImage:
              "url('https://gaviaspreview.com/wp/lestin/wp-content/uploads/2023/08/bg-21.png')",
            mixBlendMode: "multiply",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col-reverse lg:flex-row space-x-8 items-center">
            <img
              className="-mb-24 "
              width="510"
              height="440"
              src="https://gaviaspreview.com/wp/lestin/wp-content/uploads/2023/08/image-album.png"
            />
            <div className="w-[175px] h-[175px] hidden lg:block">
              <div className="relative mx-auto max-w-[175px]">
                <div className="box-border	">
                  <svg
                    className="uppercase font-semibold tracking-widest text-white text-xs animate-[spin_5s_linear_infinite]"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="textPath"
                      d="M 15, 50 a 33,33 0 1,1 66,0 33,33 0 1,1 -66,0"
                      stroke=""
                      fill="none"
                      strokeWidth="0"
                    ></path>
                    <text textAnchor="start">
                      <textPath
                        className="font-primary fill-white"
                        href="#textPath"
                      >
                        PONAD 1500 miejsc
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute max-w-[45px] top-1/2 left-1/2 -translate-x-1/2	-translate-y-1/2	">
                  <img
                    width="44"
                    height="53"
                    src="https://gaviaspreview.com/wp/lestin/wp-content/uploads/2023/07/logo-white-2.png"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col font-primary space-y-3">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Znajdź coś w pobliżu
              </h2>
              <span className="text-white text-lg">
                Nasza kolekcja ponad 1500 niezwykłych miejsc przeniesie Twoją
                podróż na wyższy poziom.
              </span>
              <div>
                <ButtonShadcn asChild className="h-12 px-10">
                  <Link href={"/map"}>Przeglądaj mapę</Link>
                </ButtonShadcn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExploreProvinces provinces={provinces} />

      <ExploreCategory
        categories={categories}
        categoriesWithPlaces={categoriesWithPlaces}
        provinces={provinces}
      />

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
        <LatestPlaces />
      </Suspense>

      {/* Categories section */}
      {/* <ExploreCategories /> */}

      {/* On all your devices section */}
      {/* <div className="bg-green-50 py-16">
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
      </div> */}

      {/* Ready to start section */}
      <section className="relative py-24 sm:py-32 mt-20">
        <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8 z-10">
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
          <h2 className="max-w-screen-md mx-auto mt-6 text-center text-gray-900 text-3xl lg:text-4xl 2xl:text-5xl font-bold">
            <span className="block">Gotowy na rozpoczęcie </span>
            <span className="relative block mt-3">
              <span className="relative">
                <Image
                  alt="Underline simple light green icon"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto absolute inset-0 transform translate-y-9 sm:translate-y-11 xl:translate-y-14"
                  src="/underline-simple-light-green.svg"
                />
                <span className="relative">swojej przygody?</span>
              </span>
            </span>
          </h2>
          <div className="flex justify-center mt-12 xl:mt-14">
            <Link href="/map">
              <Button type="button" className="w-64">
                Przeglądaj mapę
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
        <div
          className="absolute top-0 left-0 w-full h-full z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 60%, #FFFFFF 95%)",
          }}
        ></div>
        <div
          className="absolute left-0 top-0 h-full w-full bg-cover bg-repeat-x bg-bottom-left z-[1]"
          style={{
            backgroundImage:
              "url('https://gaviaspreview.com/wp/lestin/wp-content/uploads/2023/07/bg-03.png')",
            mixBlendMode: "multiply",
          }}
        ></div>
      </section>
      <Footer />
    </Fragment>
  );
}
