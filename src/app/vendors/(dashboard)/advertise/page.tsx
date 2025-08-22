"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LineChart, PieChart } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   Chart,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartTooltipItem,
// } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { adService } from "@/utils/adService";
import { productService } from "@/utils/productService";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const productPerformance = [
  { name: "Rice", value: 35 },
  { name: "Beans", value: 25 },
  { name: "Yam", value: 20 },
  { name: "Cassava", value: 15 },
  { name: "Maize", value: 5 },
];

interface Ad {
  id: number;
  product: {
    id: number;
    name: string;
  };
  budget: number;
  spent: number;
  status: string;
  target_audience: string;
  duration_days: number;
  impressions: number;
  clicks: number;
  conversion_rate: number;
  start_date: string;
  end_date: string;
}

interface Product {
  id: number;
  name: string;
}

interface Stats {
  total_campaigns: number;
  total_budget: number;
  total_spent: number;
  total_impressions: number;
  total_clicks: number;
  avg_conversion_rate: number;
}

export default function AdvertisePage() {
  const [timeframe, setTimeframe] = useState("month");
  const [ads, setAds] = useState<Ad[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [adsResponse, productsResponse, statsResponse] = await Promise.all([
        adService.getAds(),
        productService.getProducts(),
        adService.getStats(),
      ]);

      setAds(adsResponse.data);
      setProducts(productsResponse.data.all_products);
      setStats(statsResponse.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    if (
      !selectedProduct ||
      !selectedBudget ||
      !selectedDuration ||
      !selectedAudience
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await adService.createAd({
        product_id: parseInt(selectedProduct),
        budget: parseInt(selectedBudget),
        duration_days: parseInt(selectedDuration),
        target_audience: selectedAudience,
      });

      toast.success("Campaign created successfully");
      fetchData();
      setSelectedProduct("");
      setSelectedBudget("");
      setSelectedDuration("");
      setSelectedAudience("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      setLoading(true);
      await adService.updateAdStatus(id, status);
      toast.success("Campaign status updated successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update campaign status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Advertise Products
        </h1>
        <p className="text-muted-foreground">
          Boost your sales by promoting your products and tracking performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Your sales performance over time
              </CardDescription>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              {/* <ChartContainer
                data={salesData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <Chart>
                  <LineChart className="w-5 h-5 text-primary" />
                </Chart>
                <ChartTooltip>
                  <ChartTooltipContent>
                    <ChartTooltipItem />
                  </ChartTooltipContent>
                </ChartTooltip>
              </ChartContainer> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Stats</CardTitle>
            <CardDescription>Overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            {stats && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Campaigns:
                  </span>
                  <span className="font-medium">{stats.total_campaigns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Budget:
                  </span>
                  <span className="font-medium">₦{stats.total_budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Spent:
                  </span>
                  <span className="font-medium">₦{stats.total_spent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Impressions:
                  </span>
                  <span className="font-medium">{stats.total_impressions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Clicks:
                  </span>
                  <span className="font-medium">{stats.total_clicks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg. Conversion:
                  </span>
                  <span className="font-medium">
                    {stats.avg_conversion_rate}%
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="pt-4 space-y-4">
          {ads
            .filter((ad) => ad.status === "active")
            .map((ad) => (
              <Card key={ad.id}>
                <CardHeader>
                  <CardTitle>{ad.product.name}</CardTitle>
                  <CardDescription>
                    Started on {new Date(ad.start_date).toLocaleDateString()} •{" "}
                    {Math.ceil(
                      (new Date(ad.end_date).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days remaining
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Budget spent:
                      </span>
                      <span className="font-medium">
                        ₦{ad.spent} / ₦{ad.budget}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Impressions:
                      </span>
                      <span className="font-medium">{ad.impressions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Clicks:
                      </span>
                      <span className="font-medium">{ad.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Conversion rate:
                      </span>
                      <span className="font-medium">{ad.conversion_rate}%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus(ad.id, "paused")}
                    disabled={loading}
                  >
                    Pause Campaign
                  </Button>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="pt-4">
          {ads.filter((ad) => ad.status === "completed").length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No completed campaigns</CardTitle>
                <CardDescription>
                  You don't have any completed advertising campaigns yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When you complete advertising campaigns, they will appear here
                  for you to review their performance.
                </p>
              </CardContent>
            </Card>
          ) : (
            ads
              .filter((ad) => ad.status === "completed")
              .map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <CardTitle>{ad.product.name}</CardTitle>
                    <CardDescription>
                      Completed on {new Date(ad.end_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total spent:
                        </span>
                        <span className="font-medium">₦{ad.spent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total impressions:
                        </span>
                        <span className="font-medium">{ad.impressions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total clicks:
                        </span>
                        <span className="font-medium">{ad.clicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Final conversion rate:
                        </span>
                        <span className="font-medium">
                          {ad.conversion_rate}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="create" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>
                Promote your products to reach more customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    Select a product to promote
                  </h3>
                  <Select
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Campaign budget</h3>
                  <Select
                    value={selectedBudget}
                    onValueChange={setSelectedBudget}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000">₦5,000</SelectItem>
                      <SelectItem value="10000">₦10,000</SelectItem>
                      <SelectItem value="20000">₦20,000</SelectItem>
                      <SelectItem value="50000">₦50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Campaign duration</h3>
                  <Select
                    value={selectedDuration}
                    onValueChange={setSelectedDuration}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Target audience</h3>
                  <Select
                    value={selectedAudience}
                    onValueChange={setSelectedAudience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All customers</SelectItem>
                      <SelectItem value="returning">
                        Returning customers
                      </SelectItem>
                      <SelectItem value="new">New customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCreateCampaign}
                disabled={loading}
              >
                Create Campaign
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
            <CardDescription>
              List products to start selling on Tramsfarm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You need to add products before you can advertise them. Create
              your first product listing to get started.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/vendors/products/add">
              <Button>Create Product</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advertising Tips</CardTitle>
            <CardDescription>
              Maximize your advertising effectiveness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Quality Images</h3>
              <p className="text-sm text-muted-foreground">
                Use high-quality images that showcase your products clearly.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Competitive Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Set competitive prices to attract more customers.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Detailed Descriptions</h3>
              <p className="text-sm text-muted-foreground">
                Provide detailed and accurate product descriptions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
