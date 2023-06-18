import Transaction from "../Transaction/Transaction";
import User from "../User/User";

interface Promotion {
  id: string;
  name: string;
  description: string;
  photo_url?: string;
  amount: number;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;

  // Relations
  transactions?: Transaction[];
  user?: User;
}

export default Promotion;
