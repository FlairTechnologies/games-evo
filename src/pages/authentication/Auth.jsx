import Logo from "../../assets/images/Background.png";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import useCustomToast from "../../hooks/use-custom-toast";

const PhoneNumberInput = ({ value, onChange, isValid }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <Phone className={`w-5 h-5 ${isValid ? 'text-green-500' : 'text-gray-400'}`} />
    </div>
    <input
      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 text-lg rounded-xl 
        transition-all duration-200 focus:ring-2 focus:ring-offset-2
        ${isValid 
          ? 'border-green-500 focus:border-green-500 focus:ring-green-500/50' 
          : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/50'
        }`}
      type="text"
      placeholder="Enter your phone number"
      value={value}
      onChange={onChange}
      maxLength={11}
      required
      aria-label="Phone number input"
    />
    <div 
      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300
        ${isValid ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
        <svg 
          className="w-4 h-4 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
    </div>
  </div>
);

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const toast = useCustomToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fade in animation on mount
    setShowContent(true);
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    setIsValid(value.length === 11);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        variant: "success",
        title: "Welcome back!",
        description: "Successfully authenticated your phone number.",
      });
      
      // Animate out before navigation
      setShowContent(false);
      setTimeout(() => navigate("/quiz"), 300);
      
    } catch (error) {
      toast({
        variant: "error",
        title: "Authentication failed",
        description: "Please try again or contact support.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className={`w-full max-w-4xl overflow-hidden shadow-xl transition-all duration-500 transform
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
            <img
              src={Logo}
              alt="Welcome"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
              <p className="text-gray-600">
                Enter your phone number to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <PhoneNumberInput 
                value={phoneNumber}
                onChange={handlePhoneChange}
                isValid={isValid}
              />

              <Button
                type="submit"
                className={`w-full py-6 text-lg font-medium transition-all duration-200
                  ${isValid 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;