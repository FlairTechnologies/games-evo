import React from "react";
import { useToast } from "./use-toast";

// Custom toast handler
const useCustomToast = () => {
  const { toast } = useToast();

  const showToast = ({ variant, title, description }) => {
    let toastClasses;

    // Define classes based on variant
    switch (variant) {
      case "success":
        toastClasses = "bg-[#66bb6a] text-white"; // Success variant
        break;
      case "error":
        toastClasses = "bg-[#e03f3e] text-white"; // Error variant
        break;
      case "warning":
        toastClasses = "bg-yellow-600 text-black"; // Warning variant
        break;
      case "info":
        toastClasses = "bg-[#27c6d9] text-white"; // Info variant
        break;
      case "destructive":
        toastClasses = "bg-red-900 text-white"; // Destructive variant (already existing)
        break;
      default:
        toastClasses = "bg-gray-600 text-white"; // Default variant
        break;
    }

    // Trigger the toast with the assigned classes
    toast({
      variant: "custom", // You can either use 'custom' or leave it as 'default'
      title,
      description,
      className: toastClasses, // Use the dynamic class
    });
  };

  return showToast;
};

export default useCustomToast;