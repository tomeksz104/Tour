const Card = ({ selectedCategory, category, onChange }) => {
  const SvgIcon = ({ svgData }) => {
    const updatedSvgData = svgData.replace(
      "<svg",
      `<svg width="24" height="24"`
    );

    return <div dangerouslySetInnerHTML={{ __html: updatedSvgData }} />;
  };

  return (
    <div
      onClick={() => onChange(category.id)}
      className={`h-full flex items-center bg-white rounded-md p-5 gap-3 border ${
        selectedCategory === category.id
          ? "border-green-500"
          : "border-gray-300"
      } group cursor-pointer`}
    >
      <div
        className={`bg-gray-200 rounded-full p-5  ${
          selectedCategory === category.id
            ? "bg-green-500 text-white "
            : "group-hover:bg-green-500  group-hover:text-white"
        } transition duration-300 transition duration-300`}
      >
        {category.svgIconPath && (
          <SvgIcon svgData={category.svgIconPath} className="w-6 h-6" />
        )}
      </div>

      <div>
        <p className="font-bold text-[18px]">{category.name}</p>
        <span className="text-gray-400 text-[14px]">
          {category.description}{" "}
        </span>
      </div>
    </div>
  );
};

export default Card;
