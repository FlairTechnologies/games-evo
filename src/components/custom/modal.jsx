import { X } from "lucide-react";
import React from "react";

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg relative">
        {/* Close Icon */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          You are not subscribed
        </h2>

        {/* Modal Message */}
        <p className="mt-2 text-gray-600">
          Subscribe now to enjoy premium features and services.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={onSubscribe}
            className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 text-base font-semibold"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;