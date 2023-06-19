import { RequestQueryBuilder } from "@nestjsx/crud-request";
import CreatePromotionDTO from "../models/Promotion/CreatePromotionDTO";
import Promotion from "../models/Promotion/Promotion";
import UpdatePromotionDTO from "../models/Promotion/UpdatePromotionDTO";
import User from "../models/User/User";
import axiosInstance from "./auth";

export interface PaginatedPromotions {
  data: Promotion[];
  count: number;
  page: number;
  pageCount: number;
  total: number;
}

export default class PromotionAPI {
  public static async createPromotion(dto: CreatePromotionDTO) {
    const response = await axiosInstance.post<CreatePromotionDTO>(
      "/promotions",
      dto
    );

    return response.data;
  }

  public static async updatePromotion(id: string, dto: UpdatePromotionDTO) {
    const response = await axiosInstance.patch<UpdatePromotionDTO>(
      `/promotions/${id}`,
      dto
    );

    return response.data;
  }

  public static async getPublicPromotions(
    page: number,
    limit: number,
    searchString: string | null
  ): Promise<PaginatedPromotions> {
    let queryString: string;
    if (
      searchString !== null &&
      searchString !== undefined &&
      searchString !== ""
    ) {
      queryString = RequestQueryBuilder.create({
        limit,
        page,
        sort: [{ field: "created_at", order: "DESC" }],
        join: {
          field: "user",
        },
        or: [
          {
            field: "name",
            operator: "$contL",
            value: searchString,
          },
          {
            field: "description",
            operator: "$contL",
            value: searchString,
          },
        ],
      }).query();
    } else {
      queryString = RequestQueryBuilder.create({
        limit,
        page,
        sort: [{ field: "created_at", order: "DESC" }],
        join: {
          field: "user",
        },
        filter: [
          {
            field: "enabled",
            operator: "$eq",
            value: true,
          },
        ],
      }).query();
    }

    const response = await axiosInstance.get<PaginatedPromotions>(
      `/promotions?${queryString}`
    );

    return response.data;
  }

  public static async getPaginatedPromotions(
    page: number,
    limit: number
  ): Promise<PaginatedPromotions> {
    const queryString: string = RequestQueryBuilder.create({
      limit,
      page,
      sort: [{ field: "created_at", order: "DESC" }],
    }).query();

    const response = await axiosInstance.get<PaginatedPromotions>(
      `/promotions?${queryString}`
    );

    return response.data;
  }

  public static async getUserPaginatedPromotions(
    limit: number,
    page: number,
    user?: User
  ): Promise<PaginatedPromotions> {
    const queryString: string = RequestQueryBuilder.create({
      filter: [{ field: "user.id", operator: "$eq", value: user?.id }],
      join: {
        field: "user",
      },
      limit,
      page,
      sort: [{ field: "created_at", order: "DESC" }],
    }).query();

    const response = await axiosInstance.get<PaginatedPromotions>(
      `/promotions?${queryString}`
    );

    console.log(response.data);

    return response.data;
  }
}
