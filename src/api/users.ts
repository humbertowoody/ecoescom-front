import { AxiosResponse } from "axios";
import EditUserDTO from "../models/User/EditUser";
import User from "../models/User/User";
import axiosInstance from "./auth";

export class UserAPI {
  public static async updateUser(dto: EditUserDTO) {
    const response: AxiosResponse<User> = await axiosInstance.patch(
      "/users",
      dto
    );
    console.log(response.data);
    return response.data;
  }
}

export default UserAPI;
