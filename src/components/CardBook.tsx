/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BookDashbord } from "@/lib/types";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { buyBookRequest, rentBookRequest } from "@/server-action/student.service";

function CardBook({ booksData }: { booksData: BookDashbord[] }) {
  const [selectedBook, setSelectedBook] = useState<BookDashbord | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);


  const [isRentLoading, setIsRentLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  // ১. রেন্ট এপিআই হ্যান্ডলার
  const handleRentConfirm = async () => {
    if (!selectedBook) return;
    setIsRentLoading(true);

    try {
      // এখানে তোমার রেন্ট এপিআই কল হবে
        await rentBookRequest(selectedBook.id)

      console.log("Hitting Rent API for:", selectedBook.id);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 

      toast.success(`${selectedBook.title} rented successfully!`);
      setIsRentModalOpen(false);
    } catch (error) {
      toast.error("Failed to rent the book");
    } finally {
      setIsRentLoading(false);
    }
  };

  // ২. অর্ডার এপিআই হ্যান্ডলার
  const handleOrderConfirm = async () => {
    if (!selectedBook) return;
    setIsOrderLoading(true);

    try {
      // এখানে তোমার অর্ডার এপিআই কল হবে
        await buyBookRequest(selectedBook.id);

      
      await new Promise((resolve) => setTimeout(resolve, 1000)); // ডেমো ওয়েট

      toast.success(`Order placed for ${selectedBook.title}!`);
      setIsOrderModalOpen(false);
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsOrderLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {booksData.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <Card className="h-full flex flex-col border-border">
              <CardHeader className="relative h-40 bg-muted/50 flex items-center justify-center">
                <Badge className="absolute top-2 right-2">
                  {book.category.name}
                </Badge>
                <BookOpen className="size-12 text-primary/20" />
              </CardHeader>

              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-bold line-clamp-1">
                  {book.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground italic">
                  by {book.author.name}
                </p>

                <div className="pt-4 flex justify-between">
                  <div>
                    <span className="text-[10px] font-bold block">
                      Purchase
                    </span>
                    <span className="text-xl font-black text-primary">
                      ${book.purchasePrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold block">Rent</span>
                    <span className="text-xl font-black text-green-600">
                      ${book.rentPrice}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 gap-2">
                <Button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsOrderModalOpen(true);
                  }}
                  className="flex-1 text-xs font-bold">
                  Order Now
                </Button>
                <Button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsRentModalOpen(true);
                  }}
                  className="flex-1 text-xs font-bold"
                  variant="outline">
                  Rent
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* --- CONFIRM RENT MODAL --- */}
      <Dialog open={isRentModalOpen} onOpenChange={setIsRentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rent this book?</DialogTitle>
            <DialogDescription>
              Confirming will hit the <b>Rental API</b> for "
              {selectedBook?.title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={()=>handleRentConfirm()}
              disabled={isRentLoading}
              className="bg-green-600 hover:bg-green-700">
              {isRentLoading ? "Renting..." : "Confirm Rent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- CONFIRM ORDER MODAL --- */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase this book?</DialogTitle>
            <DialogDescription>
              Confirming will hit the <b>Order/Purchase API</b> for "
              {selectedBook?.title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsOrderModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOrderConfirm} disabled={isOrderLoading}>
              {isOrderLoading ? "Ordering..." : "Confirm Purchase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CardBook;
