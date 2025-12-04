"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

import constant from "../../../../../utils/constant";
import Image from "next/image";

export default function PersonalInformation() {
  const [full_name, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [govtIdNumber, setGovtIdNumber] = useState("");
  const [idType, setIdType] = useState("");
  const [is_verified, setVerified] = useState("");
  const [idImage, setIdImage] = useState(null); // New state for ID image
  const fileInputRef = useRef(null);
  const [profilePics, setProfilePics] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;
  const router = useRouter();

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = Cookies.get("vendors_auth_token"); // Get the token from cookies

        if (!token) {
          throw new Error("User not authenticated");
        }

        const myHeaders = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        };

        const response = await axios.get(`${API_URL}profile`, {
          headers: myHeaders,
        });

        if (response.status === 200 && response.data.data) {
          const {
            fullname,
            gender,
            phone_number,
            email,
            street_no,
            street_address,
            city,
            state,
            govt_id_number,
            id_type,
            id_image,
            is_verified,
            profile_picture,
          } = response.data.data;

          setFullname(fullname);
          setGender(gender);
          setProfilePics(profile_picture);
          setPhoneNumber(phone_number);
          setVerified(is_verified);
          setEmail(email);
          setStreetNo(street_no);
          setStreetAddress(street_address);
          setCity(city);
          setState(state);
          setGovtIdNumber(govt_id_number);
          setIdType(id_type);
          setIdImage(id_image);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.info(
            "No personal information found, please fill out the form."
          );
        } else {
          toast.error("An error occurred while fetching personal information.");
        }
      }
    };

    fetchPersonalInfo();
  }, [API_URL]);

  const uploadProfilePicture = async () => {
    if (!idImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    const token = Cookies.get("vendors_auth_token");
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", idImage);

    try {
      const response = await axios.post(
        `${API_URL}upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile picture uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload profile picture.");
    }
  };

  const submit = async (e) => {
    console.log("Submit function called");

    e.preventDefault();
    console.log("img", idImage);
    setIsLoading(true);

    try {
      const token = Cookies.get("vendors_auth_token"); // Get the token from cookies

      const myHeaders = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      };

      const formData = new FormData();
      formData.append("full_name", full_name);
      formData.append("gender", gender);
      formData.append("phone_number", phoneNumber);
      formData.append("email", email);
      formData.append("street_no", streetNo);
      formData.append("street_address", streetAddress);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("govt_id_number", govtIdNumber);
      formData.append("id_type", idType); // Add the ID type to the form data
      if (idImage) {
        console.log("Appending image:", idImage);
        formData.append("id_image", idImage); // Add the ID image to the form data
      }

      const response = await axios.post(`${API_URL}profile`, formData, {
        headers: myHeaders,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        // Optionally redirect or perform another action
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

  const [isUploading, setIsUploading] = useState(false);

  const defaultImage = "/images/no-dp.png"; //default image

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      //setImagePreview(URL.createObjectURL(file)); // Set preview immediately

      // Prepare file upload
      const token = Cookies.get("vendors_auth_token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        setIsUploading(true);
        const response = await axios.post(
          `${API_URL}upload-profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Profile picture uploaded successfully!");
          // Optionally update image preview with the server URL if needed
          setProfilePics(response.data.profile_picture_url);
        }
      } catch (error) {
        toast.error("Failed to upload profile picture.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mt-5">
      <div className="w-full p-5 bg-white rounded-lg">
        <h1 className="text-xl font-medium text-gray-400">
          Personal Information
        </h1>

        <form onSubmit={submit}>
          <div>
            <div className="relative grid grid-cols-3 p-4">
              <div className="flex flex-col items-center gap-2 space-y-2">
                <div className="border-2 rounded-full relative z-0 border-primary w-[150px] h-[150px]">
                  <Image
                    src={profilePics ? profilePics : defaultImage}
                    width={200}
                    height={200}
                    alt="Profile pics"
                    className="rounded-full"
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden w-full p-2 mb-4 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0"
                />

                <div
                  className={`px-2 flex py-1 space-x-2 rounded-full text-white ${
                    is_verified == 1 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {is_verified ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m10.95 13.43l-1.796-1.79q-.14-.14-.341-.15q-.202-.01-.367.156q-.16.16-.16.354t.16.354l1.938 1.938q.243.242.566.242t.566-.242l4.038-4.038q.146-.146.153-.344q.007-.199-.153-.364q-.165-.165-.357-.168t-.356.162zm-2.28 7.186l-1.316-2.2l-2.481-.524q-.298-.055-.475-.32q-.177-.264-.146-.562l.237-2.556l-1.683-1.92q-.212-.217-.212-.534t.212-.534l1.683-1.92l-.237-2.555q-.03-.299.146-.563q.177-.264.475-.32l2.48-.523l1.316-2.2q.162-.268.435-.37q.273-.103.565.027L12 4.027l2.33-.985q.293-.13.566-.027q.273.102.435.37l1.315 2.2l2.481.523q.298.056.475.32t.146.563l-.236 2.555l1.682 1.92q.212.217.212.534t-.212.535l-1.682 1.919l.236 2.555q.03.299-.146.563q-.177.265-.475.32l-2.48.524l-1.316 2.2q-.162.267-.435.37t-.565-.028L12 19.973l-2.33.985q-.293.13-.566.027q-.273-.102-.435-.37m.781-.665L12 18.889l2.562 1.061L16 17.55l2.75-.611l-.25-2.839l1.85-2.1l-1.85-2.111l.25-2.839l-2.75-.6l-1.45-2.4L12 5.112L9.439 4.05L8 6.45l-2.75.6l.25 2.839L3.65 12l1.85 2.1l-.25 2.85l2.75.6zM12 12"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-3.78 5.78l-1.44 1.44L14.564 16l-3.782 3.78l1.44 1.44L16 17.437l3.78 3.78l1.44-1.437L17.437 16l3.78-3.78l-1.437-1.44L16 14.564l-3.78-3.782z"
                      ></path>
                    </svg>
                  )}

                  <p>{is_verified ? "Verified" : "Unverified"}</p>
                </div>

                <button
                  type="button"
                  onClick={handleButtonClick}
                  className={`px-4 py-2 text-white rounded-lg ${
                    isUploading
                      ? "bg-green-200"
                      : "bg-primary hover:bg-green-600"
                  }`}
                >
                  Change Profile Picture
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
            <input
              type="text"
              value={full_name}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Fullname"
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Phone Number"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Email Address"
              required
            />
          </div>

          <h1 className="mt-5 text-xl font-medium text-gray-400">
            Contact Information
          </h1>

          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
            <input
              type="text"
              value={streetNo}
              onChange={(e) => setStreetNo(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Street No."
            />
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Street Address"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="City"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="State"
            />
          </div>

          <h1 className="mt-5 text-xl font-medium text-gray-400">
            Identification Details
          </h1>

          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
            <select
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
            >
              <option value="">Select ID Type</option>
              <option value="passport">Passport</option>
              <option value="drivers_license">Driver's License</option>
              <option value="national_id">National ID</option>
              <option value="voters_card">Voter's Card</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIdImage(e.target.files[0])}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={`mt-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            } px-4 py-2 bg-brand-500 text-white rounded-lg`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
