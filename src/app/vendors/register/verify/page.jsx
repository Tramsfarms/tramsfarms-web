"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'
import {toast} from 'react-toastify'

import constant from "../../../../../utils/constant";

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;

  const router = useRouter();

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
        otp: otp
      };

      const response = await axios.post(`${API_URL}vendor/register/step-2`, data, {
        headers: myHeaders,
      });

      if (response.status == 200) {
        router.push("/vendors/register/password");
        //Cookies.set("email", email);
        toast.success(response.data.message);
      }
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

  // Load the saved country from cookies (if it exists) on component mount
  useEffect(() => {
    const email = Cookies.get("vendor_email");
    if (email) {
      setEmail(email)
    }
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-3xl font-bold">
          Set up your account
        </h1>
        <div>
          <span className="text-xs text-grays-500">
          Please provide your email address to create your seller account
          </span>
        </div>

<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-2 border rounded-md outline-none focus:border-primary"/>
<input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the verification code" className="w-full p-2 border rounded-md outline-none focus:border-primary no-spin"/>

        <button onClick={submit} className="flex justify-center w-full p-2 text-sm font-bold text-white uppercase rounded-md hover:bg-green-400 bg-primary">
        {isLoading ?  <svg
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
                    </svg>: "Verify"}
        </button>
        <button className="w-full p-2 text-sm font-bold uppercase border rounded-md hover:bg-green-400 border-primary text-primary">
         Resend Code
        </button>
      </div>
    </div>
  );
}
