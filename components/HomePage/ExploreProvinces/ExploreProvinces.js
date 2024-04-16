import Card from "./Card";

const provinceImages = [
  "/images/provinces/dolnoslaskie.webp",
  "/images/provinces/kujawsko-pomorskie.webp",
  "/images/provinces/lubelskie.webp",
  "/images/provinces/lubuskie.webp",
  "/images/provinces/lodzkie.webp",
  "/images/provinces/malopolskie.webp",
  "/images/provinces/mazowieckie.webp",
  "/images/provinces/opolskie.webp",
  "/images/provinces/podkarpackie.webp",
  "/images/provinces/podlaskie.webp",
  "/images/provinces/pomorskie.webp",
  "/images/provinces/slaskie.webp",
  "/images/provinces/swietokrzyskie.webp",
  "/images/provinces/warminsko-mazurskie.webp",
  "/images/provinces/wielkopolskie.webp",
  "/images/provinces/zachodniopomorskie.webp",
];

const getRandomIndices = (length, count) => {
  const indices = new Set();
  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * length);
    indices.add(randomIndex);
  }
  return Array.from(indices);
};

const ExploreProvinces = async ({ provinces }) => {
  const randomIndices = getRandomIndices(provinces.length, 5);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 my-20">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="col-span-2 max-h-48">
          <p className="text-center md:text-left tracking-widest text-sm text-green-600 font-bold">
            POPULARNE LOKALIZACJE
          </p>
          <h3 className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold pt-5 mb-10">
            Poznawaj piękne miejsca w Polsce
          </h3>
        </div>

        {randomIndices.map((provinceId) => (
          <Card
            key={provinceId}
            photoPath={provinceImages[provinceId]}
            provinceName={provinces[provinceId].name}
            provinceCount={provinces[provinceId]._count.places}
            linkToMap={`/map?province=${provinces[provinceId].id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreProvinces;
