import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/roleChange/`;

// this function turns a user to teacher
export const askRoleChange = async (
  userEmail: string,
  userCurrentRole: string,
  userReason: string,
  roleChangeProof: string
) => {
  try {
    const data = await axios.post(api, {
      userEmail: userEmail,
      userCurrentRole: userCurrentRole,
      userReason: userReason,
      roleChangeProof: roleChangeProof,
    });
    if (data.status === 201) {
      return { success: true, data: data.data };
    }
    return { success: false, data: data.data };
  } catch (error) {
    console.log("Request payload:", {
      userEmail,
      userCurrentRole,
      userReason,
      roleChangeProof,
    });

    if (axios.isAxiosError(error)) {
      console.log("Response error:", error.response?.data);
      return {
        success: false,
        error: error.response?.data || "Request failed",
      };
    }
    handleError(error);
    return { success: false, error: "Unknown error occurred" };
  }
};

export const getUserRequests = async (email: string) => {
  try {
    console.log("Requesting URL:", `${api}userEmail/${email}`);
    const response = await axios.get(`${api}userEmail/${email}`);
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    throw error;
  }
};

export const getAllRequests = async () => {
  try {
    const response = await axios.get(api);
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    throw error;
  }
};

export const grantRoleChangeRequest = async (userEmail: string) => {
  try {
    const response = await axios.put(`${api}updateRole/${userEmail}`, {
      updatedRole: "teacher",
    });
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    throw error;
  }
};

export const rejectRoleChangeRequest = async (requestId: number) => {
  try {
    const response = await axios.delete(`${api}${requestId}`);
    console.log("Response:", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    throw error;
  }
};
