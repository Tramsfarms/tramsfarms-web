"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import constant from "../../../../utils/constant";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function RegisterEmail() {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const router = useRouter();

  const { API_URL } = constant;

  useEffect(() => {}, []);
  const [isLoading, setIsLoading] = useState(false);

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
        fullname: fullname,
      };

      const response = await axios.post(`${API_URL}register/step-1`, data, {
        headers: myHeaders,
      });

      if (response.status == 200) {
        router.push("/register/verify");
        Cookies.set("email", email);
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

  return (
    <>
      <div className="w-full h-screen">
        <div className="hidden h-20 shadow-sm bg-grays-50 md:block"></div>
        <div className="fixed flex items-center justify-center w-full h-screen p-5 font-normal">
          <div className="space-y-2 w-full flex flex-col items-center max-w-[400px]">
            <img src="/images/logo/BWT.svg" className="w-1/2 h-1/2" />
            <form
              onSubmit={submit}
              className="flex flex-col items-center w-full px-5 py-3 rounded-2xl bg-grays-50"
            >
              <h1 className="font-sans text-lg font-normal md:text-2xl">
                Sign Up
              </h1>

              <div className="w-full mt-3 space-y-3">
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:border-brand-500 focus:ring-0 focus:border ring-0"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:border-brand-500 focus:ring-0 ring-0 focus:border focus:outline-none"
                  placeholder="Email"
                />
                <button
                  onClick={submit}
                  type="submit"
                  className="flex items-center justify-center w-full p-2 text-white rounded-lg bg-brand-500 hover:bg-brand-400"
                  // disabled={processing}
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
                    "Create Your Account"
                  )}
                </button>
                <div className="flex justify-center text-sm">
                  <h1>Already have an Account?</h1>
                  <Link href="/login" className="text-brand-500">
                    Sign In
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center mt-5 space-y-2">
                <h1>Or</h1>
                <button className="flex items-center p-2 px-3 space-x-2 text-xs border rounded-lg sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-500"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"
                    />
                  </svg>
                  <span>Log In With Facebook</span>
                </button>
                <button className="flex items-center p-2 px-3 space-x-2 text-xs border rounded-lg sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    />
                    <path
                      fill="#ff3d00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    />
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    />
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    />
                  </svg>
                  <span>Continue With Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
