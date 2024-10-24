import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilledBtn } from "@/components/common/Button/filled-btn";
import { useState, useRef } from "react";
import photo from "@/../public/assets/svgs/photo.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { postBooth } from "@/api/booth";
import { CustomDatePicker } from "@/components/common/DatePicker/CustomDatePicker";
import { useNavigate } from "react-router-dom";

type BoothCategoryType = {
  type: string;
  category: string;
};

const boothCategory: BoothCategoryType[] = [
  { type: "음식", category: "food" },
  { type: "체험", category: "experience" },
  { type: "플리마켓", category: "flea-market" },
  { type: "홍보", category: "promotion" },
  { type: "기타", category: "etc" },
];

type BoothPeriodType = {
  type: string;
  period: string;
};

const boothPeriod: BoothPeriodType[] = [
  { type: "주/야간", period: "alltime" },
  { type: "주간", period: "daytime" },
  { type: "야간", period: "nighttime" },
];

const RegisterBooth = () => {
  const nav = useNavigate();

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (images.length + selectedFiles.length > 5) {
        alert("이미지는 최대 5장까지 업로드할 수 있습니다.");
        return;
      }

      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    if (imgRef.current) {
      imgRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formatDate = (date: Date | null) =>
      date ? date.toISOString().split("T")[0] : "";

    const formatTime = (time: string) => `${time}:00`;

    const boothIndex = parseInt(index, 10);

    if (isNaN(boothIndex)) {
      alert("부스 번호를 숫자로 입력해주세요.");
      return;
    }

    const data = {
      name,
      location,
      index: boothIndex,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      start_time: formatTime(startTime),
      end_time: formatTime(endTime),
      description,
      category: selectedCategory,
      period: selectedPeriod,
      images,
    };

    try {
      await postBooth(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Registeration failed:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen h-full flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">부스</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          부스 등록
        </div>
        <form
          onSubmit={handleSubmit}
          className="text-white text-sm font-pretendard flex flex-col gap-4"
        >
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_name" className="flex justify-start">
              부스명
            </Label>
            <Input
              required
              id="booth_name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-white text-black"
            />
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_location" className="flex justify-start">
              부스 위치
            </Label>
            <div className="flex flex-row gap-2">
              <Select required value={location} onValueChange={setLocation}>
                <SelectTrigger className="font-pretendard bg-white text-black w-36 text-sm">
                  {" "}
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-pretendard text-black text-sm">
                  <SelectItem value="backgate-street">후문거리</SelectItem>
                  <SelectItem value="square-518">518 광장</SelectItem>
                </SelectContent>
              </Select>
              <Input
                required
                placeholder="부스 번호 (n번 부스)"
                inputMode="numeric"
                type="text"
                onChange={(e) => setIndex(e.target.value)}
                value={index}
                className="bg-white text-black w-40"
              />
            </div>
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_duration" className="flex justify-start">
              부스 운영 일시
            </Label>
            <div className="flex flex-row gap-3 items-center">
              <CustomDatePicker
                selectedDate={startDate}
                onChange={(date) => setStartDate(date)}
              />{" "}
              ~{" "}
              <CustomDatePicker
                selectedDate={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="flex flex-row gap-3 items-center">
              <Input
                required
                type="time"
                className="bg-white text-black w-40"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />{" "}
              ~
              <Input
                required
                type="time"
                className="bg-white text-black w-40"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                step="60"
              />
            </div>
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_description" className="flex justify-start">
              부스 설명
            </Label>
            <Textarea
              required
              placeholder="부스 주최자와 함께 부스를 자유롭게 설명해주세요. "
              id="booth_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white min-h-56 max-h-64 text-black"
            />
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_image" className="flex justify-start">
              부스 이미지
            </Label>
            <div className="relative">
              <Input
                id="booth_image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="bg-white text-black"
                ref={imgRef}
              />
              <img src={photo} alt="photo" className="absolute top-2 right-2" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_image" className="flex justify-start">
              부스 필터링 선택
            </Label>
            <div className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap max-w-full">
              {boothCategory.map((category) => {
                const isSelected = selectedCategory === category.category;
                const categoryClasses = `${
                  isSelected
                    ? "bg-[#6EFA6E] text-black border-[#6EFA6E]"
                    : "bg-black text-white border-white"
                } border text-xs w-16 h-7 flex shrink-0`;
                return (
                  <FilledBtn
                    type="button"
                    className={categoryClasses}
                    onClick={() => setSelectedCategory(category.category)}
                  >
                    {category.type}
                  </FilledBtn>
                );
              })}
              {boothPeriod.map((period) => {
                const isSelected = selectedPeriod === period.period;
                const periodClasses = `${
                  isSelected
                    ? "bg-[#6EFA6E] text-black border-[#6EFA6E]"
                    : "bg-white text-black border-white"
                } border text-xs w-16 h-7 flex shrink-0`;
                return (
                  <FilledBtn
                    type="button"
                    className={periodClasses}
                    onClick={() => setSelectedPeriod(period.period)}
                  >
                    {period.type}
                  </FilledBtn>
                );
              })}
            </div>
          </div>
          <div className="flex justify-end mt-5 mb-10 mx-10">
            <button
              className="relative text-main font-pretendard text-base px-8 py-2 bg-black rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
              type="submit"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
      <Dialog open={openModal}>
        <DialogContent className="w-5/6 h-40 rounded-xl font-pretendard">
          <DialogHeader>
            <DialogTitle className="pt-4">등록되었습니다.</DialogTitle>
            <DialogClose asChild>
              <div className="pt-5">
                <button
                  className="text-main bg-black px-8 py-2 rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
                  onClick={() => {
                    setOpenModal(false);
                    nav("/booth");
                  }}
                >
                  돌아가기
                </button>
              </div>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterBooth;
