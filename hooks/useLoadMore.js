import { useState, useEffect } from "react";

const useLoadMore = (initialData = [], perPage = 10) => {
  const [data, setData] = useState([]);

  const handleScroll = (e) => {
    const container = e.target;

    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      loadMore(data.length);
    }
  };

  const loadMore = (startId) => {
    const newVisibleData = initialData.slice(startId, startId + perPage);

    if (startId === 0) {
      setData(newVisibleData);
    } else {
      setData((prevData) => [...prevData, ...newVisibleData]);
    }
  };

  useEffect(() => {
    if (initialData.length > 0) {
      loadMore(0);
    } else if (initialData.length === 0) {
      setData([]);
    }
  }, [initialData]);

  return { data, handleScroll };
};

export default useLoadMore;
