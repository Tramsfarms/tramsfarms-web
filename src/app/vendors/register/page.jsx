"use client";
import { countries } from "../../../../utils/countries";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const router = useRouter();

  // Load the saved country from cookies (if it exists) on component mount
  useEffect(() => {
    const savedCountry = Cookies.get("selectedCountry");
    if (savedCountry) {
      setSelectedCountry(savedCountry);
    }
  }, []);

  const toNext = () => {
    if (!selectedCountry) {
      toast.error("Please Select a Country");
    } else {
      Cookies.set("selectedCountry", selectedCountry);
      router.push("/vendors/register/email");
    }
  };

  // Function to handle when the user selects a country
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    Cookies.set("selectedCountry", countryCode); // Save to cookies
  };
  return (
    <div>
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-3xl font-bold">
          Sell on <span className="text-primary">Transfarms</span>
        </h1>
        <div>
          <span className="text-sm text-grays-500">
            Choose the country of your farm
          </span>
        </div>
        <select
          name="country"
          id="country"
          className="w-full p-2 bg-white border rounded-md outline-none"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="" disabled selected>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          name="country"
          id="country"
          className="w-full p-2 bg-white border rounded-md outline-none"
          // value={selectedCountry}
          // onChange={handleCountryChange}
        >
          <option value="" disabled selected>
            Select Account Type
          </option>
          <option value="wholesale">WholeSale</option>
          <option value="wholesale">Retails</option>
        </select>

        <button
          onClick={() => toNext()}
          className="w-full p-2 font-bold text-white rounded-md hover:bg-green-400 bg-primary"
        >
          Next
        </button>
        <div>
          <span className="font-sans text-[10px] text-red-300">
            Only for sellers registered & selling in their own country
          </span>
        </div>
        <div className="space-x-2 font-bold">
          <span>Already have an account?</span>
          <Link href="/vendors/login" className="text-primary">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
