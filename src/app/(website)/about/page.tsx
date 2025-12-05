import Image from "next/image";
import {
  Users,
  Lightbulb,
  Target,
  History,
  Heart,
  Rocket,
  HelpCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rhoda Smart",
      role: "Founder/Chief Executive Officer (CEO)",
      image: "/images/team/rhoda.jpeg",
    },
    {
      name: "Chibuikem Amaechi",
      role: "Co-founder/Chief Technology Officer (CTO)",
      image: "/images/team/chibuikem-amaechi.jpeg",
    },
    {
      name: "Emmanuel Ojukwu",
      role: "Co-founder/Chief Marketing Officer (CMO)",
      image: "/images/team/emmanuel-ojukwu.jpeg",
    },
    {
      name: "Emeka Onyeagwazi",
      role: "Co-founder/Chief Operating Officer (COO)",
      image: "/images/team/emeka-onyeagwazi.jpeg",
    },
  ];

  const faqs = [
    {
      question: "What is Tramsfarms?",
      answer:
        "Tramsfarms is an inclusive agricultural marketplace in Nigeria where farmers, buyers, sellers, and businesses can buy and sell agro products easily and securely.",
    },
    {
      question: "How does Tramsfarms help farmers and sellers?",
      answer:
        "We provide a digital platform to help sellers reach more buyers, secure fair pricing, and access streamlined logistics services, ultimately helping them grow their businesses and market reach.",
    },
    {
      question: "Can anyone sell on Tramsfarms?",
      answer:
        "We serve users across Nigeria and are continuously expanding to cover more regions.",
    },
    {
      question: "What areas does Tramsfarms currently serve?",
      answer:
        "We serve users across Nigeria and are continuously expanding to cover more regions.",
    },
    {
      question: "How does the logistics system work?",
      answer:
        "Our logistics system connects sellers and buyers to reliable delivery partners, ensuring products are transported quickly, safely, and at affordable rates.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-primary/10 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
                About Tramsfarms
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Welcome to Tramsfarms — Nigeria’s Trusted Agricultural
                Marketplace.
              </p>
            </div>
          </div>
        </section>

        <div className="container max-w-5xl px-4 py-12 mx-auto md:px-6">
          {/* Introduction Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Introduction</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Tramsfarms is a Nigerian agricultural marketplace designed for
              everyone—farmers, buyers, sellers, and agro businesses. Our
              platform simplifies the process of buying and selling agricultural
              products, offering fair pricing, secure transactions, and reliable
              logistics services. Whether you’re a smallholder farmer, a
              large-scale trader, or a buyer looking for fresh produce,
              Tramsfarms connects you to the right market. We are dedicated to
              transforming Nigeria’s agricultural supply chain by driving
              profitability, accessibility, and sustainability across the entire
              ecosystem.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Vision & Mission Section */}
          <div className="grid gap-8 my-8 md:grid-cols-2">
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Vision</h2>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Our vision is to be the leading agri-marketplace in Nigeria,
                where agriculture meets technology and everyone can trade
                seamlessly. We envision a future where farmers, sellers, buyers,
                and investors thrive together—connected through innovation,
                smart logistics, and digital solutions.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Mission</h2>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Our mission is to provide individuals and businesses with the
                tools and platform they need to buy and sell agro products
                easily. We focus on:
              </p>
            </section>
          </div>

          <Separator className="my-8" />

          {/* Our Story Section */}
          <section className="my-8 space-y-4">
            <div className="flex items-center gap-2">
              <History className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Our Story</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Tramsfarms was established in 2024 out of a genuine passion for
              agriculture and a strong commitment to addressing the challenges
              in Nigeria’s agricultural sector. Through research and community
              engagement, we recognized the need for a marketplace where
              farmers, buyers, and sellers could connect easily and securely.
              Our dedicated team, consisting of tech enthusiasts and
              agricultural experts, is committed to developing solutions that
              enhance profitability, sustainability, and accessibility for
              everyone in the farming community.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Team Section */}
          <section className="my-12">
            <div className="flex items-center gap-2 mb-8">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name}'s photo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          {/* Values Section */}
          <section className="my-8 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Our Values</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="mb-2 font-semibold">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging technology to deliver impactful solutions in
                  agriculture and trade.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="mb-2 font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering farmers, buyers, and sellers by fostering a strong,
                  connected agricultural community.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="mb-2 font-semibold">Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Streamlining buying, selling, and logistics for smooth,
                  seamless operations.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="mb-2 font-semibold">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting eco-friendly farming practices and sustainable
                  growth.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 sm:col-span-2">
                <h3 className="mb-2 font-semibold">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  Ensuring transparency, trust, and honesty in every
                  transaction.
                </p>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Future Goals Section */}
          <section className="my-8 space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Future Goals</h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              AOur vision for the future is bold and growth-driven. Here’s what
              we’re working towards:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="mb-2 font-semibold">Expansion</h3>
                <p className="text-sm text-muted-foreground">
                  Broadening our marketplace services across Nigeria and other
                  regions in Africa.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="mb-2 font-semibold">Enhanced Logistics</h3>
                <p className="text-sm text-muted-foreground">
                  Building a robust and efficient logistics network to ensure
                  fast, reliable deliveries.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="mb-2 font-semibold">Blockchain Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Incorporating blockchain technology by 2026 to enhance
                  transparency and security.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="mb-2 font-semibold">
                  Sustainable Farming Initiatives
                </h3>
                <p className="text-sm text-muted-foreground">
                  Promoting eco-friendly farming methods and supporting green
                  agricultural practices.
                </p>
              </div>
              <div className="p-4 border rounded-lg sm:col-span-2">
                <h3 className="mb-2 font-semibold">
                  Digital Farming Solutions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging IoT and AI technologies to provide smart farming
                  tools for farmers and investors.
                </p>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* FAQ Section */}
          <section className="my-8 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-medium text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
