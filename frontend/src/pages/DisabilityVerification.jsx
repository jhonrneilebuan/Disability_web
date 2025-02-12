import React, { useEffect } from "react";
import { adminStore } from "../stores/adminApi";

const DisabilityVerification = () => {
  const {
    getDisabilityVerificationId,
    updateDisabilityVerificationStatus,
    totaluploaddisability,
    isAdminLoading,
  } = adminStore();

  useEffect(() => {
    getDisabilityVerificationId();
  }, [getDisabilityVerificationId]);

  const handleVerificationUpdate = async (userId, isVerified) => {
    await updateDisabilityVerificationStatus(userId, isVerified);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">Disability Verification</h2>

      {isAdminLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {Array.isArray(totaluploaddisability) &&
          totaluploaddisability.length > 0 ? (
            totaluploaddisability.map((user) => (
              <div
                key={user.userId}
                className="mb-6 p-4 border rounded-lg bg-gray-100"
              >
                <p className="text-gray-700 mb-2 font-medium">
                  User ID: {user.userId}
                </p>
                <p className="text-gray-700 mb-2">
                  Verification ID: {user.verificationId || "Not available"}
                </p>
                {user.imageData && (
                  <div className="mb-3">
                    <img
                      src={`data:image/jpeg;base64,${user.imageData}`}
                      alt="Verification ID"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleVerificationUpdate(user.userId, true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleVerificationUpdate(user.userId, false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">
              No pending disability verifications.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default DisabilityVerification;
