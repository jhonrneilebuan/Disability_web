import React from "react";

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
  return (
    <div className="bg-semiTransparent rounded-3xl shadow-custom overflow-hidden p-6 px-4 mx-auto max-w-full sm:max-w-4xl w-full sm:m-8">
      <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-4 sm:items-center">
        <input
          placeholder="Enter Keywords"
          className="px-4 py-2 rounded-md w-full sm:w-[calc(33.33%-1.5rem)] text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-browny border-none font-poppins focus:outline-none focus:ring-1 focus:ring-darkBrowny"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <label className="sr-only" htmlFor="categorySelect">
          Select category
        </label>
        <select
          id="categorySelect"
          className="text-black text-opacity-50 px-4 py-2 border-none rounded-md bg-browny w-full sm:w-[calc(33.33%-1.5rem)] font-poppins appearance-none focus:outline-none focus:ring-1 focus:ring-darkBrowny"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category.toUpperCase()}>
              {category.replace("_", " ")}
            </option>
          ))}
        </select>
        <input
          placeholder="Location"
          className="px-4 py-2 rounded-md w-full sm:w-[calc(33.33%-1.5rem)] text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-browny border-none focus:outline-none focus:ring-1 focus:ring-darkBrowny"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="bg-darkBrowny hover:bg-amber-900 font-bold px-6 py-2 rounded-lg text-white w-full sm:w-auto sm:ml-4 sm:mt-0"
          onClick={onSearch}
        >
          SEEK
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
