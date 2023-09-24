import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const mobileMediaQuery = "(min-width: 768px)";

export function useSidebar(places, onMarkerHover) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const placesPerPage = 10;

  const handleToggleSidebar = () => {
    setShowSidebar((current) => !current);
  };

  const handleMouseEnter = (markerId) => {
    clearTimeout(hoverTimeout);

    const timeoutId = setTimeout(() => {
      onMarkerHover(markerId);
    }, 1000);

    setHoverTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    onMarkerHover(null);
  };

  const handleScroll = (e) => {
    const container = e.target;

    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      loadMorePlaces(visiblePlaces.length);
    }
  };

  const loadMorePlaces = (startId) => {
    const newVisiblePlaces = places.slice(startId, startId + placesPerPage);

    if (startId === 0) {
      setVisiblePlaces(newVisiblePlaces);
    } else {
      setVisiblePlaces((prevVisiblePlaces) => [
        ...prevVisiblePlaces,
        ...newVisiblePlaces,
      ]);
    }
  };

  useEffect(() => {
    if (places.length > 0) {
      loadMorePlaces(0);
    }
  }, [places]);

  useEffect(() => {
    const query = window.matchMedia(mobileMediaQuery);

    function handleQueryChange(queryEvent) {
      setShowSidebar(queryEvent.matches);
    }

    query.addEventListener("change", handleQueryChange);

    return () => {
      query.removeEventListener("change", handleQueryChange);
    };
  }, []);

  const handleFlyToPlace = (place) => {
    router.push(`?id=${place._id}`, undefined, { shallow: true });
  };

  return {
    showSidebar,
    visiblePlaces,
    placesPerPage,
    handleToggleSidebar,
    handleMouseEnter,
    handleMouseLeave,
    handleScroll,
    handleFlyToPlace,
  };
}
