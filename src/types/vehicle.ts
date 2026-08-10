export interface Vehicle {
  id: string;
  name: string;
  category: string;
  type: string;
  features: string[];
  seats: number;
  bags: number;
  image: string;
  price: number;
  recommended?: boolean;
}
