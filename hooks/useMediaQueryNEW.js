import * as React from "react";

const useMediaQuery = (query) => {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
};

export default useMediaQuery;
