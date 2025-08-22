"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Building, MapPin, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import constant from "@/utils/constant";

export default function BusinessInformation() {
  const [processing, setProcessing] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [farmDescription, setFarmDescription] = useState("");
  const [farmType, setFarmType] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;
  const router = useRouter();

  const farmTypes = [
    "Crop Farm",
    "Livestock Farm",
    "Mixed Farm",
    "Poultry Farm",
    "Fish Farm",
    "Dairy Farm",
    "Fruit Farm",
    "Vegetable Farm",
    "Other",
  ];

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
            farm_description,
            farm_type,
            street_no,
            street_address,
            city,
            state,
            government_id_number,
          } = response.data.data;

          setFarmName(farm_name || "");
          setYearsOfExperience(years_experience || "");
          setFarmDescription(farm_description || "");
          setFarmType(farm_type || "");
          setStreetNo(street_no || "");
          setStreetAddress(street_address || "");
          setCity(city || "");
          setState(state || "");
          setIdNumber(government_id_number || "");
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

      if (!token) {
        throw new Error("User not authenticated");
      }

      const myHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = {
        farm_name: farmName,
        years_of_experience: yearsOfExperience,
        farm_description: farmDescription,
        farm_type: farmType,
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
        toast.success(
          response.data.message || "Business information saved successfully"
        );
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
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Provide details about your farm business to help customers learn
            more about you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-8">
            {/* Farm Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Farm Details</h3>
              </div>
              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input
                    id="farmName"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="Enter your farm name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmType">Farm Type</Label>
                  <Select value={farmType} onValueChange={setFarmType}>
                    <SelectTrigger id="farmType">
                      <SelectValue placeholder="Select farm type" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="Enter years of experience"
                    min="0"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="farmDescription">Farm Description</Label>
                  <Textarea
                    id="farmDescription"
                    value={farmDescription}
                    onChange={(e) => setFarmDescription(e.target.value)}
                    placeholder="Describe your farm, products, and farming practices"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    This description will be visible to customers browsing your
                    products.
                  </p>
                </div>
              </div>
            </div>

            {/* Farm Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Farm Location</h3>
              </div>
              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="streetNo">Street Number</Label>
                  <Input
                    id="streetNo"
                    value={streetNo}
                    onChange={(e) => setStreetNo(e.target.value)}
                    placeholder="Street No."
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Street Address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                  />
                </div>
              </div>
            </div>

            {/* Business Identification Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Business Identification</h3>
              </div>
              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="idNumber">
                    Business Registration Number (Optional)
                  </Label>
                  <Input
                    id="idNumber"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="Enter business registration number"
                  />
                  <p className="text-xs text-muted-foreground">
                    If your farm is registered as a business, provide the
                    registration number.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant={"primary"} type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
