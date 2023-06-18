import Credit from "../Credit/Credit";

interface Equivalence {
  id: string;
  name: string;
  description: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  created_at: string;
  updated_at: string;
  enabled: boolean;
  deleted_at?: string;

  // Relations
  credits?: Credit[];
}

export default Equivalence;
