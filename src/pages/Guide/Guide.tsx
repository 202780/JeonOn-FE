import { useEffect, useState } from 'react';
import favorites from '@/../public/assets/svgs/favorites.svg';
import bookmark from '@/../public/assets/svgs/bookmark_empty.svg';
import love from '@/../public/svgs/love.svg';
import trashCan from '@/../public/svgs/delete.svg';

import backGate from '@/../public/images/back-gate.png';
import square from '@/../public/images/518-square.png';
import stadium from '@/../public/images/stadium.png';

import { useLocation, useNavigate } from 'react-router-dom';
import GuideCarousel from '@/components/guide/GuideCarousel';
import { useQuery } from '@tanstack/react-query';
import { getZones, getPartners } from '@/api/guide';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';
// import useBookmark from '@/hook/useBookmark';
// import { checkAdminToken } from '@/utils/tokenHandler';
import RegisterButton from '@/components/admin/registerButton';
import { checkAdminToken } from '@/utils/tokenHandler';
import DeleteModal from '@/components/common/Modal/DeleteModal';
import { deleteMaps, deletePartners } from '@/api/admin';

export default function Guide() {
  const [clicked, setClicked] = useState(true);
  const [curIndex, setCurIndex] = useState(1);

  // 모달 상태와 선택된 아이템 ID 상태 관리
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const clickedStyle =
    'text-xl text-[#0F0] border-b-2 border-[#0F0] h-12 px-2 flex justify-center items-center';
  const defaultStyle =
    'text-xl text-white h-12 px-2 flex justify-center items-center';

  const handleIndex = (index: any) => {
    setCurIndex(index);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentView = searchParams.get('view');
    if (location?.state?.key === false) {
      setClicked(false);
    }

    const newView = clicked ? 'map' : 'partners';
    if (currentView !== newView) {
      searchParams.set('view', newView);
      navigate(
        {
          pathname: location.pathname,
          search: searchParams.toString(),
        },
        { replace: true },
      );
    }
  }, [clicked, navigate, location]);

  const { data } = useQuery({
    queryKey: ['guide', clicked],
    queryFn: async () => {
      if (clicked) return null;
      if (!clicked) return await getPartners();
    },
  });

  const mapInfo = useQuery({
    queryKey: ['maps', curIndex],
    queryFn: () => getZones(curIndex.toString()),
  });

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(id);
    setOpen(true);
  };

  const images = [stadium, square, backGate];

  return (
    <div className="h-screen overflow-x-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-3 font-cafe24">
        안내
      </h1>
      <div className="w-full h-12 border-b border-[#5B5B5B] flex justify-center gap-24 items-center mb-8 font-pretendard">
        <div
          className={`${clicked ? clickedStyle : defaultStyle}`}
          onClick={() => setClicked(true)}
        >
          지도
        </div>
        <div
          className={clicked ? defaultStyle : clickedStyle}
          onClick={() => setClicked(false)}
        >
          제휴업체
        </div>
      </div>
      {!clicked ? (
        <div>
          <RegisterButton path={'affiliate'} />
          <div className="flex flex-col justify-center items-center gap-5 px-5 mb-10">
            {data?.data.map((item: any) => (
              <div
                key={item.id}
                id={item.id}
                className="w-full h-24 bg-list-box rounded-2xl px-5 py-3 border border-[#0F0]"
                onClick={(e) => navigate(`/guide/${e.currentTarget.id}`)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-[#0F0] max-w-[80%] truncate overflow-hidden whitespace-nowrap font-pretendard">
                    {item.name}
                  </h3>
                  <div>
                    {item?.bookmark ? (
                      <img src={favorites} alt="favorites" />
                    ) : (
                      <img src={bookmark} alt="favorites" />
                    )}
                  </div>
                </div>
                <div className="max-h-8 overflow-hidden">
                  <span className="text-xs font-normal text-white overflow-y-hidden font-pretendard">
                    {item.description}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-1">
                  <span className="text-[10px] text-white font-pretendard">
                    {formatDateToYYYYMMDD(item.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5">
          <div className="mb-12">
            <GuideCarousel images={images} handleIndex={handleIndex} />
          </div>
          <div className="flex justify-center items-center gap-1 mb-6">
            <div>
              <img src={love} alt="love" />
            </div>
            <h1 className="text-white text-xl font-pretendard">
              {curIndex === 1
                ? '대운동장'
                : curIndex === 2
                ? '5·18 광장'
                : '후문 거리'}
            </h1>
          </div>
          <div className="-mr-5">
            <RegisterButton path={'map'} />
          </div>

          <div className="w-full bg-map rounded-xl border border-[#0F0] flex flex-col mb-5">
            {mapInfo.data?.data.map((item: any, index: any) => (
              <div className="px-3 relative" key={item.id}>
                <div
                  className={`gap-3 flex justify-start px-2 py-3 border-b border-[#0F0] ${
                    index === mapInfo.data?.data.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div>
                    <img src={love} alt="description" />
                  </div>

                  <div className="flex flex-col justify-center items-start max-h-8 overflow-hidden">
                    <h1 className="text-sm text-white font-pretendard">
                      {item.name}
                    </h1>

                    <span className="text-[10px] text-white overflow-y-hidden whitespace-pre-wrap font-pretendard">
                      {item.description}
                    </span>
                  </div>
                </div>
                {checkAdminToken() ? (
                  <div
                    onClick={(e) => handleDeleteClick(item.id, e)}
                    className="absolute top-2 right-3"
                  >
                    <img src={trashCan} alt="delete" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모달 컴포넌트 */}
      <DeleteModal
        isOpen={open}
        id={selectedId}
        setIsOpen={setOpen}
        queryKey={'maps'}
        queryKeyOptions={selectedId}
        deleteFn={deleteMaps}
      />
    </div>
  );
}
