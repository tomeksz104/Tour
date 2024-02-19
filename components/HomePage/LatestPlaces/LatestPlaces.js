import { getRandomPlaces } from "@/actions/getRandomPlaces";
import CardSlider from "./CardSlider";

const LatestPlaces = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const randomPlaces = await getRandomPlaces(9);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-32">
      <p className="text-center tracking-widest text-sm text-green-500 font-bold">
        STARANNIE WYBRANE
      </p>
      <h3 className="text-center text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold pt-5 mb-10">
        Zobacz najnowsze miejsca
      </h3>
      <CardSlider places={randomPlaces} />
    </div>
  );
};

export default LatestPlaces;
