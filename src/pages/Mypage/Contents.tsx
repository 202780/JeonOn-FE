import favorites from '@/../public/assets/svgs/favorites.svg';
import { getContentsBookmark } from '@/api/user';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Contents() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['my-announcement'],
    queryFn: getContentsBookmark,
  });
  console.log(data);
  return (
    <div className="h-screen">
      <div className="mb-8">
        <h1 className="text-[#0F0] text-[35px] text-center font-bold font-cafe24">
          마이
        </h1>
        <h3 className="text-xl text-white text-center">즐겨찾기</h3>
      </div>
      <div className="px-5">
        <div className="mb-4">
          <h2 className="text-xl text-white">콘텐츠</h2>
        </div>
        <div className="w-full flex flex-col gap-2">
          {data?.map((item: any) => (
            <div
              className="w-full h-24 bg-main-guide rounded-2xl px-5 py-3 border border-[#0F0]"
              key={item.id}
              onClick={() => navigate(`/contents/${item.id}`)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl text-[#0F0]">{item.title}</h3>
                <div>
                  {item.bookmark && <img src={favorites} alt="favorites" />}
                </div>
              </div>
              <div>
                <span className="text-xs font-normal text-white">
                  {item.description}
                </span>
              </div>
              <div className="flex justify-end items-end">
                <span className="text-[10px] text-white">
                  {formatDateToYYYYMMDD(item.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
