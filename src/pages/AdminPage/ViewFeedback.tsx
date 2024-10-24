import { FilledBtn } from "@/components/common/Button/filled-btn";
import { useState, useEffect } from "react";
import { getFeedbackDetail, getFeedbackList } from "@/api/feedbacks";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

type FeedbackOptionType = {
  type: string;
  category: string;
};

const feedbackOptions: FeedbackOptionType[] = [
  { type: "축제준비위원회", category: "festival-committee" },
  { type: "2024 대동제", category: "cnu-festival" },
  { type: "축제사이트", category: "festival-site" },
];

type FeedbackType = {
  id: number;
  nickname: string;
  title: string;
  created_at: string;
};

type FeedbackDetailType = {
  id: number;
  content: string;
  images: string[];
};

const FeedbackItem: React.FC<{
  feedback: FeedbackType;
  isSelected: boolean;
  detail?: FeedbackDetailType;
  onClick: () => void;
  onImageClick: (src: string) => void;
}> = ({ feedback, isSelected, detail, onClick, onImageClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}-${date.getDate()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="flex bg-white border rounded-3xl font-pretendard p-4 flex-col gap-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row gap-3">
        <div className="rounded-full shrink-0 bg-black w-6 h-6 flex justify-center items-center">
          <div className="text-main text-base font-extrabold">
            {feedback.id}
          </div>
        </div>
        <div className="flex flex-col min-w-0 gap-1 w-full">
          <div className="text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {feedback.title}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-xs">{feedback.nickname}</div>
            {!isSelected && (
              <div className="text-xs text-[#5C5C5CDE]">
                {formatDate(feedback.created_at)}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSelected && detail && (
        <div className="flex flex-col px-2 mt-2 gap-2">
          <div
            key={detail.id}
            className="flex flex-row bg-white border border-black rounded-xl p-3 text-xs"
          >
            {detail.content}
          </div>

          <div className="flex flex-row gap-2 mt-2 w-full overflow-x-auto">
            {detail.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`feedback-${index}`}
                className="w-20 h-20 object-cover rounded-lg bg-[#D9D9D9] cursor-pointer"
                onClick={() => onImageClick(img)}
                onError={(e) => {
                  e.currentTarget.src = "/assets/default-image.png";
                }}
              />
            ))}
          </div>
        </div>
      )}

      {isSelected && (
        <div className="mt-auto flex justify-end text-xs text-[#5C5C5CDE]">
          {formatDate(feedback.created_at)}
        </div>
      )}
    </div>
  );
};

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    feedbackOptions[1].category
  );
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(
    null
  );
  const [selectedDetail, setSelectedDetail] = useState<
    FeedbackDetailType | undefined
  >(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackList = await getFeedbackList(selectedCategory);
        const sortedFeedbacks = feedbackList.sort((b, a) => a.id - b.id);
        setFeedbacks(sortedFeedbacks);
      } catch (error) {
        console.error("Failed to fetch feedback list", error);
      }
    };
    fetchFeedbacks();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchFeedbackDetail = async () => {
      if (selectedFeedbackId === null) return;
      try {
        const detail = await getFeedbackDetail(selectedFeedbackId);
        setSelectedDetail(detail);
      } catch (error) {
        console.error("Failed to fetch feedback details", error);
      }
    };
    fetchFeedbackDetail();
  }, [selectedFeedbackId]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">피드백</h1>
      </div>
      <div className="w-full flex flex-col font-pretendard">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          피드백 목록
        </div>
      </div>
      <div className="flex flex-col justify-center mx-8">
        <div className="flex flex-row gap-3 mb-5 justify-center">
          {feedbackOptions.map((option) => (
            <FilledBtn
              key={option.category}
              type="button"
              onClick={() => setSelectedCategory(option.category)}
              className={`w-28 border truncate text-xs font-thin bg-transparent ${
                selectedCategory === option.category
                  ? "border-main text-main"
                  : "border-white text-white"
              }`}
            >
              {option.type}
            </FilledBtn>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {feedbacks.map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              isSelected={selectedFeedbackId === feedback.id}
              detail={
                selectedFeedbackId === feedback.id ? selectedDetail : undefined
              }
              onClick={() =>
                setSelectedFeedbackId((prev) =>
                  prev === feedback.id ? null : feedback.id
                )
              }
              onImageClick={(src) => setSelectedImage(src)}
            />
          ))}
        </div>
      </div>

      {/* 이미지 모달 */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="w-full max-w-96 p-4">
          <DialogClose asChild>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 cursor-pointer"
            />
          </DialogClose>
          <img
            src={selectedImage || ""}
            alt="Selected"
            className="w-full h-auto object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewFeedback;
