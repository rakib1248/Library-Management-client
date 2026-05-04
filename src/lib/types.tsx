export type Role = "SELLER" | "STUDENT" | "ADMIN";
export interface User {
  name: string;
  id: string;
  email: string;
  role: string;
  phone: string;
  author: string;
}

export interface books {
  id: string;
  title: string;
  description: string;
  purchasePrice: number;
  rentPrice: number;
  stockCount: number;
  isbn: string;
}

export interface BookDashbord {
  id: string;
  title: string;
  description: string;
  purchasePrice: string;
  rentPrice: string;
  stockCount: number;
  isbn: string;
  category: {
    name: string;
  };
  author: {
    name: string;
  };
}

export interface UserBookTransaction {
  id: string;
  name: string;
  email: string;
  transactions: {
    amount: string;
    status: "ACTIVE" | "COMPLETED" | "PENDING";
    type: "RENT" | "PURCHASE";
    rentStartDate: string;
    book: {
      title: string;
    };
  }[];
}
