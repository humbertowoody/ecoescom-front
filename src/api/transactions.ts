import { RequestQueryBuilder } from "@nestjsx/crud-request";
import CreateTransactionDTO from "../models/Transaction/CreateTransactionDTO";
import Transaction from "../models/Transaction/Transaction";
import User from "../models/User/User";
import axiosInstance from "./auth";

export interface PaginatedTransactions {
  data: Transaction[];
  count: number;
  page: number;
  pageCount: number;
  total: number;
}

export default class TransactionAPI {
  public static async getUserPaginatedTransactions(
    page: number,
    limit: number,
    user: User
  ) {
    const queryString: string = RequestQueryBuilder.create({
      limit,
      page,
      join: [
        {
          field: "user",
        },
        {
          field: "promotion",
        },
      ],
      sort: [
        {
          field: "created_at",
          order: "DESC",
        },
      ],
      or: [
        {
          field: "user.id",
          operator: "$eq",
          value: user.id,
        },
        {
          field: "promotion.user",
          operator: "$eq",
          value: user.id,
        },
      ],
    }).query();

    const response = await axiosInstance.get(`/transactions?${queryString}`);
    console.log("response", response.data);
    return response.data;
  }

  public static async createTransaction(
    dto: CreateTransactionDTO,
    user?: User
  ) {
    const response = await axiosInstance.post<CreateTransactionDTO>(
      "/transactions",
      dto
    );

    return response.data;
  }
}
