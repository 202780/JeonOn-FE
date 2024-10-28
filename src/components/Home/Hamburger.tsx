import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import hamburger from '@/../public/assets/svgs/hamburger.svg';
import { checkAdminToken, getAuthToken } from '@/utils/tokenHandler';
import SignInModal from '../common/Modal/SignInModal';

export default function Hamburger() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  return (
    <div>
      {/* 드롭다운이 열렸을 때 배경 오버레이 */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
          onClick={() => setIsDropdownOpen(false)} // 오버레이 클릭 시 드롭다운 닫기
        ></div>
      )}

      <DropdownMenu
        onOpenChange={(open) => setIsDropdownOpen(open)} // 드롭다운 상태 관리
      >
        <DropdownMenuTrigger asChild>
          <div className="text-white z-20">
            <img src={hamburger} alt="hamburger" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 mt-2 z-20 bg-transparent text-white border-none">
          <DropdownMenuCheckboxItem
            className="text-2xl flex justify-end items-center"
            onClick={() => navigate('/')}
          >
            홈
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => {
              if (getAuthToken() === null) {
                setActiveModal(true);
                return;
              }
              navigate('/my-page');
            }}
            className="text-2xl flex justify-end items-center"
          >
            MY
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => navigate('/guide')}
            className="text-2xl flex justify-end items-center"
          >
            안내
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => navigate('/contents')}
            className="text-2xl flex justify-end items-center"
          >
            콘텐츠
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => navigate('/time-table')}
            className="text-2xl flex justify-end items-center"
          >
            타임테이블
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => navigate('/booth')}
            className="text-2xl flex justify-end items-center"
          >
            부스
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => navigate('/time-capsule')}
            className="text-2xl flex justify-end items-center"
          >
            타임캡슐
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            onClick={() => navigate('/feedback')}
            className="text-2xl flex justify-end items-center"
          >
            피드백
          </DropdownMenuCheckboxItem>
          {checkAdminToken() && (
            <DropdownMenuCheckboxItem className="text-2xl flex justify-end items-center">
              관리자
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 로그인 모달 */}
      <SignInModal
        isOpen={activeModal}
        setIsOpen={() => setActiveModal(false)}
      />
    </div>
  );
}
