import Logo from "../../assets/images/Background.png";
import Loader from "../../components/custom/loader";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import useCustomToast from "../../hooks/use-custom-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const toast = useCustomToast();
  const navigate = useNavigate(); // Updated for navigation

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhoneNumber(value);
    setDisabled(value.length < 11);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (phoneNumber.length === 11) {
      toast({
        variant: "success",
        title: "Success!",
        description: "Your phone number has been submitted.",
      });
      navigate("/"); // Updated for navigation
      setLoader(false);
    } else {
      toast({
        variant: "error",
        title: "Error!",
        description: "Please enter a valid 11-digit phone number.",
      });
      setLoader(false);
    }
  };

  return (
    <div className="authentication min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-3xl h-2/3 bg-white/90 p-6 shadow-lg backdrop-blur-md pl-0 py-0 relative flex items-center justify-center">
        <CardContent className="w-1/2 border-r-2 p-0">
          <img
            src={Logo}
            alt="Background Logo"
            className="w-full h-full object-cover"
          />
        </CardContent>
        <CardContent className="space-y-6 py-6 w-1/2">
          <div className="text-start">
            <p className="text-gray-600 text-xl">
              To get started, Enter your phone number.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full p-3 bg-blue-50/50 border border-black text-xl rounded-md mb-1"
              type="text"
              placeholder="09037311304"
              value={phoneNumber}
              onChange={handlePhoneChange}
              id="number"
              maxLength={11}
              required
              aria-label="Phone number input"
            />

            {loader ? (
              <Loader /> // Show loader when the form is submitting
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-600 text-white py-6 text-lg"
                disabled={disabled}
              >
                Continue
              </Button>
            )}
          </form>

          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 hover:underline">
              Contact Us
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
