/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Store, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { authorSetup } from "@/server-action/seller.service";


export default function SellerSetupPage() {
  async function handleSellerSetup(formData: FormData) {
    const businessName = formData.get("businessName")as string;
      const description = formData.get("description") as string;
   

    console.log(businessName, description);
    await authorSetup(businessName, description);
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg">
        <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
              <Store className="size-8 text-primary" />
            </motion.div>

            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome, Seller!{" "}
              <Sparkles className="inline-block size-6 text-yellow-500 mb-1" />
            </CardTitle>
            <CardDescription className="text-base">
              Let's set up your business profile to start selling books.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={handleSellerSetup} className="space-y-6">
              {/* Business Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2">
                <label className="text-sm font-semibold ml-1">
                  Business Name
                </label>
                <Input
                  name="businessName"
                  placeholder="e.g. Rakibul's Library"
                  required
                  className="bg-background/50 focus-visible:ring-primary"
                />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2">
                <label className="text-sm font-semibold ml-1">
                  Business Description
                </label>
                <Textarea
                  name="description"
                  placeholder="Tell us about your collection..."
                  required
                  className="min-h-[120px] bg-background/50 resize-none focus-visible:ring-primary"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                <Button
                  type="submit"
                  className="w-full group h-11 text-lg font-bold transition-all hover:gap-4">
                  Get Started
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>

        {/* Footer info */}
        <p className="text-center text-muted-foreground text-xs mt-6">
          You can change these details later from your settings.
        </p>
      </motion.div>
    </div>
  );
}
