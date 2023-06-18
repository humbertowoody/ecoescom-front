import { RequestQueryBuilder } from "@nestjsx/crud-request";
import CreateCreditDTO from "../models/Credit/CreateCreditDTO";
import Credit from "../models/Credit/Credit";
import User from "../models/User/User";
import axiosInstance from "./auth";

export interface PaginatedCredits {
  data: Credit[];
  count: number;
  page: number;
  pageCount: number;
  total: number;
}

export class CreditAPI {
  public static async getPublicCredits(
    limit: number,
    page: number
  ): Promise<PaginatedCredits> {
    const queryString: string = RequestQueryBuilder.create({
      filter: [{ field: "reported", operator: "$eq", value: false }],
      limit: limit,
      sort: [{ field: "created_at", order: "DESC" }],
      page,
    }).query();

    const response = await axiosInstance.get("/credits?" + queryString);
    return response.data;
  }

  public static async getUserCredits(
    limit: number,
    page: number,
    user: User
  ): Promise<PaginatedCredits> {
    const queryString: string = RequestQueryBuilder.create({
      filter: [
        //{ field: "reported", operator: "$eq", value: false },
        { field: "user.id", operator: "$eq", value: user.id },
      ],
      limit: limit,
      sort: [{ field: "created_at", order: "DESC" }],
      join: {
        field: "user",
      },
      page,
    }).query();

    const response = await axiosInstance.get("/credits?" + queryString);
    return response.data;
  }

  public static async createCredit(dto: CreateCreditDTO, user?: User) {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    const response = await axiosInstance.post("/credits", {
      ...dto,
      user: user.id,
    });
    return response.data;
  }
}
