import { getRandomPlaces } from "@/actions/getRandomPlaces";
import CardSlider from "./CardSlider";

const RandomPlaces = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const randomPlaces = await getRandomPlaces(9);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <CardSlider places={randomPlaces} />
    </div>
  );
};

export default RandomPlaces;
