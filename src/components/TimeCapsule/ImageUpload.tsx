import imgIcon from "@/../public/assets/svgs/img.svg";
import { Label } from "@/components/ui/label";

// 이미지 업로드 컴포넌트 분리
export const ImageUpload = ({ images, onChange }) => (
    <div className="flex flex-col">
      <Label htmlFor="photo" className="text-black text-sm">
        이미지 업로드
      </Label>
      <div className="relative">
        <input
          id="photo"
          title="이미지 파일 선택"
          type="file"
          multiple
          accept="image/*"
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          onChange={onChange}
        />
        <div className="flex items-center bg-white border border-gray-300 rounded p-2">
          <div>
            <span>{images.length > 0 ? `${images.length}개의 이미지 선택됨` : ""}</span>
          </div>
          <img src={imgIcon} alt="img" className="ml-auto w-6 h-6" />
        </div>
      </div>
    </div>
  );