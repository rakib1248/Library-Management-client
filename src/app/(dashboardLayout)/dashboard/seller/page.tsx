/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/dashboard/seller/page.tsx

import React from "react";
import { getMyBooks } from "@/server-action/seller.service";
import { Book, Package, DollarSign } from "lucide-react";
import AddBookButton, { EditButton } from "./AddBookButton";
import { getCategory } from "@/server-action/admin.service";
import { getProfile } from "@/server-action/auth.service";
import { redirect } from "next/navigation";

async function SellerDashboardPage() {
    const data = await getProfile();
  
    if (data?.role === "SELLER") {
      if (!data.authors) {
        redirect("/author");
      } 
    }
  const books = (await getMyBooks()) || [];
  const cat = (await getCategory()) || [];

  const totalBooks = books.length;
  const totalStock = books.reduce(
    (acc: number, book: any) => acc + (book.stockCount || 0),
    0,
  );
  const totalValue = books.reduce(
    (acc: number, book: any) =>
      acc + Number(book.purchasePrice || 0) * (book.stockCount || 0),
    0,
  );

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Seller Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your library inventory and sales.
          </p>
        </div>
        <AddBookButton cat={cat} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Total Titles",
            val: totalBooks,
            Icon: Book,
            color: "text-blue-500",
          },
          {
            label: "Total Stock Items",
            val: totalStock,
            Icon: Package,
            color: "text-orange-500",
          },
          {
            label: "Inventory Value",
            val: `$${totalValue.toLocaleString()}`,
            Icon: DollarSign,
            color: "text-green-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 bg-card text-card-foreground border border-border rounded-xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {item.label}
              </span>
              <item.Icon className={`size-4 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold">{item.val}</div>
          </div>
        ))}
      </div>

      {/* ইনভেন্টরি টেবিল */}
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h2 className="font-semibold text-lg">My Books Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="p-4">Title & ISBN</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (Sell/Rent)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {books.map((book: any) => (
                <tr
                  key={book.id}
                  className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-foreground">
                      {book.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {book.isbn}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-[10px] font-bold uppercase border border-border">
                      {book.category?.name || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">
                      ${book.purchasePrice}
                    </div>
                    <div className="text-xs text-green-500 font-bold">
                      ${book.rentPrice} / rent
                    </div>
                  </td>
                  <td className="p-4 text-foreground font-bold">
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${book.stockCount > 5 ? "bg-green-500" : "bg-red-500"}`}
                      />
                      {book.stockCount}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Edit Button */}

                      <EditButton id={book.id as string} />
                      {/* Vertical Separator (Optional) */}
                      <div className="w-[1px] h-3 bg-border" />

                      {/* Delete Button */}
                      <button className="text-red-500 hover:text-red-700 hover:underline font-bold text-xs transition-all">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {books.length === 0 && (
            <div className="p-12 text-center text-muted-foreground italic">
              No inventory found. Start adding books to see them here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboardPage;
