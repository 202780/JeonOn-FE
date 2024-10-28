import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import photo from "@/../public/assets/svgs/photo.svg";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { CustomDatePicker } from "@/components/common/DatePicker/CustomDatePicker";
import { postAffiliate } from "@/api/afilliate";
import { useNavigate } from "react-router-dom";

const RegisterAffiliate = () => {
  const nav = useNavigate();

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (images.length + selectedFiles.length > 3) {
        alert("이미지는 최대 3장까지 업로드할 수 있습니다.");

        if (imgRef.current) {
          imgRef.current.value = "";
        }
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

    if (!startDate || !endDate) {
      alert("제휴 기간의 시작일과 종료일을 선택해주세요.");
      return;
    }

    if (startDate > endDate) {
      alert("제휴 기간의 시작일은 종료일보다 빠르거나 같아야 합니다.");
      return;
    }

    const data = {
      name,
      location,
      start_date: startDate?.toISOString().split("T")[0] || "",
      end_date: endDate?.toISOString().split("T")[0] || "",
      description,
      images,
    };

    try {
      await postAffiliate(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen h-full flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">안내</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          제휴업체 등록
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-white text-sm font-pretendard flex flex-col gap-4"
      >
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_name" className="flex justify-start">
            매장명
          </Label>
          <Input
            placeholder="매장명"
            required
            id="affiliate_name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_location" className="flex justify-start">
            매장 위치(선택)
          </Label>
          <Input
            placeholder="매장 위치 설명"
            id="affiliate_location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_duration" className="flex justify-start">
            제휴 기간
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
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_description" className="flex justify-start">
            내용
          </Label>
          <Textarea
            placeholder="제휴 내용을 상세하게 설명해주세요."
            required
            id="affiliate_description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white min-h-56 max-h-64 text-black resize-none overflow-auto"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_image" className="flex justify-start">
            업체 이미지
          </Label>
          <div className="relative">
            <Input
              id="affiliate_image"
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
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md"
                >
                  ×
                </button>
              </div>
            ))}
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
                    nav("/guide");
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

export default RegisterAffiliate;
