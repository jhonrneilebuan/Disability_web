import { Boxes } from "lucide-react";
import Select from "react-select";
const customStyles = {
  control: (base, state) => ({
    ...base,

    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#d4c9b0",
    borderRadius: "0.375rem", 
    padding: "0.1rem 1rem", 
    fontFamily: "Poppins, sans-serif",
    color: "rgba(0, 0, 0, 0.5)", 
    border: "none",
    boxShadow: state.isFocused ? "0 0 0 2px #5C4033" : "none", 
    minHeight: "41px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "rgba(0, 0, 0, 0.7)", 
  }),
  indicatorsContainer: () => ({
    display: "none", 
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#d4c9b0",
    borderRadius: "0.375rem",
    marginTop: "0.5rem",
    overflow: "hidden", 
    padding: 0,
    margin:0 
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999, 
  }),
  option: (base) => ({
    ...base,
    backgroundColor: "#d4c9b0", 
    color: "#000000", 
    fontFamily: "Poppins, sans-serif",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#2563eb", 
      color: "#ffffff", 
    },
  }),
};
const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  selectedCategory,
  setSelectedCategory,
  location,
  setLocation,
  categories,
  onSearch,
}) => {
  const categoryOptions = categories.map((category) => ({
    value: category.toUpperCase(),
    label: category.replace("_", " "),
  }));

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : "");
  };
  return (
    <div className="bg-semiTransparent rounded-3xl shadow-custom p-6 px-4 mx-auto max-w-full sm:max-w-4xl w-full sm:m-8">
      <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-4 sm:items-center">
        
        <input
          placeholder="Enter Keywords"
          className="px-4 py-2 rounded-md w-full sm:w-[calc(33.33%-1.5rem)] text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-lightBrown border-none font-poppins focus:outline-none focus:ring-1 focus:ring-darkBrowny placeholder:font-poppins"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      <div className="relative w-full sm:w-[calc(33.33%-1.5rem)] h-[41px]">
          <Boxes
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-opacity-50"
            size={20}
          />
          <Select
            options={categoryOptions}
            value={categoryOptions.find(
              (option) => option.value === selectedCategory
            )}
            onChange={handleCategoryChange}
            isClearable
            placeholder="Select Category"
            className="w-full h-full"
            styles={customStyles}
            menuPortalTarget={document.body} 
          />
        </div>
        <input
          placeholder="Location"
          className="px-4 py-2 rounded-md w-full sm:w-[calc(33.33%-1.5rem)] text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-lightBrown border-none focus:outline-none focus:ring-1 focus:ring-darkBrowny placeholder:font-poppins"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="bg-darkBrowny hover:bg-amber-900 font-bold px-6 py-2 rounded-lg text-white w-full sm:w-auto sm:ml-4 sm:mt-0"
          onClick={onSearch}
        >
          Browse
        </button>
      </div>
      
    </div>
  );
};

export default SearchBar;


