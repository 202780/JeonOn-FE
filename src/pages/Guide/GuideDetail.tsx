import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';
import calendar from '@/../public/assets/svgs/guide/calendar.svg';
import location from '@/../public/assets/svgs/guide/location.svg';

import GuideCarousel from '@/components/guide/GuideCarousel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  getPartnerDetail,
  partnersBookmark,
  partnersBookmarkCancel,
} from '@/api/guide';

import { formatDateToYYYYMMDD } from '@/utils/dateStr';

import useBookmark from '@/hook/useBookmark';

// type TPartnersDetail = {
//   name: string;
//   description: string;
//   image: [string];
//   location: string;
//   start_date: string;
//   end_date: string;
//   bookmark: boolean;
//   created_at: string;
// };

export default function GuideDetail() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['partners-detail', id],
    queryFn: () => getPartnerDetail(id),
  });

  const { like, toggleBookmark } = useBookmark({
    id,
    queryKey: 'partners-detail', // 예시 쿼리 키
    bookmarkFn: partnersBookmark, // 북마크 추가 API 함수
    bookmarkCancelFn: partnersBookmarkCancel, // 북마크 취소 API 함수
    initialBookmarkState: data?.bookmark ?? false, // 초기 상태 설정
  });

  // const queryClient = useQueryClient();

  // const favoriteMutation = useMutation({
  //   mutationFn: async () => {
  //     if (like) {
  //       const res = await partnersBookmarkCancel(id);
  //       console.log(res);
  //       return res;
  //     } else {
  //       const res = await partnersBookmark(id);
  //       console.log(res);
  //       return res;
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['partners-detail', id] });
  //   },
  // });
  // useEffect(() => {
  //   if (data) {
  //     setLike(data?.bookmark); // data.bookmark 값으로 상태 업데이트
  //   }
  // }, [data]);

  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10 font-cafe24">
        안내
      </h1>
      <div className="px-6">
        <div className="mb-3">
          <span className="bg-[#0F0] text-black text-xs px-5 py-1 rounded-full">
            제휴업체
          </span>
        </div>
        <div className="mb-1 flex justify-between items-center">
          <h1 className="text-[#0F0] text-3xl font-cafe24">{data?.name}</h1>
          <div onClick={toggleBookmark}>
            {like ? (
              <img src={favorites} alt="favorites" />
            ) : (
              <img src={bookmark} alt="bookmark" />
            )}
          </div>
        </div>
        <div className="mb-3">
          <span className="text-white text-xs">
            {formatDateToYYYYMMDD(data?.created_at)}
          </span>
        </div>

        <GuideCarousel images={data?.images} />

        <div className="flex justify-start items-center mb-3">
          <img src={location} alt="location" />
          <span className="text-white text-[10px]">{data?.location}</span>
        </div>
        <div className="flex justify-start items-center mb-3">
          <img src={calendar} alt="calendar" className="ml-1 mr-1" />
          <span className="text-white text-[10px]">
            {`${data?.start_date} ~ ${data?.end_date}`}
          </span>
        </div>

        <div className="mb-3">
          <img src={divideLine} alt="divide-line" />
        </div>
        <div className="text-white text-base">
          {data?.description?.split('.').map((sentence, index) => (
            <p key={index}>{sentence.trim()}.</p>
          ))}
        </div>
      </div>
    </div>
  );
}
