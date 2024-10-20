import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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
import { useState } from "react";
import postMap from "@/api/map";

const RegisterMap = () => {
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: title,
      location,
      description,
    };

    try {
      await postMap(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Map registration failed", error);
    }
  };

  return (
    <div className=" w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">안내</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          지도 설명 등록
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-white text-sm font-pretendard flex flex-col gap-4"
      >
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="map_location" className="flex justify-start">
            지도 위치
          </Label>
          <Select required value={location} onValueChange={setLocation}>
            <SelectTrigger className="font-pretendard bg-white text-black w-36 text-sm">
              {" "}
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-pretendard text-black text-sm">
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="공연장">공연장</SelectItem>
              <SelectItem value="518 광장">518 광장</SelectItem>
              <SelectItem value="후문 거리">후문 거리</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="map_title" className="flex justify-start">
            지도 설명 제목
          </Label>
          <Input
            required
            id="map_title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="map_description" className="flex justify-start">
            내용
          </Label>
          <Textarea
            required
            id="map_description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white min-h-56 max-h-64 text-black"
          />
        </div>
        <div className="flex justify-end mt-5 mx-10">
          <button
            className="relative text-main font-pretendard text-base px-8 py-2  bg-black rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
            type="submit"
          >
            등록하기
          </button>
        </div>
      </form>
      <Dialog open={openModal}>
        <DialogContent className="w-5/6 h-40 rounded-xl">
          <DialogHeader>
            <DialogTitle className="pt-4">등록되었습니다.</DialogTitle>
            <DialogClose asChild>
              <div className="pt-5">
                <button
                  className="text-main bg-black px-8 py-2 rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
                  onClick={() => setOpenModal(false)}
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

export default RegisterMap;
