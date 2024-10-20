import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/aiOutput/`;

export const addAiOutput = async (
  courseId: string,
  category: string,
  chapters: number,
  courseName: string,
  description: string,
  duration: string,
  level: string,
  topic: string,
  chaptersArray: string,
  courseBanner: string,
  createdBy: string,
  username: string,
  profileImage: string
) => {
  try {
    const data = await axios.post(api, {
      courseId: courseId,
      category: category,
      chapters: chapters,
      courseName: courseName,
      description: description,
      duration: duration,
      level: level,
      topic: topic,
      chaptersArray: chaptersArray,
      courseBanner: courseBanner,
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

export const getReviewerByCourseId = async (courseId: string) => {
  try {
    const data = await axios.get(api + `courseId/${courseId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateBasicInfo = async (
  id: number,
  courseName: string,
  description: string
) => {
  try {
    const data = await axios.put(api + `updateBasicInfo/${id}`, {
      courseName: courseName,
      description: description,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
