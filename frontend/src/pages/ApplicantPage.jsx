import React from "react";
import Navbar from "../components/Navbar";

const ApplicantPage = () => {
  return (
    <div className="min-h-screen bg-pastelBlueGray flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-5xl font-extrabold text-center font-jakarta">
          DISABILITY CAREERS
        </h1>
        <p className="text-center text-md font-medium font-jakarta">
          Connecting Talents with Accessible <br />
          Job Opportunities
        </p>
        <div className="bg-lightGray bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-custom overflow-hidden p-8 mx-auto max-w-3xl w-full">
          <div className="flex space-x-4 items-center">
            <input
              placeholder="Keyword"
              className="px-4 py-2 rounded w-full text-black placeholder-black bg-white bg-opacity-50 border border-black focus:outline-none"
            />

            <select
              className="px-4 py-2 rounded bg-white text-gray-800 appearance-none md:w-2/3"
              aria-label="Select category"
            >
              <option value="all" className="text-center">
                Category
              </option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>

            <button className="bg-buttonBlue hover:bg-indigo-700 px-6 py-2 rounded text-black">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantPage;
