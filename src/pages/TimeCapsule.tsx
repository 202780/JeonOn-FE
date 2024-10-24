import jar_empty from "@/../public/images/jar_empty.png";
import cancel from "@/../public/assets/svgs/cancel.svg";
import { useState, useEffect } from "react";
import { getPublicTimeCapsules, deleteTimeCapsule } from "@/api/timecapsule";
import { isLoggedIn } from "@/api/login";

import CapsuleComment from "@/components/TimeCapsule/CapsuleComment";
import { FilledBtn } from "../components/common/Button/filled-btn";
import SignInModal from "../components/common/Modal/SignInModal";
import TimeCapsuleModal from "../components/TimeCapsule/Modal/TimeCapsuleModal";
import SendCompleteModal from "../components/TimeCapsule/Modal/SendCompleteModal";

interface Capsule {
  id: number;
  nickname: string;
  content: string;
  images: string[];
  isPublic: boolean;
  created_at: string;
}

export default function TimeCapsule() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [capsules, setCapsules] = useState<Capsule[]>([]); // 공개된 타임캡슐
  const [loading, setLoading] = useState(false);

  const fetchCapsules = async () => {
    try {
      setLoading(true);
      const response = await getPublicTimeCapsules();
      if (response.success) {
        setCapsules(response.timecapsules);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 로그인 여부 확인 후 타임캡슐 모달 또는 로그인 모달 띄우기
  const handleRegisterClick = () => {
    console.log("Register 버튼 클릭됨");
    const isUserLoggedIn = isLoggedIn();
    if (isUserLoggedIn) {
      setActiveModal("timeCapsule"); // 로그인 O -> 타임캡슐 모달 열기
    } else {
      setActiveModal("signIn"); // 로그인 X -> 로그인 모달 열기
    }
  };

  const handleSendComplete = async () => {
    try {
      fetchCapsules();
      setActiveModal("sendComplete");
    } catch (error) {
      console.error("Error creating time capsule:", error);
    }
  };

  const handleDeleteCapsule = async (timeCapsuleId: number) => {
    try {
      setLoading(true);
      await deleteTimeCapsule(timeCapsuleId);
      fetchCapsules(); // 타임캡슐 목록 새로고침
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  return (
    <div className="bg-black flex flex-col items-center min-h-screen p-4 md:p-10 lg:p-20">
      <div className="flex flex-col items-center mb-5 w-full max-w-xl">
        <div className="mx-auto mb-5 text-[#0F0] font-pretendard text-[7vw] md:text-[5vw] lg:text-[30px] font-bold leading-normal text-center">
          타임캡슐
        </div>
        <div className="mb-4 text-white text-center font-gmarket-sans text-[3.5vw] md:text-[2.5vw] lg:text-[15px] font-thin leading-[20px] mb-20">
          우리가 전하는 전대의 찬란함
        </div>

        <img
          src={jar_empty}
          alt="empty jar"
          className="w-[70%] max-w-[600px]"
        />

        <FilledBtn onClick={handleRegisterClick} className="text-s px-10 mt-5">
          등록하기
        </FilledBtn>
      </div>

      <div className="px-8 bg-black text-white flex items-center text-[10px] font-['NanumSquare Neo'] whitespace-nowrap">
        <img
          src={cancel}
          alt="cancel"
          className="mr-1 filter brightness-0 invert"
        />
        <p>비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.</p>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          {/* 공개된 타임캡슐 목록 */}
          {capsules.length > 0 ? (
            <div className="mt-10 max-w-lg w-full bg-black text-white flex flex-col mb-10 space-y-5">
              {capsules.map((capsule, index) => (
                <CapsuleComment
                  key={index}
                  detail={capsule.content}
                  nickname={capsule.nickname}
                  date={capsule.created_at}
                  images={capsule.images || []}
                  isPublic={capsule.isPublic}
                />
              ))}
            </div>
          ) : null}

          {/* 등록된 타임캡슐이 없을 경우 문구 표시 */}
          {capsules.length === 0 && (
            <p className="text-[#00ff00] mt-10 text-xs text-center">
              아직 공개적으로 등록된 타임캡슐이 없습니다.
            </p>
          )}
        </>
      )}

      {/* 로그인 모달 */}
      <SignInModal
        isOpen={activeModal === "signIn"}
        setIsOpen={() => setActiveModal(null)}
      />

      {/* 타임캡슐 모달 */}
      <TimeCapsuleModal
        isOpen={activeModal === "timeCapsule"}
        setIsOpen={() => setActiveModal(null)}
        onSendComplete={handleSendComplete}
      />

      {/* 타임캡슐 전송 완료 모달 */}
      <SendCompleteModal
        isOpen={activeModal === "sendComplete"}
        setIsOpen={() => setActiveModal(null)}
      />
    </div>
  );
}
