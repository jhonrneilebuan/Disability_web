import { useState, useRef } from "react";
import { userStore } from "../stores/userStore";

const UploadDisabilityIdPage = () => {
  const { uploadDisabilityId } = userStore();
  const [selectedDisabilityID, setSelectedDisabilityID] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/upload.png");
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null); 

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPEG or PNG image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSelectedDisabilityID(reader.result);
      setPreviewUrl(reader.result);
    };
  };

  const handleDisabilityIDChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedDisabilityID) {
      alert("Please select an image first.");
      return;
    }

    setIsUploading(true);
    try {
      await uploadDisabilityId({ verificationId: selectedDisabilityID });
      alert("Disability ID uploaded successfully!");
      setSelectedDisabilityID(null);
      setPreviewUrl("/upload.png");
    } catch (error) {
      console.error("Failed to upload disability ID:", error);
      alert("Failed to upload. Please try again.");
    }
    setIsUploading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center font-poppins">
        Upload Your PWD ID Card
      </h2>
      <p className="text-gray-600 mb-4 text-center font-poppins">
        Drag & drop your PWD ID here, or click the camera icon to select.
        Only JPEG and PNG formats are accepted.
      </p>

      <div
        className="relative h-60 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center text-gray-500 text-sm cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Disability ID Preview"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        ) : (
          <p>Drag & drop or click the button below to upload</p>
        )}

        <label
          htmlFor="file-upload"
          className="absolute bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-gray-700 transition duration-300"
        >
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleDisabilityIDChange}
          />
          📷
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={isUploading || !selectedDisabilityID}
        className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
          isUploading || !selectedDisabilityID
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload PWD ID Card"}
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-3xl p-4 bg-white rounded-lg shadow-lg">
            <img src={previewUrl} alt="Zoomed Disability ID" className="w-full h-auto" />
            <button
              className="mt-2 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDisabilityIdPage;
