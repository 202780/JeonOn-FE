import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import photo from '@/../public/assets/svgs/photo.svg';
import { useRef, useState } from 'react';
import { postContents } from '@/api/admin';
import { useNavigate } from 'react-router-dom';

export default function RegisterContents() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const router = useNavigate();

  const [images, setImages] = useState<File[]>([]);

  const imgRef2 = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (images.length + selectedFiles.length > 3) {
        alert('이미지는 최대 3장까지 업로드할 수 있습니다.');
        return;
      }

      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    if (imgRef2.current) {
      imgRef2.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const imgs = imgRef2.current?.files;
    if (imgs) {
      if (imgs.length > 3) {
        imgRef2.current.value = '';
        return alert('이미지는 최대 3장입니다!');
      }
      for (let i = 0; i < Math.min(3, imgs.length); i++) {
        formData.append('images', imgs[i]);
      }
    } else {
      // 파일이 없는 경우
      formData.append('images', '');
    }
    const requestObject = { title, description: detail };
    // requestObject를 JSON 문자열로 변환하여 Blob 객체로 만듭니다.
    const requestBlob = new Blob([JSON.stringify(requestObject)], {
      type: 'application/json',
    });

    formData.append('request', requestBlob);

    try {
      const result = await postContents(formData);
      console.log(result);
      if (result.status === 200) {
        router('/contents');
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">콘텐츠</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          콘텐츠 등록
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-white text-sm font-pretendard flex flex-col gap-4"
      >
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="contents_title" className="flex justify-start">
            제목
          </Label>
          <Input
            placeholder="콘텐츠 제목"
            required
            id="contents_title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="contents_detail" className="flex justify-start">
            콘텐츠 설명
          </Label>
          <Textarea
            placeholder="콘텐츠에 대해 상세하게 설명해 주세요."
            required
            id="contents_detail"
            onChange={(e) => setDetail(e.target.value)}
            value={detail}
            className="bg-white text-black min-h-36"
          />
        </div>

        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="picture" className="flex justify-start">
            이미지
          </Label>
          <div className="relative">
            <Input
              multiple
              id="picture"
              type="file"
              accept="image/*"
              className="bg-white"
              onChange={handleImageChange}
              ref={imgRef2}
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
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mx-10 gap-2"></div>
        <div className="flex justify-end mt-5 mx-10">
          <button
            className="relative text-main font-pretendard text-base px-8 py-2  bg-black rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
            type="submit"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
