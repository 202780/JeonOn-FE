import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';
import trashCan from '@/../public/svgs/bigDelete.svg';
import { deleteContents } from '@/api/admin';

import {
  contentsBookmark,
  contentsBookmarkCancel,
  getContentsDetail,
} from '@/api/contents';
import DeleteModal from '@/components/common/Modal/DeleteModal';
import SignInModal from '@/components/common/Modal/SignInModal';

import GuideCarousel from '@/components/guide/GuideCarousel';
import useBookmark from '@/hook/useBookmark';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';
import { getAuthToken } from '@/utils/tokenHandler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ContentsDetail() {
  const { id } = useParams();
  const [activeModal, setActiveModal] = useState(false);

  const [deletModalOpen, setDeleteModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['contents', id],
    queryFn: () => getContentsDetail(id),
    staleTime: 0,
  });

  const { like, toggleBookmark } = useBookmark({
    id,
    queryKey: 'contents',
    bookmarkFn: contentsBookmark,
    bookmarkCancelFn: contentsBookmarkCancel,
    initialBookmarkState: data?.bookmark ?? false,
  });

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

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
          <div
            onClick={() => {
              if (getAuthToken() === null) {
                setActiveModal(true);
                return;
              }
              toggleBookmark();
            }}
          >
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

        <div
          className="flex justify-end items-end mb-2"
          onClick={() => handleDeleteClick()}
        >
          <img src={trashCan} alt="delete-icon" />
        </div>
        <div className="mb-4">
          <img src={divideLine} alt="d/ivide-line" />
        </div>
        <div className="text-white">
          {data?.description?.split('.').map((sentence, index) => (
            <p key={index}>{sentence.trim()}.</p>
          ))}
        </div>
      </div>
      {/* 삭제 모달 컴포넌트 */}
      <DeleteModal
        isOpen={deletModalOpen}
        id={id}
        setIsOpen={setDeleteModalOpen}
        queryKey={'contents'}
        deleteFn={deleteContents}
      />
      {/* 로그인 모달 */}
      <SignInModal
        isOpen={activeModal}
        setIsOpen={() => setActiveModal(false)}
      />
    </div>
  );
}
