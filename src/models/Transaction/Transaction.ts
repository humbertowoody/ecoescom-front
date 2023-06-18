import Promotion from "../Promotion/Promotion";
import User from "../User/User";

interface Transaction {
  id: string;
  user_id: string;
  promotion_id: string;

  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  promotion?: Promotion;
}

export default Transaction;
