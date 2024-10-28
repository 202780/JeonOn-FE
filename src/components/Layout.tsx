import { Outlet, useNavigate } from 'react-router-dom';
import Hamburger from './Home/Hamburger';
import back from '@/../public/assets/svgs/back.svg';
import searchIcon from '@/../public/assets/svgs/search_green.svg';
import { useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const boothDetails = new RegExp('/booth/\\d+$');

  // 검색 버튼이 활성화되어야 하는 경로
  const isSearchEnabled = pathname === '/booth' || boothDetails.test(pathname);

  return (
    <div className="bg-black">
      <div className="h-12 flex justify-between items-center px-5 pt-5">
        {pathname === '/' ? (
          <div></div>
        ) : (
          <div
            onClick={() => {
              if (pathname.startsWith('/guide/')) {
                console.log(1);
                return navigate('/guide', { state: { key: false } });
              }
              navigate(-1);
            }}
          >
            <img src={back} alt="backArrow" />
          </div>
        )}

        <div className="flex items-center">
          {/* 검색 버튼이 특정 경로에서만 활성화 */}
          {isSearchEnabled && (
            <div onClick={() => navigate('/booth/search')} className="mr-3">
              <img src={searchIcon} alt="searchIcon" />
            </div>
          )}

          <Hamburger />
        </div>
      </div>

      <Outlet />
    </div>
  );
}
