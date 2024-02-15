import Card from "./Card";

const provinceImages = [
  "https://apipdm.irmir.pl/uploads/46/d534b82f-b774-4f02-b659-2ae1ed83ab72.png",
  "https://static.polityka.pl/_resource/res/path/51/f9/51f91610-fe1e-4f4a-beb2-9bbf7b3ee0ef",
  "https://ocdn.eu/pulscms-transforms/1/pB_k9kqTURBXy84ZGM5Y2Y3NTQ4MzA0ZGJhYmRhMDRkMzVkODY3OTIwNS5qcGVnkpUCzQMUAMLDlQIAzQL4wsPeAAGhMAY",
  "https://static.polskieszlaki.pl/zdjecia/turystyka/2021-04/lubuskie-12-1.jpg",
  "https://www.polska.travel/wp-content/uploads/2022/12/groty_nagorzyckie_1170.jpg",
  "https://www.polska.travel/wp-content/uploads/2023/02/krakow_sukiennice_noca_1170-e1676543566258.jpg",
  "https://modanamazowsze.pl/wp-content/uploads/2020/02/20190624_farma_iluzji_POI_0091-Panorama-1-1170x680.jpg",
  "https://www.opole.pl/sites/default/files/styles/content_image/public/galerie/Odkryj%20Opole%20na%20weekend/Muzeum%20Polskiej%20Piosenki%283%29.jpg?itok=oiA9qsNU",
  "https://wszedobylscy.b-cdn.net/wp-content/uploads/2022/08/Podkarpackie-z-dzieckiem2.jpg",
  "https://grekokatolicy.pl/wp-content/uploads/2018/07/grabarka-fot.-I.-Kondr%C3%B3w-2012-5-1080x675.jpg",
  "https://grekokatolicy.pl/wp-content/uploads/2018/07/grabarka-fot.-I.-Kondr%C3%B3w-2012-5-1080x675.jpg",
  "https://i0.wp.com/zyciewpodrozy.pl/wp-content/uploads/2022/07/kopalnie-guido-zwiedzanie-z-dziec%CC%81mi-przygoda-blog-podro%CC%81z%CC%87niczy-co-zobaczyc%CC%81-w-polsce-atrakcje-turystyczne.jpg?resize=1024%2C768&ssl=1",
  "https://www.poduszka.pl/wp-content/uploads/2021/03/jaskinia-raj-1000x644.jpg",
  "https://gfx.podroze.radiozet.pl/var/radiozetsg/storage/images/podroze/warminsko-mazurskie-atrakcje.-12-ciekawych-miejsc-na-warmii-i-mazurach/9606372-1-pol-PL/Warminsko-mazurskie-co-warto-zobaczyc-12-najciekawszych-miejsc_full-hd.jpg",
  "https://wielkopolskaciekawie.pl/wp-content/uploads/2021/12/20210613_124603-scaled.jpg",
  "https://moi-mili.pl/wp-content/uploads/2018/08/DSC_4465.jpg",
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
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 max-h-48">
          <p className="tracking-widest text-sm text-green-500 font-bold">
            POPULARNE LOKALIZACJE
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold pt-5 mb-10">
            Poznawaj piękne miejsca w Polsce {provinces[0].name}
          </h3>
        </div>

        {randomIndices.map((provinceId) => (
          <Card
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
