"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowRight, Upload, Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import useRegistrationStore from "@/stores/registerStore";

export default function SellerInfoPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    farm_name,
    farm_address,
    farm_description,
    farm_image,
    setFarmName,
    setFarmAddress,
    setFarmDescription,
    setFarmImage,
  } = useRegistrationStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFarmImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (!farm_name) {
      toast.error("Please enter your farm name");
      return;
    }

    if (!farm_address) {
      toast.error("Please enter your farm address");
      return;
    }

    if (!farm_image) {
      toast.error("Please upload an image of your farm");
      return;
    }

    setIsLoading(true);

    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      router.push("/register/complete");
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <div className="w-full max-w-[340px] xs:max-w-[370px] sm:max-w-md md:max-w-lg p-4 space-y-4 sm:space-y-6">
        <Card className="overflow-hidden shadow-md border-muted/60">
          <CardHeader className="p-3 space-y-1 text-center sm:p-4 md:p-6">
            <CardTitle className="text-lg font-bold sm:text-xl md:text-2xl">
              Seller Information
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Tell us more about your farm business
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1 sm:p-4 md:p-6 sm:pt-2 md:pt-2">
            <div className="space-y-3 sm:space-y-2">
              <div className="space-y-1 sm:space-y-1">
                <Label htmlFor="farmName" className="text-sm sm:text-base">
                  Farm Name
                </Label>
                <Input
                  id="farmName"
                  placeholder="Enter your farm name"
                  value={farm_name}
                  onChange={(e) => setFarmName(e.target.value)}
                  required
                  className="text-sm sm:text-base h-9 sm:h-10"
                />
              </div>

              <div className="space-y-1 sm:space-y-1">
                <Label htmlFor="farmAddress" className="text-sm sm:text-base">
                  Farm Address
                </Label>
                <Input
                  id="farmAddress"
                  placeholder="Enter your farm address"
                  value={farm_address}
                  onChange={(e) => setFarmAddress(e.target.value)}
                  required
                  className="text-sm sm:text-base h-9 sm:h-10"
                />
              </div>

              <div className="space-y-1 sm:space-y-1">
                <Label
                  htmlFor="farmDescription"
                  className="text-sm sm:text-base"
                >
                  Farm Description (Optional)
                </Label>
                <Textarea
                  id="farmDescription"
                  placeholder="Tell us about your farm and products"
                  value={farm_description || ""}
                  onChange={(e) => setFarmDescription(e.target.value)}
                  rows={1}
                  className="text-sm sm:text-base min-h-[60px] sm:min-h-[80px] resize-none"
                />
              </div>

              <div className="">
                <Label className="text-sm sm:text-base">Farm Image</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-2 sm:p-3 text-center cursor-pointer transition-colors ${
                    farm_image
                      ? "border-primary/50 bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                  onClick={handleUploadClick}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  {farm_image ? (
                    <div className="space-y-1 sm:space-y-2">
                      <div className="relative w-full h-16 mx-auto overflow-hidden rounded-md sm:h-20 md:h-28">
                        <img
                          src={farm_image || "/placeholder.svg"}
                          alt="Farm preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="py-1 space-y-1 sm:py-2">
                      <Upload className="w-5 h-5 mx-auto sm:w-6 sm:h-6 md:w-7 md:h-7 text-muted-foreground" />
                      <p className="text-xs font-medium sm:text-sm">
                        Click to upload farm image
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        JPG, PNG or GIF (max. 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                className="w-full mt-2 sm:mt-3 text-sm sm:text-base py-1.5 sm:py-2 h-auto"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* <div className="flex justify-center mt-2">
          <img
            src="/images/logo/BWT.svg"
            alt="Tramsfarms Logo"
            className="h-6 sm:h-8 md:h-10"
          />
        </div> */}
      </div>
    </div>
  );
}
