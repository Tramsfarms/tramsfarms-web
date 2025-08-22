"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import constants from "@/utils/constant";

export default function AdditionalInformationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [contactMethod, setContactMethod] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [taxId, setTaxId] = useState("");
  const { API_URL } = constants;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get("vendors_auth_token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.post(
        `${API_URL}additional-info`,
        {
          preferred_contact_method: contactMethod,
          preferred_language: preferredLanguage,
          tax_id: taxId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Additional information saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>
            Provide additional details to help us serve you better
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                <Select value={contactMethod} onValueChange={setContactMethod}>
                  <SelectTrigger id="contactMethod">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="in_app">In-App Messaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select
                  value={preferredLanguage}
                  onValueChange={setPreferredLanguage}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="yoruba">Yoruba</SelectItem>
                    <SelectItem value="igbo">Igbo</SelectItem>
                    <SelectItem value="hausa">Hausa</SelectItem>
                    <SelectItem value="pidgin">Nigerian Pidgin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">
                  Tax Identification Number (Optional)
                </Label>
                <Input
                  id="taxId"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="Enter your TIN"
                />
              </div>
            </div>

            <Button variant={"primary"} type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Information"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
