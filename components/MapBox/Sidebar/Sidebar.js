"use client";

import {
  Suspense,
  lazy,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import PlacesList from "./PlacesList";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// bundle splitting
const FiltersDialog = lazy(() => import("../FiltersDialog"));

import { Clock3, Heart, MapPin } from "lucide-react";
import { LocateContext } from "@/contexts/LocateContext";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setIsSidebarOpen,
  toggleSearchWhenMapMoving,
} from "@/redux/slices/mapSlice";

const mobileMediaQuery = "(min-width: 768px)";

const Sidebar = memo(({ isShowWatchlist, onToggleWatchlist }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { visiblePlaces, isSidebarOpen, isSearchWhenMapMoving } = useSelector(
    (state) => state.map
  );

  const locateCtx = useContext(LocateContext);
  const [isFiltersDialogOpen, setFiltersDialogOpen] = useState(false);

  const nearMeParamsValue = searchParams.get("nearMe");
  const isOpenParamsValue = searchParams.get("open");

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleSearchWhenMapMoving = () => {
    dispatch(toggleSearchWhenMapMoving());
  };

  useEffect(() => {
    if (window) {
      dispatch(setIsSidebarOpen(window.matchMedia(mobileMediaQuery).matches));
    }
  }, []);

  useEffect(() => {
    const query = window.matchMedia(mobileMediaQuery);

    function handleQueryChange(queryEvent) {
      dispatch(setIsSidebarOpen(queryEvent.matches));
    }

    query.addEventListener("change", handleQueryChange);

    return () => {
      query.removeEventListener("change", handleQueryChange);
    };
  }, []);

  const toggleFiltersDialog = () => setFiltersDialogOpen((current) => !current);

  const handleNearMeClick = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams);

    if (nearMeParamsValue === "true") {
      currentParams.delete("nearMe");
      currentParams.delete("nearMeDistance");
    } else {
      if (
        locateCtx.coordinates.latitude === undefined ||
        locateCtx.coordinates.longitude === undefined
      )
        locateCtx.getLocation();

      currentParams.set("nearMe", "true");
      currentParams.set("nearMeDistance", "50");
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  }, [searchParams, locateCtx.coordinates, router, pathname]);

  const handleOpenClick = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams);

    if (isOpenParamsValue === "true") {
      currentParams.delete("open");
    } else {
      currentParams.set("open", "true");
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  }, [searchParams, router, pathname]);

  const handleSortChange = useCallback(
    (selectedValue) => {
      const currentParams = new URLSearchParams(searchParams);

      if (selectedValue === "default") {
        currentParams.delete("sortBy");
      } else {
        currentParams.set("sortBy", selectedValue);
      }

      router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
        shallow: true,
      });
    },
    [searchParams, router, pathname]
  );

  return (
    <>
      <button
        aria-label="Toggle sidebar"
        onClick={handleToggleSidebar}
        className={` ${
          isSidebarOpen ? "hidden" : "fixed"
        } z-10 focus:outline-none p-2 ml-3 mt-3 bg-white rounded-full shadow-md border border-gray-200
       `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <section
        className={`flex flex-col z-20 w-full max-w-2xl bg-gray-100 focus:outline-none ease-in-out duration-300
            ${isSidebarOpen ? "translate-x-0 " : "-translate-x-full"}`}
      >
        <div
          className={`bg-white absolute top-0 -mr-5 mt-3 rounded-full border border-slate-200
        ${isSidebarOpen ? "-right-[201px]" : "-right-[247px]"}
        transition-[right] duration-300
        `}
        >
          <div className="p-2 px-5 flex items-center space-x-2">
            <Checkbox
              onClick={handleToggleSearchWhenMapMoving}
              checked={isSearchWhenMapMoving}
              id="searchWhenMoving"
            />
            <label
              htmlFor="searchWhenMoving"
              className="py-1 text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Szukaj gdy ruszam mapą
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex text-slate-500 text-xs gap-1">
            <span className="font-semibold">{visiblePlaces.length}</span>
            <span className="hidden sm:inline-block"> widocznych </span>
            <span>miejsc</span>
          </div>
          <div className="flex items-center gap-3">
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="max-w-auto rounded-full font-medium hover:bg-white hover:border-gray-500 text-xs px-3 py-1 hidden md:flex gap-1">
                <SelectValue placeholder="Sortowanie" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="default">Domyślnie</SelectItem>
                  <SelectItem value="most_reviewed">
                    Najczęściej oceniane
                  </SelectItem>
                  <SelectItem value="highest_rated">
                    Najwyżej oceniane
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <button
              onClick={handleToggleSidebar}
              className="p-2 text-slate-500 hover:text-slate-400 hover:bg-slate-400/10 rounded-full"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 px-5 pb-3">
          <Button
            onClick={handleNearMeClick}
            variant="outline"
            className={`rounded-full hover:bg-white hover:border-gray-500 text-xs px-3 py-1 gap-1 ${
              nearMeParamsValue === "true" && "border-gray-500"
            }`}
          >
            <MapPin size={12} />
            Blisko mnie
          </Button>
          <Button
            onClick={handleOpenClick}
            variant="outline"
            className={`rounded-full hover:bg-white hover:border-gray-500 text-xs px-3 py-1 gap-1 ${
              isOpenParamsValue === "true" && "border-gray-500"
            }`}
          >
            <Clock3 size={12} />
            Otwarte teraz
          </Button>

          <Button
            onClick={onToggleWatchlist}
            variant="outline"
            className={`rounded-full hover:bg-white hover:border-gray-500 text-xs px-3 py-1 gap-1 `}
          >
            <Heart
              size={12}
              className={`${isShowWatchlist && "text-red-500 fill-red-500"}`}
            />
            Ulubione
          </Button>
          <Button
            onClick={toggleFiltersDialog}
            variant="link"
            className="text-xs px-3 py-1 ml-auto"
          >
            Więcej filtrów
          </Button>
        </div>

        <div className="flex flex-wrap p-1 overflow-y-auto overflow-x-hidden">
          <PlacesList />
        </div>
      </section>

      <Suspense>
        <FiltersDialog
          isOpen={isFiltersDialogOpen}
          onClose={toggleFiltersDialog}
        />
      </Suspense>
    </>
  );
});

export default Sidebar;
