import { useState, useEffect, useRef } from "react";

const useInfiniteScroll = (initialItems = [], itemsPerPage = 10) => {
  const [itemsList, setItemsList] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    setItemsList(initialItems.slice(0, itemsPerPage));
  }, [initialItems]);

  const loadMoreItems = () => {
    const nextItems = initialItems.slice(
      itemsList.length,
      itemsList.length + itemsPerPage
    );
    setItemsList((prevItemsList) => [...prevItemsList, ...nextItems]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [itemsList, initialItems]);

  return { itemsList, observerRef };
};

export default useInfiniteScroll;
