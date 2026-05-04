"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BookText, ShoppingBag, Clock, Calendar } from "lucide-react";
import { UserBookTransaction } from "@/lib/types";
import { format } from "date-fns";

// তোমার ডাটা সেট এখানে পাস করো
export default function MyBooksdash({
  userData,
}: {
  userData: UserBookTransaction;
}) {
  const getExpiryDate = (startDate: string) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 14); // ১৪ দিন যোগ করা হলো
    return format(date, "MMM dd, yyyy");
  };
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">My Collections</h1>
        <p className="text-muted-foreground">
          Manage your rented and purchased books here.
        </p>
      </motion.div>

      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookText className="text-primary size-5" />
            Transaction History
          </CardTitle>
          <CardDescription>
            Showing all activities for {userData.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Book Title</TableHead>
                <TableHead className="font-bold">Type</TableHead>
                <TableHead className="font-bold">Amount</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Return Date</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.transactions.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    {item.book.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.type === "PURCHASE" ? (
                        <ShoppingBag className="size-4 text-blue-500" />
                      ) : (
                        <Clock className="size-4 text-orange-500" />
                      )}
                      <span className="text-xs font-semibold">{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">${item.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "ACTIVE" ? "default" : "secondary"
                      }
                      className={
                        item.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                          : "bg-blue-500/10 text-blue-600"
                      }>
                      {item.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {item.type === "RENT" ? (
                      <div className="flex items-center gap-2 text-orange-600 font-medium">
                        <Calendar className="size-4" />
                        {getExpiryDate(
                          item.rentStartDate || new Date().toISOString(),
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        — Lifetime —
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <button className="text-xs text-primary hover:underline font-bold">
                      View Details
                    </button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>

          {userData.transactions.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No books found in your collection.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
