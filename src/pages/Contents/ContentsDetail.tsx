 import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';

import {
  contentsBookmark,
  contentsBookmarkCancel,
  getContentsDetail,
} from '@/api/contents';

import GuideCarousel from '@/components/guide/GuideCarousel';
import useBookmark from '@/hook/useBookmark';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ContentsDetail() {
  const { id } = useParams();
  // const [like, setLike] = useState(false);

  const { data } = useQuery({
    queryKey: ['contents', id],
    queryFn: () => getContentsDetail(id),
  });

  const { like, toggleBookmark } = useBookmark({
    id,
    queryKey: 'contents', // 예시 쿼리 키
    bookmarkFn: contentsBookmark, // 북마크 추가 API 함수
    bookmarkCancelFn: contentsBookmarkCancel, // 북마크 취소 API 함수
    initialBookmarkState: data?.bookmark ?? false, // 초기 상태 설정
  });

  // const queryClient = useQueryClient();

  // const favoriteMutation = useMutation({
  //   mutationFn: async () => {
  //     if (like) {
  //       const res = await contentsBookmarkCancel(id);
  //       console.log(res);
  //       return res;
  //     } else {
  //       const res = await contentsBookmark(id);
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
  //     setLike(data.bookmark); // data.bookmark 값으로 상태 업데이트
  //   }
  // }, [data]);

  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10 font-cafe24">
        콘텐츠
      </h1>
      <div className="px-6">
        <div className="mb-1 flex justify-between items-center">
          <h1 className="text-white text-3xl font-cafe24">{data?.title}</h1>
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

        <div className="mb-4">
          <img src={divideLine} alt="divide-line" />
        </div>
        <div className="text-white">
          {data?.description?.split('.').map((sentence, index) => (
            <p key={index}>{sentence.trim()}.</p>
          ))}
        </div>
      </div>
    </div>
  );
}
