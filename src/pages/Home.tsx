import homeMain from '@/../public/images/mainHome.png';
import Footer from '@/components/Home/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[url('/images/mainBackground.png')] h-full bg-contain bg-center">
        <div className="mb-16">
          <img src={homeMain} alt="home" />
        </div>
        <div className="px-10 flex flex-col justify-center items-center gap-3 pb-5 mb-24">
          <div
            className="w-full h-14 bg-main-guide rounded-[20px] flex flex-col justify-center items-center text-[#0F0] shadow-2xl border border-[#0F0]"
            onClick={() => navigate('/guide')}
          >
            <h1 className="text-xl font-cafe24">안내</h1>
            <span className="text-xs text-C1 font-normal">
              지도와 제휴업체를 한 눈에 볼 수 있어요!
            </span>
          </div>
          <div
            className="w-full h-14 bg-main-guide rounded-[20px] flex justify-center items-center text-[#0F0] text-xl shadow-2xl border border-[#0F0] font-cafe24"
            onClick={() => navigate('/time-table')}
          >
            타임테이블
          </div>
          <div
            className="w-full h-14 bg-main-guide rounded-[20px] flex justify-center items-center text-[#0F0] text-xl shadow-2xl border border-[#0F0] font-cafe24"
            onClick={() => navigate('/contents')}
          >
            콘텐츠
          </div>

          <div
            className="w-full h-14 bg-main-guide rounded-[20px] flex justify-center items-center text-[#0F0] text-xl shadow-2xl border border-[#0F0] font-cafe24"
            onClick={() => navigate('/booth')}
          >
            부스
          </div>
          <div
            className="w-full h-14 bg-main-guide rounded-[20px] flex justify-center items-center text-[#0F0] text-xl shadow-2xl border border-[#0F0] font-cafe24"
            onClick={() => navigate('/time-capsule')}
          >
            타임캡슐
          </div>
          <div
            className="w-full h-14 bg-main-guide rounded-[20px] flex justify-center items-center text-[#0F0] text-xl shadow-2xl border border-[#0F0] font-cafe24"
            onClick={() => navigate('/feedback')}
          >
            피드백
          </div>
        </div>
        <Footer />
        <div className="h-2"></div>
      </div>
    </div>
  );
}
