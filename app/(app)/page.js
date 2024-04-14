import { Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";

const LatestPlaces = lazy(() =>
  import("@/components/HomePage/LatestPlaces/LatestPlaces")
);

const SearchBar = dynamic(() => import("@/components/HomePage/SearchBar"));
const ExploreProvinces = dynamic(() =>
  import("@/components/HomePage/ExploreProvinces/ExploreProvinces")
);
const ExploreCategory = dynamic(() =>
  import("@/components/HomePage/ExploreCategories/ExploreCategory")
);
const Footer = dynamic(() => import("@/components/Footer"));

import { getPlacesForCategories } from "@/actions/getPlacesForCategories";

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
    <>
      <section
        className="relative md:pt-48 md:pb-36 py-36 table w-full items-center bg-center"
        id="home"
        style={{
          transition: "all 500ms ease-in 0s",
        }}
      >
        <Image
          priority
          width="1920"
          height="865"
          sizes="(max-width: 768px) 70vw, 100vw"
          src="/images/bg-hero-1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="hero image"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute bottom-0 w-full h-[1px] bg-white/50 backdrop-blur-md"></div>
        <div className="container relative mx-auto w-full px-4 sm:px-6 lg:px-8 ">
          <div className="text-center">
            <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5">
              Niech rozpocznie się podróż...
            </h1>
            {/* <p className="text-white/70 text-xl max-w-xl mx-auto">
              Marzysz o niezapomnianym wypadzie? Zorganizujemy Twoją wycieczkę z
              najlepszymi miejscami, które sprawią, że każdy moment będzie
              wyjątkowy!
            </p> */}

            <div className="mx-auto mt-6">
              <SearchBar categories={categories} provinces={provinces} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-green-500 mb-16 py-10 md:pb-0 lg:pt-0">
        <Image
          className="hidden md:flex absolute left-0 top-0 h-full w-full object-cover opacity-20"
          width="1257"
          height="394"
          src="/images/bg-21.png"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 transition-all">
          <div className="flex flex-col-reverse lg:flex-row space-x-8 items-center">
            <Image
              className="hidden md:block -mb-20"
              width="510"
              height="440"
              src="/images/image-album.png"
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
                  <Image
                    width="44"
                    height="53"
                    src="/images/logo-white-2.png"
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
                <Button asChild className="h-12 px-10">
                  <Link href={"/map"}>Przeglądaj mapę</Link>
                </Button>
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

      <Suspense>
        <LatestPlaces />
      </Suspense>

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
            <Button
              asChild
              className="relative rounded-full bg-green-600 hover:bg-green-500 font-semibold h-12 px-10
              before:absolute before:inset-0 before:rounded-full before:bg-green-600 hover:before:bg-green-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
            >
              <Link href={"/map"}>
                <span className="relative flex items-center font-semibold text-white">
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
                </span>
              </Link>
            </Button>
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
            backgroundImage: "url('/images/bg-03.webp')",
            mixBlendMode: "multiply",
          }}
        ></div>
      </section>
      <Footer />
    </>
  );
}
