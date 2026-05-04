/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { HardHat, Construction } from "lucide-react";
import { getMyBooks } from "@/server-action/seller.service";

function TempletePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="relative mb-6">
        {/* অ্যানিমেটেড হেলমেট */}
        <div className="absolute -top-4 -right-4 animate-bounce">
          <HardHat className="size-8 text-yellow-500" />
        </div>

        <div className="rounded-full bg-yellow-100 p-8 dark:bg-yellow-900/20">
          <Construction className="size-16 text-yellow-600 dark:text-yellow-500 animate-pulse" />
        </div>
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground text-center">
        Feature Under Construction
      </h1>

      <p className="mb-8 max-w-md text-center text-muted-foreground">
        We're currently working hard to bring this feature to your library.
        Please check back soon!
      </p>

      {/* প্রগ্রেস বার - Tailwind-এর animate-pulse দিয়ে রিপ্লেস করা হয়েছে */}
      <div className="w-full max-w-xs overflow-hidden rounded-full bg-secondary h-2">
        <div className="h-full bg-yellow-500 animate-[pulse_1.5s_ease-in-out_infinite] rounded-full"></div>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-yellow-600 dark:text-yellow-500">
        Content Coming Soon
      </p>
    </div>
  );
}

export default TempletePage;
