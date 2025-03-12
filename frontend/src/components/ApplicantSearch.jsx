import { Boxes, MapPin, Search } from "lucide-react";
import Select from "react-select";
const customStyles = {
  control: (base, state) => ({
    ...base,
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
    backgroundColor: "#ffffff",
    borderRadius: "0.375rem",
    marginTop: "0.5rem",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#d4c9b0" : isFocused ? "#d4c9b0" : "#d4c9b0",
    color: isSelected ? "#ffffff" : "#000000",
    fontFamily: "Poppins, sans-serif",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  }),
};
const ApplicantSearch = ({
  searchKeyword,
  setSearchKeyword,
  selectedCategory,
  setSelectedCategory,
  location,
  setLocation,
  categories,
}) => {
  const categoryOptions = categories.map((category) => ({
    value: category.toUpperCase(),
    label: category.replace("_", " "),
  }));

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="bg-semiTransparent rounded-3xl shadow-custom overflow-hidden p-4 mx-auto max-w-full sm:max-w-4xl w-full sm:m-8">
      <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-4 sm:items-center">
        <div className="relative w-full ml-2 sm:w-[calc(33.33%-1.5rem)]">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-opacity-50"
            size={20}
          />
          <input
            placeholder="Enter Keywords"
            className="pl-10 pr-4 py-2 rounded-md w-full text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-lightBrown border-none font-poppins focus:outline-none focus:ring-1 focus:ring-darkBrowny"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
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

        <div className="relative w-full sm:w-[calc(33.33%-1.5rem)]">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-opacity-50"
            size={20}
          />
          <input
            placeholder="Location"
            className="pl-10 pr-4 py-2 rounded-md w-full text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-lightBrown border-none focus:outline-none focus:ring-1 focus:ring-darkBrowny"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantSearch;
