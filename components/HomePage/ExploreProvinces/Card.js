import { formatWord } from "@/utils/formatWord";

const { MoveRight } = require("lucide-react");
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const Card = ({ photoPath, provinceName, provinceCount, linkToMap }) => {
  return (
    <div className="relative group relative h-72 overflow-hidden group last:col-span-2">
      <Link
        href={linkToMap}
        className="absolute bottom-0 left-0 w-full p-3 -mb-20 opacity-0 group-hover:mb-0 group-hover:opacity-100 z-[2] transition-all duration-300 cursor-pointer"
      >
        <div className="w-full rounded-md bg-gradient-to-t from-green-600 to-green-500 text-white px-5 py-3">
          <span className="text-xs font-semibold uppercase">
            {provinceCount}{" "}
            {formatWord(provinceCount, ["atrakcja", "atrakcje", "atrakcji"])}
          </span>
          <p className="text-2xl font-bold">{provinceName}</p>
        </div>
        <div className="absolute right-0 -top-3 mr-10">
          <div className="rounded-full bg-white p-3">
            <MoveRight />
          </div>
        </div>
      </Link>
      <Image
        width="0"
        height="0"
        sizes="100vw"
        className="object-cover h-full w-full rounded-md"
        src={photoPath}
        alt={provinceName}
      />
      <div className="absolute left-0 bottom-0 z-10 z-[1]">
        <div className="bg-green-500 text-[10px] font-bold text-white leading-[26px] text-center uppercase absolute z-[12] whitespace-nowrap -ml-2.5 mb-2.5 px-2.5 py-0 rounded-[5px_5px_5px_0] left-full bottom-full after:content-[''] after:absolute after:mt-[-9px] after:border-l-green-500 after:border-8 after:border-solid after:border-transparent after:left-0 after:top-full">
          {provinceCount}{" "}
          {formatWord(provinceCount, ["atrakcja", "atrakcje", "atrakcji"])}
        </div>
        <p className="text-white text-2xl font-bold pb-3 pl-5">
          {provinceName}
        </p>
      </div>
      <div className="absolute left-0 top-0 w-full h-full rounded-md bg-gradient-to-t from-black/50 from-5% z-0"></div>
    </div>
  );
};

export default Card;
