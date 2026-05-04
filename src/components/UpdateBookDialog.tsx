import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { books } from "@/lib/types";
import { updatBook } from "@/server-action/seller.service";

export function UpadeBookDialog({
  open,
  onOpenChange,
  paylode,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  paylode: books;
}) {
  const [form, setForm] = useState({
    id: paylode.id,
    title: paylode.title,
    description: paylode.description,
    isbn: paylode.isbn,
    purchasePrice: Number(paylode.purchasePrice),
    rentPrice: Number(paylode.rentPrice),
    stockCount: paylode.stockCount,
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.isbn.trim() ||
      !form.description.trim() ||
      !form.purchasePrice||
      !form.rentPrice||
      !form.stockCount
    ) {
      toast.error("Title and ISBN are required");
      return;
    }
      try {
          await updatBook(form)
        
      } catch (error) {
        toast.error("failed to update")
      }

    toast.success("Book updaetd to your library");
    onOpenChange(false);
    setForm({
      id: paylode.id,
      title: paylode.title,
      description: paylode.description,
      isbn: paylode.isbn,
      purchasePrice: Number(paylode.purchasePrice),
      rentPrice: Number(paylode.rentPrice),
      stockCount: paylode.stockCount,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Add new book
          </DialogTitle>
          <DialogDescription>
            Catalog a new title for your library.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="The Obsidian Labyrinth"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={form.isbn}
                onChange={(e) => update("isbn", e.target.value)}
                placeholder="978-0-123456-78-9"
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="A short, evocative summary…"
              className="mt-1.5"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="purchase">Purchase price</Label>
              <Input
                id="purchase"
                type="number"
                min="0"
                step="0.01"
                value={form.purchasePrice}
                onChange={(e) => update("purchasePrice", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="rent">Rent price</Label>
              <Input
                id="rent"
                type="number"
                min="0"
                step="0.01"
                value={form.rentPrice}
                onChange={(e) => update("rentPrice", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={form.stockCount}
                onChange={(e) => update("stockCount", e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
          {/* <div className="grid sm:grid-cols-2 gap-4">
           
            <div>
              <Label htmlFor="cover">Cover URL (optional)</Label>
              <Input
                id="cover"
                value={form.cover}
                onChange={(e) => update("cover", e.target.value)}
                placeholder="https://…"
                className="mt-1.5"
              />
            </div>
          </div> */}
          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              Add book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
