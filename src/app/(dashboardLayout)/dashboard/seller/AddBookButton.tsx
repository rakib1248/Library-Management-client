"use client";
export interface category {
  id: string;
  name: string;
}

import { AddBookDialog } from "@/components/AddBookDialog";
import { UpadeBookDialog } from "@/components/UpdateBookDialog";
import { books } from "@/lib/types";
import { getSingleBooks } from "@/server-action/seller.service";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function AddBookButton(cat: { cat: category[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all">
        <Plus className="size-4" /> Add New Book
      </button>

      <AddBookDialog cat={cat} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export const EditButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [paylode, setPaylode] = useState<books>({
    id: "",
    title: "",
    description: "",
    isbn: "",
    purchasePrice: 0,
    rentPrice: 0,
    stockCount: 0,
  });

  const handleUpdateBook = async () => {
    try {
      const response = await getSingleBooks(id);

      const updatedData = {
        id: response.id,
        title: response.title,
        description: response.description,
        isbn: response.isbn,
        purchasePrice: Number(response.purchasePrice),
        rentPrice: Number(response.rentPrice),
        stockCount: Number(response.stockCount),
      };

     
      setPaylode(updatedData);


      setOpen(true);

  
   
    } catch (error) {
      toast("Failed to fetch book data:" );
    }
  };

  return (
    <>
      <button
        onClick={handleUpdateBook}
        className="text-primary hover:underline font-bold text-xs transition-all">
        Edit
      </button>


      {open && (
        <UpadeBookDialog paylode={paylode} open={open} onOpenChange={setOpen} />
      )}
    </>
  );
};
export default AddBookButton;
