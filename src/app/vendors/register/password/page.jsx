"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import constant from "../../../../../utils/constant";

export default function RegisterPassword() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [processing, setProcessing] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;

  const router = useRouter();

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
    const email = Cookies.get("vendor_email");
    if (email) {
      setEmail(email);
    }
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

  const submit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const myHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const data = {
        email: email,
        password: password,
        password_confirmation: confirm_password,
        phone_number: phone,
      };

      const response = await axios.post(
        `${API_URL}vendor/register/step-3`,
        data,
        {
          headers: myHeaders,
        }
      );

      router.push("/vendors/register/details");
      //Cookies.set("email", email);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            toast.error(errorMessage); // Display each error message with toast
          });
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Display general error message
      } else {
        toast.error("An unknown error occurred!"); // Handle any unexpected errors
      }
      //console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="flex flex-col items-center space-y-3 text-center"
      >
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <div>
          <span className="text-xs md:text-[10px] text-grays-500">
            Set up your password and provide your phone number
          </span>
        </div>

        <div className="w-full mt-5 space-y-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 text-sm bg-white border rounded-lg focus:outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0"
            placeholder="Phone Number"
          />
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
            onClick={submit}
            className="flex justify-center w-full p-2 mt-5 text-white rounded-md bg-brand-500 hover:bg-brand-400"
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                  opacity="0.5"
                />
                <path
                  fill="currentColor"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    from="0 12 12"
                    repeatCount="indefinite"
                    to="360 12 12"
                    type="rotate"
                  />
                </path>
              </svg>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
