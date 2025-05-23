import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/event/`;

export const addEvent = async (
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  date: string,
  createdBy: string
) => {
  try {
    const data = await axios.post(api, {
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      date: date,
      createdBy: createdBy,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async () => {
  try {
    const data = await axios.get(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllCurrentEvents = async (date: string) => {
  try {
    const data = await axios.get(api + `eventDate/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllUpcomingEvents = async (date: string) => {
  try {
    const data = await axios.get(api + `upcomingEvents/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllExpiredEvents = async (date: string) => {
  try {
    const data = await axios.get(api + `expiredEvents/${date}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEventById = async (eventId: number) => {
  try {
    const data = await axios.delete(api + eventId);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateEventById = async (
  eventId: number,
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  date: string
) => {
  try {
    const data = await axios.put(api + eventId, {
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      date: date,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const filterByTitle = async (title: string) => {
  try {
    const data = await axios.get(api + `titleFilter/${title}`);
    return data;
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};
