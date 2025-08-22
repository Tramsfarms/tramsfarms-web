"use client";

import React, { useState } from "react";
import {
  Send,
  User,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Paperclip,
  Image,
  Smile,
  Mic,
  X,
  CheckCircle2,
} from "lucide-react";
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
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "agent",
    name: "Sarah",
    message:
      "Hello! Welcome to BWT Marketplace support. How can I help you today?",
    time: "10:03 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function ChatWithUsPage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Form state for pre-chat
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const handleStartChat = () => {
    if (!name || !email || !topic) return;
    setChatStarted(true);

    // Add a system message acknowledging the topic
    const topicMessage = {
      id: messages.length + 1,
      sender: "agent",
      name: "Sarah",
      message: `Thanks for reaching out about ${topic}. I'll be happy to help you with that today.`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "/placeholder.svg?height=40&width=40",
    };

    setMessages([...messages, topicMessage]);

    // Simulate agent typing
    simulateAgentTyping();
  };

  const simulateAgentTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Add follow-up message based on topic
      const followUpMessage = {
        id: messages.length + 2,
        sender: "agent",
        name: "Sarah",
        message:
          "Could you please provide more details about your issue so I can assist you better?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "/placeholder.svg?height=40&width=40",
      };
      setMessages((prev) => [...prev, followUpMessage]);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      name: name || "You",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: null,
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate agent typing
    simulateAgentTyping();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <Header />
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Chat With Us
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Get real-time assistance from our customer support team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="shadow-md h-[700px] flex flex-col">
                <CardHeader className="border-b bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Support Agent"
                        />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {chatStarted
                            ? "Sarah - Customer Support"
                            : "Tramsfarms Support"}
                        </CardTitle>
                        {chatStarted && (
                          <CardDescription>
                            <span className="flex items-center">
                              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                              Online
                            </span>
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    {chatStarted && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <X className="w-4 h-4 mr-1" />
                          End Chat
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {!chatStarted ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <MessageSquare className="w-16 h-16 mb-4 text-primary/30" />
                      <h3 className="mb-2 text-xl font-medium">
                        Start a Conversation
                      </h3>
                      <p className="max-w-md mb-6 text-gray-500">
                        Fill out the form to begin chatting with our support
                        team. We're here to help with any questions or issues.
                      </p>
                      <div className="w-full max-w-md space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="topic">
                            What do you need help with?
                          </Label>
                          <Select value={topic} onValueChange={setTopic}>
                            <SelectTrigger id="topic">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="order">
                                Order Status
                              </SelectItem>
                              <SelectItem value="product">
                                Product Information
                              </SelectItem>
                              <SelectItem value="payment">
                                Payment Issues
                              </SelectItem>
                              <SelectItem value="return">
                                Returns & Refunds
                              </SelectItem>
                              <SelectItem value="account">
                                Account Issues
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="orderNumber">
                            Order Number (if applicable)
                          </Label>
                          <Input
                            id="orderNumber"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            placeholder="e.g., ORD-12345678"
                          />
                        </div>
                        <Button
                          onClick={handleStartChat}
                          disabled={!name || !email || !topic}
                          className="w-full"
                          variant="primary"
                        >
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex ${
                              msg.sender === "user"
                                ? "flex-row-reverse"
                                : "flex-row"
                            } max-w-[80%]`}
                          >
                            {msg.sender === "agent" && (
                              <Avatar className="w-8 h-8 mr-2">
                                <AvatarImage src={msg.avatar} alt={msg.name} />
                                <AvatarFallback>
                                  {msg.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  msg.sender === "user"
                                    ? "bg-primary text-white rounded-tr-none"
                                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                                }`}
                              >
                                {msg.message}
                              </div>
                              <div
                                className={`text-xs text-gray-500 mt-1 ${
                                  msg.sender === "user"
                                    ? "text-right"
                                    : "text-left"
                                }`}
                              >
                                {msg.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex flex-row max-w-[80%]">
                            <Avatar className="w-8 h-8 mr-2">
                              <AvatarImage
                                src="/placeholder.svg?height=40&width=40"
                                alt="Sarah"
                              />
                              <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="p-3 text-gray-800 bg-gray-100 rounded-lg rounded-tl-none">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 delay-100 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 delay-200 bg-gray-400 rounded-full animate-bounce"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {chatStarted && (
                  <CardFooter className="p-4 border-t">
                    <div className="flex items-end w-full space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message here..."
                        className="flex-1 min-h-[40px] max-h-[120px]"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="icon"
                        className="rounded-full"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Live Chat Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 8AM - 8PM
                      </p>
                      <p className="text-gray-600">Saturday: 9AM - 5PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Current Status</p>
                      <p className="text-green-600">
                        Online - Agents Available
                      </p>
                      <p className="text-xs text-gray-500">
                        Average response time: 2 minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Reach Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-gray-600">+234 (0) 813 764 1537</p>
                      <p className="text-xs text-gray-500">
                        Available during support hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600">support@tramsfarms.com</p>
                      <p className="text-xs text-gray-500">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        How do I track my order?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can track your order by logging into your account
                        and visiting the "Orders" section. Alternatively, you
                        can use the tracking number provided in your order
                        confirmation email.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What is your return policy?
                      </AccordionTrigger>
                      <AccordionContent>
                        We accept returns within 14 days of delivery. Items must
                        be in their original condition with tags attached. Visit
                        our{" "}
                        <a
                          href="/return-policy"
                          className="text-primary hover:underline"
                        >
                          Return Policy
                        </a>{" "}
                        page for more details.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How can I change my payment method?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can update your payment method in your account
                        settings under "Payment Methods." For orders that have
                        already been placed, please contact our support team for
                        assistance.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mt-4 text-center">
                    <a
                      href="/help"
                      className="flex items-center justify-center text-sm text-primary hover:underline"
                    >
                      View all FAQs
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
