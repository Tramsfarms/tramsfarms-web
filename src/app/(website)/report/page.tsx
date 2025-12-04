"use client";
import React, { useState } from "react";
import { AlertTriangle, Search, Upload, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reportService } from "@/utils/reportService";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  user: {
    name: string;
  };
}

// export const metadata: Metadata = {
//   title: "Report a Product | BWT Marketplace",
//   description: "Report a product that violates our policies or has issues.",
// };

export default function ReportProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    description: "",
    has_purchased: "no",
    order_number: "",
    reporter_name: "",
    reporter_email: "",
    reporter_phone: "",
    contact_consent: false,
    terms_consent: false,
  });
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) return;
    try {
      setLoading(true);
      const response = await reportService.searchProducts(query);
      setSearchResults(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to search products");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlVerify = async () => {
    if (!productUrl) return;
    try {
      setLoading(true);
      const response = await reportService.getProductByUrl(productUrl);
      setSelectedProduct(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to verify product URL");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 3) {
        toast.error("Maximum 3 files allowed");
        return;
      }
      setEvidenceFiles(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      toast.error("Please select a product to report");
      return;
    }

    if (!formData.contact_consent || !formData.terms_consent) {
      toast.error("Please accept the consent terms");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("product_id", selectedProduct.id.toString());
      data.append("reason", formData.reason);
      data.append("description", formData.description);
      data.append(
        "has_purchased",
        formData.has_purchased === "yes" ? "1" : "0"
      );
      data.append("order_number", formData.order_number);
      data.append("reporter_name", formData.reporter_name);
      data.append("reporter_email", formData.reporter_email);
      data.append("reporter_phone", formData.reporter_phone);
      data.append("contact_consent", formData.contact_consent ? "1" : "0");
      evidenceFiles.forEach((file) => {
        data.append("evidence_files[]", file);
      });

      await reportService.submitReport(data);
      toast.success("Report submitted successfully");
      // Reset form
      setFormData({
        reason: "",
        description: "",
        has_purchased: "no",
        order_number: "",
        reporter_name: "",
        reporter_email: "",
        reporter_phone: "",
        contact_consent: false,
        terms_consent: false,
      });
      setEvidenceFiles([]);
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Report a Product
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Help us maintain a safe marketplace by reporting products that
              violate our policies or have issues.
            </p>
          </div>

          <Alert className="mb-8 border-amber-200 bg-amber-50">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Important</AlertTitle>
            <AlertDescription className="text-amber-700">
              Your report will be kept confidential. Please provide accurate
              information to help us take appropriate action.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="search" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Search for Product</TabsTrigger>
              <TabsTrigger value="url">Enter Product URL</TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="p-4 mt-2 border rounded-md">
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                <Input
                  placeholder="Search for product by name, ID, or seller"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-500">Search Results:</p>
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <Card
                      key={product.id}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        selectedProduct?.id === product.id
                          ? "border-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <CardContent className="flex items-center p-4">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            Seller: {product.user.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="url" className="p-4 mt-2 border rounded-md">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productUrl">Product URL</Label>
                  <Input
                    id="productUrl"
                    placeholder="https://tramsfarms.com/product/..."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Copy and paste the full URL of the product page you want to
                    report.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUrlVerify}
                  disabled={loading}
                >
                  Verify URL
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {selectedProduct && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Selected Product</CardTitle>
                <CardDescription>
                  Please confirm this is the product you want to report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <div>
                    <h3 className="text-lg font-medium">
                      {selectedProduct.name}
                    </h3>
                    <p className="mb-2 text-gray-500">
                      Seller: {selectedProduct.user.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Report Details
              </h2>

              <div className="space-y-2">
                <Label htmlFor="reportReason">Reason for Report</Label>
                <Select
                  required
                  value={formData.reason}
                  onValueChange={(value) =>
                    setFormData({ ...formData, reason: value })
                  }
                >
                  <SelectTrigger id="reportReason">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="counterfeit">
                      Counterfeit or Fake Product
                    </SelectItem>
                    <SelectItem value="prohibited">
                      Prohibited or Restricted Item
                    </SelectItem>
                    <SelectItem value="misleading">
                      Misleading Description or Images
                    </SelectItem>
                    <SelectItem value="offensive">Offensive Content</SelectItem>
                    <SelectItem value="intellectual">
                      Intellectual Property Violation
                    </SelectItem>
                    <SelectItem value="quality">Quality Issues</SelectItem>
                    <SelectItem value="pricing">Pricing Issues</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportDescription">Detailed Description</Label>
                <Textarea
                  id="reportDescription"
                  placeholder="Please provide specific details about the issue..."
                  rows={5}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Include specific details about what's wrong with the product,
                  when you noticed the issue, and any other relevant
                  information.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Have you purchased this product?</Label>
                <RadioGroup
                  value={formData.has_purchased}
                  onValueChange={(value) =>
                    setFormData({ ...formData, has_purchased: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="purchased-yes" />
                    <Label htmlFor="purchased-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="purchased-no" />
                    <Label htmlFor="purchased-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderNumber">
                  Order Number (if applicable)
                </Label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., ORD-12345678"
                  value={formData.order_number}
                  onChange={(e) =>
                    setFormData({ ...formData, order_number: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Evidence (Optional)</Label>
                <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-lg">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-600">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="mb-4 text-xs text-gray-500">
                    Supported formats: JPG, PNG, PDF (Max 5MB each, up to 3
                    files)
                  </p>
                  <input
                    type="file"
                    id="evidence"
                    className="hidden"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="evidence">
                    <Button variant="outline" size="sm" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                  {evidenceFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Selected files:</p>
                      <ul className="mt-2 space-y-1">
                        {evidenceFiles.map((file, index) => (
                          <li key={index} className="text-sm text-gray-500">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reporterName">Your Name</Label>
                  <Input
                    id="reporterName"
                    required
                    value={formData.reporter_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reporter_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reporterEmail">Email Address</Label>
                  <Input
                    id="reporterEmail"
                    type="email"
                    required
                    value={formData.reporter_email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reporter_email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporterPhone">Phone Number (Optional)</Label>
                <Input
                  id="reporterPhone"
                  value={formData.reporter_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, reporter_phone: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="contactConsent"
                  className="border-gray-300 rounded"
                  required
                  checked={formData.contact_consent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_consent: e.target.checked,
                    })
                  }
                />
                <Label htmlFor="contactConsent" className="text-sm font-normal">
                  I consent to being contacted regarding this report if
                  necessary.
                </Label>
              </div>
            </div>

            <Accordion type="single" collapsible className="border rounded-md">
              <AccordionItem value="process">
                <AccordionTrigger className="px-4">
                  What happens after I submit a report?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                    <li>
                      Our team will review your report within 24-48 hours.
                    </li>
                    <li>
                      We may contact you for additional information if needed.
                    </li>
                    <li>
                      If the report is valid, we'll take appropriate action
                      according to our policies.
                    </li>
                    <li>
                      You'll receive an email notification about the outcome of
                      your report.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="termsConsent"
                className="border-gray-300 rounded"
                required
                checked={formData.terms_consent}
                onChange={(e) =>
                  setFormData({ ...formData, terms_consent: e.target.checked })
                }
              />
              <Label htmlFor="termsConsent" className="text-sm font-normal">
                I confirm that all information provided is accurate and
                truthful. I understand that false reports may result in account
                restrictions.
              </Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading || !selectedProduct}
              >
                Submit Report
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
