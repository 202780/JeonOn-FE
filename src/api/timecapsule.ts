import { api } from "@/utils/customAxios";
import { isLoggedIn } from "./login";

// 타임캡슐 생성 함수 (백엔드 연결)
export const createTimeCapsule = async (
  mailAddress: string,
  content: string,
  isPublic: boolean,
  images?: File[]
) => {
  // FormData 생성
  const formData = new FormData();
  
  // request라는 필드에 JSON 데이터를 추가
  formData.append("request", JSON.stringify({
    mail_address: mailAddress,
    content: content,
    is_public: isPublic,
  }));

  // 이미지 파일 추가
  images.forEach((image) => {
    formData.append("images", image); // 여러 개의 이미지 추가
  });

  try {
    const response = await api.post("/timecapsules", formData);
    return response.data;
  } catch (error) {
    console.error("타임캡슐 생성 중 오류 발생:", error.response.data);
    throw error;
  }
};



// 타임캡슐 공개글 조회 함수 (백엔드 연결)
export const getPublicTimeCapsules = async () => {

  try {
    // 백엔드에서 공개 타임캡슐을 가져옴
    const response = await api.get("/timecapsules");

    // 서버 응답 구조에 맞게 데이터 파싱
    const { success, data, error } = response.data;
    
    if (!success || error) {
      console.error("타임캡슐 조회 중 오류 발생:", error);
      return { success: false, error };
    }

    const { timecapsules } = data;

    console.log("타임캡슐 조회 중", timecapsules);
    return {
      success: true,
      timecapsules,
    };
  } catch (error) {
    console.error("타임캡슐 조회 중 오류 발생:", error);
    throw error;
  }
};


// 타임캡슐 삭제 함수 (백엔드 연결)
export const deleteTimeCapsule = async (timeCapsuleId: number) => {
  try {
    // 백엔드로 DELETE 요청을 보냄
    const response = await api.delete(`/timecapsules/${timeCapsuleId}`);

    console.log(`타임캡슐 삭제 성공 ID: ${timeCapsuleId}`);
    return response.data; // 서버로부터 응답 데이터를 반환
  } catch (error) {
    console.error("타임캡슐 삭제 중 오류 발생:", error);
    throw error; // 에러 발생 시 오류를 던짐
  }
};