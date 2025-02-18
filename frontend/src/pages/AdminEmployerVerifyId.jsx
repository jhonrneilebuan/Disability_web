import { useEffect, useState } from "react";
import { adminStore } from "../stores/adminApi";

const AdminEmployerVerifyId = () => {
  const {
    getEmployerVerificationList,
    updateEmployerVerificationStatus,
    totaluploademployer,
    isAdminLoading,
  } = adminStore();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getEmployerVerificationList();
  }, [getEmployerVerificationList]);

  const handleVerificationUpdate = async (userId, isVerified) => {
    await updateEmployerVerificationStatus(userId, isVerified);
    getEmployerVerificationList();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Employer Verification
      </h2>

      {isAdminLoading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          {Array.isArray(totaluploademployer) &&
          totaluploademployer.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 border-b text-left">User ID</th>
                    <th className="py-3 px-4 border-b text-left">Employer Name</th>
                    <th className="py-3 px-4 border-b text-left">
                      Verification ID
                    </th>
                    <th className="py-3 px-4 border-b text-left">Status</th>
                    <th className="py-3 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...totaluploademployer].reverse().map((employer) => (
                    <tr
                      key={employer.userId}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 border-b">{employer.userId}</td>
                      <td className="py-3 px-4 border-b">{employer.fullName}</td>
                      <td className="py-3 px-4 border-b">
                        <button
                          onClick={() => setSelectedImage(employer.verificationId)}
                          className="text-blue-500 underline"
                        >
                          View Image
                        </button>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {employer.isIdVerified !== undefined ? (
                          <span
                            className={`font-semibold ${
                              employer.isIdVerified
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {employer.isIdVerified ? "Verified" : "Not verified"}
                          </span>
                        ) : (
                          <span className="text-gray-500">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {employer.isIdVerified === false && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleVerificationUpdate(employer.userId, true)
                              }
                              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleVerificationUpdate(employer.userId, false)
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
              No pending employer verifications.
            </p>
          )}
        </>
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

export default AdminEmployerVerifyId;