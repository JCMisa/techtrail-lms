import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/user/`;

export const addUser = async (
  email: string,
  firstname: string,
  lastname: string,
  imageUrl: string,
  createdAt: string,
  role: string
) => {
  try {
    const data = await axios.post(api, {
      email: email,
      firstname: firstname,
      lastname: lastname,
      imageUrl: imageUrl,
      createdAt: createdAt,
      role: role,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const findUserByEmail = async (userEmail: string) => {
  try {
    const data = await axios.get(api + `userEmail/${userEmail}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
