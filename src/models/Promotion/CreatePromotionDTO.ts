interface CreatePromotionDTO {
  name: string;
  description: string;
  photo_url: string;
  amount: number;
  accept_terms: boolean;
}

export default CreatePromotionDTO;
