/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { category } from "@/app/(dashboardLayout)/dashboard/seller/AddBookButton";
import { addBooks } from "@/server-action/seller.service";

export function AddBookDialog({
  open,
  onOpenChange,
  cat,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  cat: { cat: category[] };
}) {
  const handleFormSubmit = async (formData: FormData) => {
    await addBooks(formData);
 
    onOpenChange(false);
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
        <form action={handleFormSubmit} className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                required
                id="title"
                placeholder="The Obsidian Labyrinth"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                name="isbn"
                required
                id="isbn"
                placeholder="978-0-123456-78-9"
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              rows={3}
              placeholder="A short, evocative summary…"
              className="mt-1.5"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="purchase">Purchase price</Label>
              <Input
                required
                name="purchasePrice"
                id="purchase"
                type="number"
                min="0"
                step="0.01"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="rent">Rent price</Label>
              <Input
                required
                name="rentPrice"
                id="rent"
                type="number"
                min="0"
                step="0.01"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                required
                name="stockCount"
                id="stock"
                type="number"
                min="0"
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select required name="categoryId">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cat?.cat.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
