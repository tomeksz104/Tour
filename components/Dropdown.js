const Dropdown = ({ button, items }) => {
  return (
    <div className="relative dropdown z-10">
      {button}
      <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
          role="menu"
        >
          {items}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
