import { getBoothsBookmark } from '@/api/user';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import favorites from '@/../public/assets/svgs/favorites.svg';
import location from '@/../public/svgs/booth/location.svg';
import clock from '@/../public/svgs/booth/clock.svg';

export default function MyBooth() {
  // const { data } = useQuery({
  //   queryKey: ['booths-bookmark'],
  //   queryFn: getBoothsBookmark,
  // });

  const data = [
    {
      id: 1,
      name: '맛있는 타코야끼',
      location: '5.18 광장',
      index: 2,
      start_date: '2024-11-05',
      end_date: '2024-11-07',
      start_time: '13:00:00',
      end_time: '18:00:00',
      bookmark: true,
    },
    {
      id: 2,
      name: '맛있는 피자',
      location: '5.18 광장',
      index: 30,
      start_date: '2024-11-05',
      end_date: '2024-11-07',
      start_time: '13:00:00',
      end_time: '18:00:00',
      bookmark: true,
    },
  ];
  const navigate = useNavigate();

  // 시간을 포맷하는 함수
  const formatTime = (timeStr: string) => {
    return timeStr.slice(0, 5); // 'HH:MM:SS'에서 초 부분을 제외한 'HH:MM' 형식으로 변환
  };

  // 날짜와 시간을 포맷하는 함수
  const formatDateTime = (
    start_date: string,
    start_time: string,
    end_time: string,
  ) => {
    const day = new Date(start_date).getDate(); // 날짜에서 일만 추출
    const formattedStartTime = formatTime(start_time);
    const formattedEndTime = formatTime(end_time);
    return `${day}일, ${formattedStartTime}~${formattedEndTime}`;
  };
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
          <h2 className="text-xl text-white">부스</h2>
        </div>
        <div className="w-full flex flex-col gap-4">
          {data?.map((item: any, index) => (
            <div
              className="w-full h-20 bg-list-box rounded-2xl p-3 border border-[#0F0]"
              key={item.id}
              onClick={() => navigate(`/booth/${item.id}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="text-black bg-main w-5 h-5 rounded-full flex justify-center items-center font-extrabold">
                    {index + 1}
                  </div>
                  <h3 className="text-main text-xl">{item.name}</h3>
                </div>
                <div>
                  {item.bookmark && <img src={favorites} alt="favorites" />}
                </div>
              </div>
              <div className="text-white pl-5 flex justify-start items-center gap-2 font-normal">
                <div className="flex justify-start items-center">
                  <img src={location} alt="location" />
                  <span className="text-[8px]">{item.location}</span>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <img src={clock} alt="clock" />
                  <span className="text-[8px]">
                    {formatDateTime(
                      item.start_date,
                      item.start_time,
                      item.end_time,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
