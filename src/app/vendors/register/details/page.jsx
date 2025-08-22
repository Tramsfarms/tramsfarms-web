"use client";
import { countries, states, referral } from "../../../../../utils/countries";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import constant from "../../../../../utils/constant";

export default function Page() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedRefferal, setSelectedRefferal] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;

  const router = useRouter();

  useEffect(() => {
    const email = Cookies.get("vendor_email");
    if (email) {
      setEmail(email);
    }
  });
  // Function to handle when the user selects a country
  const handleStateChange = (e) => {
    const countryCode = e.target.value;
    setSelectedState(countryCode);
  };

  const handleReferralChange = (e) => {
    const countryCode = e.target.value;
    setSelectedRefferal(countryCode);
  };

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
        farm_name: name,
        delivery_zone: selectedState,
        referral: selectedRefferal,
      };

      const response = await axios.post(
        `${API_URL}vendor/register/step-4`,
        data,
        {
          headers: myHeaders,
        }
      );

      router.push("/vendors/login");
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
    <div>
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-3xl font-bold">Farm Information</h1>
        <div>
          <span className="text-[10px] text-grays-500">
            Set up your farm by completing the following details
          </span>
        </div>

        <input
          type="text"
          placeholder="Farm Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md outline-none focus:border-primary"
        />

        <select
          name="country"
          id="country"
          className="w-full p-2 bg-white border rounded-md outline-none text-grays-500"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="" disabled selected>
            Delivery Zone
          </option>
          {states.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          name="country"
          id="country"
          className="w-full p-2 bg-white border rounded-md outline-none text-grays-500"
          value={selectedRefferal}
          onChange={handleReferralChange}
        >
          <option value="" disabled selected>
            How did you hear about Tramsfarms
          </option>
          {referral.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button
          onClick={submit}
          className="w-full p-2 font-bold text-white rounded-md hover:bg-green-400 bg-primary"
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
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
