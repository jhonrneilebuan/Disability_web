import { useEffect, useState } from "react";
import { adminStore } from "../stores/adminApi";
import SkeletonLoader from "../components/adminVerificationSkeletonLoader";

const DisabilityVerification = () => {
  const {
    getDisabilityVerificationId,
    updateDisabilityVerificationStatus,
    totaluploaddisability,
    isAdminLoading,
  } = adminStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, [isAdminLoading]);

  useEffect(() => {
    getDisabilityVerificationId();
  }, [getDisabilityVerificationId]);

  const handleVerificationUpdate = async (userId, isVerified) => {
    await updateDisabilityVerificationStatus(userId, isVerified);
    getDisabilityVerificationId();
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Disability Verification
      </h2>

      {Array.isArray(totaluploaddisability) &&
      totaluploaddisability.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">User ID</th>
                <th className="py-3 px-4 border-b text-left">Full Name</th>
                <th className="py-3 px-4 border-b text-left">
                  Verification ID
                </th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...totaluploaddisability].reverse().map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b">{user.userId}</td>
                  <td className="py-3 px-4 border-b">{user.fullName}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => setSelectedImage(user.verificationId)}
                      className="text-blue-500 underline"
                    >
                      View Image
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.isIdVerified !== undefined ? (
                      <span
                        className={`font-semibold ${
                          user.isIdVerified ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.isIdVerified ? "Verified" : "Not Verified"}
                      </span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.isIdVerified === false && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleVerificationUpdate(user.userId, true)
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleVerificationUpdate(user.userId, false)
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700 text-center">
          No pending disability verifications.
        </p>
      )}

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Verification ID"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisabilityVerification;
