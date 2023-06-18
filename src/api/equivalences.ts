import { RequestQueryBuilder } from "@nestjsx/crud-request";
import Equivalence from "../models/Equivalence/Equivalence";
import axiosInstance from "./auth";

export interface PaginatedEquivalences {
  data: Equivalence[];
  count: number;
  page: number;
  pageCount: number;
  total: number;
}

export class EquivalenceAPI {
  static async getAllEquivalences(): Promise<Equivalence[]> {
    const queryString: string = RequestQueryBuilder.create({
      sort: [
        {
          field: "name",
          order: "ASC",
        },
      ],
      filter: [
        {
          field: "enabled",
          operator: "$eq",
          value: true,
        },
      ],
    }).query();
    const response = await axiosInstance.get("/equivalences?" + queryString);

    return response.data as Equivalence[];
  }

  static async getEquivalences(
    count: number,
    page: number
  ): Promise<PaginatedEquivalences> {
    const queryString: string = RequestQueryBuilder.create({
      page: page,
      limit: count,
      sort: [
        {
          field: "name",
          order: "ASC",
        },
      ],
      filter: [
        {
          field: "enabled",
          operator: "$eq",
          value: true,
        },
      ],
    }).query();
    const response = await axiosInstance.get("/equivalences?" + queryString);

    return response.data as PaginatedEquivalences;
  }
}
