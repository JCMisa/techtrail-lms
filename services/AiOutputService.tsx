import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/aiOutput/`;

export const addAiOutput = async (
  category: string,
  chapters: number,
  courseName: string,
  description: string,
  duration: string,
  level: string,
  topic: string,
  chaptersArray: string,
  createdBy: string,
  username: string,
  profileImage: string
) => {
  try {
    const data = await axios.post(api, {
      category: category,
      chapters: chapters,
      courseName: courseName,
      description: description,
      duration: duration,
      level: level,
      topic: topic,
      chaptersArray: chaptersArray,
      createdBy: createdBy,
      username: username,
      profileImage: profileImage,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllAiOutput = async () => {
  try {
    const data = await axios.get(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};
