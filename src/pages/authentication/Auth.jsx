import Logo from "../../assets/images/Background.png";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Phone, ArrowRight, Loader2, KeyRound, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";
import useCustomToast from "../../hooks/use-custom-toast";

const PHONE_LENGTH = 11;
const CODE_LENGTH = 6;

const ValidTick = ({ visible }) => (
  <div
    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300
      ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
  >
    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
);

const DigitsInput = ({ icon: Icon, value, onChange, isValid, maxLength, placeholder, label, autoComplete, autoFocus }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <Icon className={`w-5 h-5 ${isValid ? "text-green-500" : "text-gray-400"}`} />
    </div>
    <input
      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 text-lg rounded-xl
        transition-all duration-200 focus:ring-2 focus:ring-offset-2
        ${isValid
          ? "border-green-500 focus:border-green-500 focus:ring-green-500/50"
          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/50"
        }`}
      type="text"
      inputMode="numeric"
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, maxLength))}
      maxLength={maxLength}
      required
      aria-label={label}
    />
    <ValidTick visible={isValid} />
  </div>
);

const SubmitButton = ({ enabled, loading, loadingText, children }) => (
  <Button
    type="submit"
    className={`w-full py-6 text-lg font-medium transition-all duration-200
      ${enabled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
    disabled={!enabled || loading}
  >
    {loading ? (
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>{loadingText}</span>
      </div>
    ) : (
      <div className="flex items-center justify-center gap-2">{children}</div>
    )}
  </Button>
);

const Auth = () => {
  const { status, requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from ?? "/start-quiz";

  useEffect(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return undefined;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  if (status === "authenticated" && !isLoading) {
    return <Navigate to={destination} replace />;
  }

  const showError = (err, title) => {
    toast({ variant: "error", title, description: err.message });
    if (err.details?.retryAfterSeconds) setResendIn(err.details.retryAfterSeconds);
  };

  const sendCode = async () => {
    setIsLoading(true);
    try {
      const { resendAfterSeconds } = await requestOtp(phoneNumber);
      setStep("code");
      setCode("");
      setResendIn(resendAfterSeconds);
      toast({ variant: "info", title: "Code sent", description: `We sent a 6-digit code to ${phoneNumber}.` });
    } catch (err) {
      // A cooldown means a code was already sent recently: let them enter it.
      if (err.code === "OTP_COOLDOWN") setStep("code");
      showError(err, "Couldn't send code");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === PHONE_LENGTH) void sendCode();
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== CODE_LENGTH) return;
    setIsLoading(true);
    try {
      await verifyOtp(phoneNumber, code);
      toast({ variant: "success", title: "Welcome!", description: "You're signed in." });
      setShowContent(false);
      setTimeout(() => navigate(destination, { replace: true }), 300);
    } catch (err) {
      setCode("");
      if (err.code === "OTP_EXPIRED" || err.code === "OTP_TOO_MANY_ATTEMPTS") setResendIn(0);
      showError(err, "Verification failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card
        className={`w-full max-w-4xl overflow-hidden shadow-xl transition-all duration-500 transform
        ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
            <img src={Logo} alt="Welcome" className="w-full h-full object-cover" />
          </div>

          <div className="md:w-1/2 p-8 space-y-6">
            {step === "phone" ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
                  <p className="text-gray-600">Enter your phone number to get started</p>
                </div>
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <DigitsInput
                    icon={Phone}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    isValid={phoneNumber.length === PHONE_LENGTH}
                    maxLength={PHONE_LENGTH}
                    placeholder="e.g. 08031234567"
                    label="Phone number"
                    autoComplete="tel-national"
                  />
                  <SubmitButton enabled={phoneNumber.length === PHONE_LENGTH} loading={isLoading} loadingText="Sending code...">
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </SubmitButton>
                </form>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Enter your code</h2>
                  <p className="text-gray-600">
                    We sent a 6-digit code by SMS to <span className="font-semibold">{phoneNumber}</span>
                  </p>
                </div>
                <form onSubmit={handleCodeSubmit} className="space-y-6">
                  <DigitsInput
                    icon={KeyRound}
                    value={code}
                    onChange={setCode}
                    isValid={code.length === CODE_LENGTH}
                    maxLength={CODE_LENGTH}
                    placeholder="6-digit code"
                    label="Verification code"
                    autoComplete="one-time-code"
                    autoFocus
                  />
                  <SubmitButton enabled={code.length === CODE_LENGTH} loading={isLoading} loadingText="Verifying...">
                    <span>Verify & continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </SubmitButton>
                </form>
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change number
                  </button>
                  <button
                    type="button"
                    onClick={() => void sendCode()}
                    disabled={resendIn > 0 || isLoading}
                    className="font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                  >
                    {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
                  </button>
                </div>
              </>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Need help?</span>
                </div>
              </div>
              <div className="text-center">
                <a href="mailto:enquiries@gameevo.ng" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
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
