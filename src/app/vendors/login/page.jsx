"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

import constant from "../../../../utils/constant";

export default function RegisterEmail() {
  const [processing, setProcessing] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;

  const router = useRouter();

  useEffect(() => {}, []);

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
      };

      const response = await axios.post(`${API_URL}vendor/login`, data, {
        headers: myHeaders,
      });

      if (response.status == 200) {
        router.push("/vendors");
        Cookies.set("vendors_auth_token", response.data.token);
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
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred!");
      }
      //console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="hidden h-20 shadow-sm bg-grays-50"></div>
        <div className="fixed flex items-center justify-center w-full h-screen p-5 font-normal">
          <div className="space-y-2 w-full flex flex-col items-center max-w-[400px]">
            <form
              onSubmit={submit}
              className="flex flex-col items-center w-full p-5 bg-white border shadow-sm md:p-10 rounded-2xl"
            >
              <h1 className="font-sans text-lg font-bold md:text-2xl">
                Sellers Log In
              </h1>

              <div className="w-full mt-3 space-y-3">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
                  placeholder="Password"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" name="" id="" />
                    <h1 className="font-sans">Remember me</h1>
                  </div>

                  <button
                    type="submit"
                    onClick={submit}
                    className="flex items-center justify-center p-2 text-white rounded-md bg-brand-500 hover:bg-brand-400"
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
                      "SUBMIT"
                    )}
                  </button>
                </div>

                {/* <div className="mt-10">
                  <Link
                    href="/vendor/forgot-password"
                    className="mt-20 text-primary"
                  >
                    Forgot Password?
                  </Link>
                </div> */}
              </div>
            </form>
            <div className="mt-10">
              <img
                src="/images/logo/BWT.svg"
                className="w-[150px] mt-5 h-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
