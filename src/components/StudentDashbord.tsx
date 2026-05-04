"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Search, ShoppingCart, Calendar, BookOpen, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CardBook from "./CardBook";
import { BookDashbord } from "@/lib/types";

// স্যাম্পল ডাটা (এটি পরে তোমার এপিআই থেকে আসবে)
const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15,
    rentPrice: 5,
    rating: 4.8,
    category: "Classic",
  },
  {
    id: "2",
    title: "Next.js Mastery",
    author: "Fahim Ahmed",
    price: 45,
    rentPrice: 12,
    rating: 4.9,
    category: "Tech",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    price: 20,
    rentPrice: 7,
    rating: 5.0,
    category: "Self-Help",
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 50,
    rentPrice: 15,
    rating: 4.7,
    category: "Programming",
  },
];

export default function StudentDashboard({ bookData } : {bookData: BookDashbord[]}) {
  const containerRef = useRef(null);

  // GSAP Animation for Title
  useEffect(() => {
    gsap.from(".dashboard-title", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="p-6 space-y-8 bg-background min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="dashboard-title text-4xl font-extrabold tracking-tight text-primary">
            Explore Library
          </h1>
          <p className="text-muted-foreground">
            Find your next favorite book to read or rent.
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, author or category..."
            className="pl-10 h-11"
          />
        </div>
      </header>

      {/* Quick Stats / Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["All", "Programming", "Classic", "Self-Help"].map((cat, i) => (
          <motion.div
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}>
            <Button
              variant="outline"
              className="w-full h-16 text-lg font-medium shadow-sm">
              {cat}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Books Grid */}
      <CardBook booksData={bookData} />
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}>
            <Card className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-300">
              <CardHeader className="p-0">
                <div className="h-48 bg-muted flex items-center justify-center relative overflow-hidden">
                  <BookOpen className="size-16 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-3 right-3 bg-primary/90">
                    {book.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold truncate">
                    {book.title}
                  </CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="size-4 fill-current" />
                    <span className="text-xs ml-1 font-bold">
                      {book.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  by {book.author}
                </p>

                <div className="flex justify-between items-center pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">
                      Buy Price
                    </p>
                    <p className="text-lg font-extrabold text-primary">
                      ${book.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase font-bold">
                      Rent/mo
                    </p>
                    <p className="text-lg font-extrabold text-green-600">
                      ${book.rentPrice}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 gap-2">
                <Button className="flex-1 gap-2 group" variant="default">
                  <ShoppingCart className="size-4 transition-transform group-hover:-translate-y-1" />
                  Buy
                </Button>
                <Button className="flex-1 gap-2 group" variant="secondary">
                  <Calendar className="size-4 transition-transform group-hover:rotate-12" />
                  Rent
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
}
