import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = `${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/review/`;

export const addReview = async (
  courseId: string,
  userId: string,
  createdBy: string,
  message: string,
  reaction: string,
  isChecked: boolean,
  createdAt: string
) => {
  try {
    const data = await axios.post(api, {
      courseId: courseId,
      userId: userId,
      createdBy: createdBy,
      message: message,
      reaction: reaction,
      isChecked: isChecked,
      createdAt: createdAt,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserReviews = async (userEmail: string) => {
  try {
    const data = await axios.get(api + `userEmail/${userEmail}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserReviewsForSpecificCourse = async (
  userEmail: string,
  courseId: string
) => {
  try {
    const data = await axios.get(
      api + `userEmail/${userEmail}/courseId/${courseId}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteReview = async (reviewId: number) => {
  try {
    const data = await axios.delete(api + reviewId);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const batchDeleteByEmail = async (userEmail: string) => {
  try {
    const data = await axios.delete(api + `userEmail/${userEmail}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getPublishedReviewsByCourseId = async (courseId: string) => {
  try {
    const data = await axios.get(api + `courseId/${courseId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
