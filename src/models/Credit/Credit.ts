import Equivalence from "../Equivalence/Equivalence";
import User from "../User/User";

interface Credit {
  id: string;
  user_id: string;
  equivalence_id: string;

  quantity: number;
  photo_url: string;

  reported: boolean;
  reported_at?: Date;

  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  equivalence?: Equivalence;
}

export default Credit;
