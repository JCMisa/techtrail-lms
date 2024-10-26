import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/announcement/`;

export const addAnnouncement = async (
  title: string,
  description: string,
  date: string,
  createdBy: string
) => {
  try {
    const data = await axios.post(api, {
      title: title,
      description: description,
      date: date,
      createdBy: createdBy,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllAnnouncements = async () => {
  try {
    const data = await axios.get(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAnnouncementById = async (announcementId: number) => {
  try {
    const data = await axios.get(api + announcementId);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getCurrentAnnouncements = async (date: string) => {
  try {
    const data = await axios.get(api + `currentAnnouncement/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getExpiredAnnouncements = async (date: string) => {
  try {
    const data = await axios.get(api + `expiredAnnouncements/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUpcommingAnnouncements = async (date: string) => {
  try {
    const data = await axios.get(api + `upcomingAnnouncements/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const filterAnnouncementsByTitle = async (title: string) => {
  try {
    const data = await axios.get(api + `titleFilter/${title}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAnnouncement = async (announcementId: number) => {
  try {
    const data = await axios.delete(api + announcementId);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateAnnouncement = async (
  announcementId: number,
  title: string,
  description: string,
  date: string
) => {
  try {
    const data = await axios.put(api + announcementId, {
      title: title,
      description: description,
      date: date,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
