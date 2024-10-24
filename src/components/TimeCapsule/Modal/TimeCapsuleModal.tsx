import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTimeCapsule, } from "@/api/timecapsule";
import cancel from "@/../public/assets/svgs/cancel.svg";
import check_box from "@/../public/assets/svgs/check-box.svg";
import empty_box from "@/../public/assets/svgs/empty-box.svg";
import send from "@/../public/assets/svgs/send.svg";
import { getProfile } from "@/api/user";
import { ImageUpload } from "../ImageUpload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TimeCapsuleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSendComplete: (
    mailAddress: string,
    content: string,
    isPublic: boolean,
    images: File[]
  ) => void;
}


export default function TimeCapsuleModal({
  isOpen,
  setIsOpen,
  onSendComplete,
}: TimeCapsuleModalProps) {
  const [nickname, setNickname] = useState("Guest"); // 닉네임 상태 추가

  useEffect(() => {
    if(!isOpen){
      resetForm();
    }
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setNickname(profile.nickname); // 프로필에서 닉네임 가져오기
      } catch (error) {
        console.error("닉네임을 가져오는 중 오류 발생:", error);
      }
    };
    fetchProfile();
  }, [isOpen]);

  const [formData, setFormData] = useState({
    mailAddress: "",
    content: "",
    isPublic: true,
    images: [] as File[],
  });

  // 폼 데이터 업데이트 핸들러 통합
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    // 파일 입력인 경우 처리
    if (type === "file" && "files" in e.target) {
      const target = e.target as HTMLInputElement; // 명시적으로 HTMLInputElement로 캐스팅
      if (target.files) {
        setFormData((prev) => ({
          ...prev,
          images: Array.from(target.files), // 파일을 배열로 변환하여 저장
        }));
      }
    } else {
      // 텍스트 입력인 경우 처리
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handlePublicToggle = () => {
    setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }));
  };

  // 타임캡슐 생성 API 호출 핸들러
  const sendMutation = useMutation({
    mutationFn: async () => {
      await createTimeCapsule(formData.mailAddress, formData.content, formData.isPublic, formData.images);
    },
    onSuccess: () => {
      setIsOpen(false);
      onSendComplete(formData.mailAddress, formData.content, formData.isPublic, formData.images);
      resetForm();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMutation.mutate();
  };

  const resetForm = () => {
    setFormData({
      mailAddress: "",
      content: "",
      isPublic: true,
      images: [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] md:w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="pt-4">타임캡슐 작성</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* 닉네임 표시 */}
          <div className="flex flex-col justify-center gap-3 mb-5">
            <Label htmlFor="nickname" className="text-black text-sm">
              닉네임
            </Label>
            <Input value={nickname} type="text" id="nickname" className="bg-white" readOnly />
          </div>

          {/* 이메일 입력 */}
          <div className="flex flex-col justify-center gap-3 mb-5">
            <Label htmlFor="mailAddress" className="text-black text-sm">
              받는 사람 메일
            </Label>
            <Input
              required
              value={formData.mailAddress}
              type="email"
              name="mailAddress"
              id="mailAddress"
              className="bg-white"
              onChange={handleInputChange}
            />
          </div>

          {/* 내용 입력 */}
          <div className="relative mb-5">
            <Label htmlFor="content" className="text-black text-sm">
              작성란
            </Label>
            <Textarea
              required
              value={formData.content}
              id="content"
              name="content"
              placeholder="지금을 기록해보세요."
              className="bg-white min-h-[120px] max-h-[240px]"
              onChange={handleInputChange}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-20%] flex items-center text-black text-[8px] font-black font-['NanumSquare Neo'] whitespace-nowrap">
              <img src={cancel} alt="cancel" className="mr-1 mb-0.5" />
              <p>비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.</p>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <ImageUpload images={formData.images} onChange={handleInputChange} />

          {/* 공개 비공개 선택 */}
          <div className="relative flex items-center">
            <img
              src={formData.isPublic ? check_box : empty_box}
              alt={"공개 또는 비공개"}
              className="h-[5%] w-[5%] mt-3 mr-2 cursor-pointer"
              onClick={handlePublicToggle}
            />
            <p className="mt-3 text-xs">공개</p>
          </div>

          <div className="flex justify-center items-center mb-12">
            <div className="relative flex items-center text-s mt-3">
              <p>오늘을 기억하고 추억을 선물하세요</p>
            </div>
          </div>

          <DialogClose asChild>
            <button type="submit" className="absolute bottom-4 right-1 py-2">
              <img src={send} alt="send" />
            </button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
