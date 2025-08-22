"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import constant from "../../../../../../utils/constant";

export default function BusinessInformation() {
  const [processing, setProcessing] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;
  const router = useRouter();

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const token = Cookies.get("vendors_auth_token");

        if (!token) {
          throw new Error("User not authenticated");
        }

        const myHeaders = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${API_URL}business-info`, {
          headers: myHeaders,
        });

        if (response.status === 200 && response.data.data) {
          const {
            farm_name,
            years_experience,
            street_no,
            street_address,
            city,
            state,
            government_id_number,
          } = response.data.data;

          setFarmName(farm_name);
          setYearsOfExperience(years_experience);
          setStreetNo(street_no);
          setStreetAddress(street_address);
          setCity(city);
          setState(state);
          setIdNumber(government_id_number);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.info(
            "No business information found, please fill out the form."
          );
        } else {
          toast.error("An error occurred while fetching business information.");
        }
      }
    };

    fetchBusinessInfo();
  }, [API_URL]);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get("vendors_auth_token");

      const myHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = {
        farm_name: farmName,
        years_of_experience: yearsOfExperience,
        street_no: streetNo,
        street_address: streetAddress,
        city,
        state,
        government_id_number: idNumber,
      };

      const response = await axios.post(`${API_URL}business-info`, data, {
        headers: myHeaders,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        // Optionally redirect after successful submission
        // router.push("/some-page");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="w-full p-5 bg-white rounded-lg">
        <h1 className="mt-5 text-xl font-medium text-gray-400">
          Farm Information
        </h1>

        <form onSubmit={submit}>
          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
            <input
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Farm Name"
              required
            />
            <input
              type="text"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Years of Experience"
              required
            />
            <input
              type="text"
              value={streetNo}
              onChange={(e) => setStreetNo(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Street No."
              required
            />
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Street Address"
              required
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="City"
              required
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="State"
              required
            />
          </div>

          <h1 className="mt-5 text-xl font-medium text-gray-400">
            Identification Details
          </h1>

          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Government-Issued ID Number"
              required
            />
          </div>
          <button
            type="submit"
            className="p-[4px_12px] text-white font-medium mt-5 rounded-lg bg-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                />
                <path
                  fill="currentColor"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                />
              </svg>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
