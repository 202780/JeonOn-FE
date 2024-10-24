import { api } from "@/utils/customAxios";

type FeedbackIdType = number;

export async function getFeedbackList(categoryQuery: string = "") {
  const result = await api.get(`admins/feedbacks?category=${categoryQuery}`);
  
  return result.data.data;
}

export async function getFeedbackDetail(feedbackId: FeedbackIdType) {
  const result = await api.get(`admins/feedbacks/${feedbackId}`);
  
  return result.data.data; 
}
