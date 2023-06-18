import Credit from "../Credit/Credit";
import Promotion from "../Promotion/Promotion";
import Transaction from "../Transaction/Transaction";

interface User {
  id: string;
  email: string;

  firstname: string;
  lastname_1: string;
  lastname_2?: string;
  student_id: string;

  role: "STUDENT" | "SELLER" | "ADMIN";

  jwt?: string;

  created_at: Date;
  updated_at: Date;

  // Relations
  credits?: Credit[];
  transactions?: Transaction[];
  promotions?: Promotion[];
}

export default User;
