import { api } from "@/utils/customAxios";

export type BoothType = {
  name: string;
  location: string;
  index: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  description: string;
  category: string;
  period: string;
  images: File[];
};

export async function postBooth(data: BoothType) {
  try {
    const formData = new FormData();

    const requestBlob = new Blob(
      [
        JSON.stringify({
          name: data.name,
          location: data.location,
          index: data.index,
          start_date: data.start_date,
          end_date: data.end_date,
          start_time: data.start_time,
          end_time: data.end_time,
          description: data.description,
          category: data.category,
          period: data.period,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("request", requestBlob);

    data.images.forEach((image) => {
      formData.append("images", image); 
    });

    const result = await api.post("admins/booths", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Booth registered: ", result);
    return result;
  } catch (error) {
    console.error("Booth registration failed: ", error);
    throw error;
  }
}


export async function deleteBooth(boothId: number) {
  const result = await api.delete(`admins/booths/${boothId}`);
  return result;
}

export async function boothsList(queryString: string = "") {
  const result = await api.get(`booths${queryString}`);
  return result.data;
}

export async function boothDetail(boothId: number) {
  const result = await api.get(`booths/${boothId}`);
  return result.data;
}

export async function boothComments(boothId: number) {
  const result = await api.get(`booths/${boothId}/comments`);
  return result.data;
}

export async function addBoothComment(boothId: number, content: string) {
  try {
    const requestBody = {
      content: content,
    };
    const result = await api.post(`/booths/${boothId}/comments`, requestBody);
    return result;
  } catch (error) {
    console.error("Error adding comment:", error);

    // 요청 실패 시의 response body 구조
    return {
      success: false,
      data: null,
      error: error.message || "Unknown error occurred",
    };
  }
}

export async function deleteComment(boothId: any, commentId: any) {
  try {
    const result = await api.delete(`booths/${boothId}/comments/${commentId}`);
    return result;
  } catch (error: any) {
    console.error("댓글을 삭제할 수 없습니다 : ", error);
  }
}

export async function searchBooth(keyword: string) {
  try {
    const result = await api.get(
      `/booths/search?keyword=${encodeURIComponent(keyword)}`
    );
    return result.data;
  } catch (error) {
    console.error("Error searching booths:", error);
    return null;
  }
}

export async function popularBooth() {
  const result = await api.get("booths/ranks");
  return result.data;
}

export async function likeBooth(boothId: any) {
  try {
    const result = await api.post(`/booths/${boothId}/likes`);
    return result.data;
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

export async function cancelLikeBooth(boothId: any) {
  try {
    const result = await api.delete(`booths/${boothId}/likes`);
    return result.data;
  } catch (error: any) {
    console.error("댓글을 삭제할 수 없습니다 : ", error);
  }
}

export async function boothBookmark(boothId: any) {
  const result = await api.post(`bookmarks/booths/${boothId}`);
  return result;
}

export async function cancelBoothBookmark(boothId: any) {
  const result = await api.delete(`bookmarks/booths/${boothId}`);
  return result;
}

export async function favoritesBooths() {
  const result = await api.get("users/bookmarks/booths");
  return result;
}

export async function favoritesNoti() {
  const result = await api.get("users/bookmarks/notifications");
  return result;
}

export async function favoritesPartners() {
  const result = await api.get("users/bookmarks/partners");
  return result;
}
