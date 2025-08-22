"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import checkmark and x icons

export default function RegisterPassword() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [processing, setProcessing] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState({
    color: "red",
    label: "Low",
  });
  const [requirements, setRequirements] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    // Check each requirement and update state
    const validatePassword = () => {
      const hasMinLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      // Set state for password requirements
      setRequirements({
        hasMinLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
      });

      // Determine password strength
      const checks = [
        hasMinLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
      ].filter(Boolean).length;
      let strength = { color: "red", label: "Low" };

      if (checks <= 2) {
        strength = { color: "red", label: "Low" };
      } else if (checks === 3 || checks === 4) {
        strength = { color: "orange", label: "Medium" };
      } else if (checks === 5) {
        strength = { color: "brand", label: "Strong" };
      }

      setPasswordStrength(strength);
    };

    validatePassword();
  }, [password]);

  const submit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="fixed flex items-center justify-center w-full h-screen p-5 font-normal">
          <div className="space-y-2 w-full flex flex-col items-center max-w-[400px]">
            <img src="/images/logo/BWT.svg" className="w-1/2 h-1/2" />
            <form
              onSubmit={submit}
              className="flex flex-col w-full px-5 py-5 rounded-2xl bg-grays-50"
            >
              <h1 className="font-sans text-2xl font-normal md:text-3xl">
                Set Password
              </h1>
              <p className="mt-3 font-sans text-xs">
                Password requires a minimum of 8 characters and contains a mix
                of letters, numbers, and symbols.
              </p>

              <div className="w-full mt-5 space-y-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 text-sm bg-white border rounded-lg focus:outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0"
                  placeholder="Password"
                />
                <input
                  type="password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
                  placeholder="Confirm Password"
                />

                {/* Password strength bar */}
                <div className="flex items-center w-full space-x-3">
                  <div
                    className={`flex-1 h-1 rounded-full bg-${passwordStrength.color}-500`}
                  ></div>
                  <p
                    className={`font-sans text-xs text-${passwordStrength.color}-500`}
                  >
                    {passwordStrength.label}
                  </p>
                </div>

                {/* Password requirements list */}
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    {requirements.hasMinLength ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="ml-2">At least 8 characters</span>
                  </li>
                  <li className="flex items-center">
                    {requirements.hasUpperCase ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="ml-2">One uppercase letter</span>
                  </li>
                  <li className="flex items-center">
                    {requirements.hasLowerCase ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="ml-2">One lowercase letter</span>
                  </li>
                  <li className="flex items-center">
                    {requirements.hasNumber ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="ml-2">One number</span>
                  </li>
                  <li className="flex items-center">
                    {requirements.hasSpecialChar ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="ml-2">One special character</span>
                  </li>
                </ul>

                <button
                  type="submit"
                  className="w-full p-2 mt-5 text-white rounded-lg bg-brand-500 hover:bg-brand-400"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Create Your Account"}
                </button>
                <div className="flex justify-center mt-3 text-sm">
                  <h1>Already have an Account?</h1>
                  <Link href="/login" className="ml-1 text-brand-500">
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
