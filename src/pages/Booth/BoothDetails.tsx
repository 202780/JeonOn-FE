import { useSearchParams, useParams } from "react-router-dom";
import { useBoothDetail } from "@/hook/useBoothDetail";
import useBookmark from "@/hook/useBookmark";
import SignInModal from "@/components/common/Modal/SignInModal";
import time from "@/../public/assets/svgs/time_white.svg";
import location from "@/../public/assets/svgs/location_white.svg";
import deleteIcon from "@/../public/assets/svgs/delete_white.svg";
import comment from "@/../public/assets/svgs/comment.svg";
import bookmark_empty from "@/../public/assets/svgs/bookmark_empty.svg";
import bookmark_filled from "@/../public/assets/svgs/bookmark_filled.svg";
import BoothComments from "@/components/Booth/BoothComments";
import NewBoothComment from "@/components/Booth/NewBoothComment";
import BoothCarousel from "@/components/Booth/BoothCarousel";
import LikingBooth from "@/components/Booth/LikingBooth";
import { isLoggedIn } from "@/api/login";
import { deleteBooth, boothBookmark, cancelBoothBookmark } from "@/api/booth";

export default function BoothDetail() {
  const [searchParams] = useSearchParams();
  const categories = searchParams.get("categories");

  const { id } = useParams();

  // 부스 정보, 상태 관리 (useBoothDetail 훅)
  const {
    boothData,
    nickname,
    showLoginModal,
    setShowLoginModal,
    commentsUpdated,
    setCommentsUpdated,
    handleOpenLoginModal,
    handleLoginSuccess,
    commentCount,
  } = useBoothDetail(id);

  // 북마크 상태 관리 (useBookmark 훅)
  const { like, toggleBookmark } = useBookmark({
    id: id,
    queryKey: "boothDetail",
    bookmarkFn: boothBookmark,
    bookmarkCancelFn: cancelBoothBookmark,
    initialBookmarkState: boothData?.bookmark ?? false,
  });

  if (!boothData) {
    return <div className="text-white">Loading...</div>;
  }

  const adminToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImFkbWluIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyOTI3MjE1MSwiZXhwIjoxNzI5ODc2OTUxfQ.TTVtY67gKeB0CnUuqKO74BD5jzxpgCTuvi1TMGelXsM";

  return (
    <div className="min-h-screen flex flex-col items-center bg-black p-5">
      <h1 className="mb-4 text-main text-4xl font-cafe24">부스</h1>
      <div className="flex flex-col items-start w-full max-w-[305px]">
        {/* 부스 이미지 슬라이드 */}
        <div className="w-full max-w-[305px] h-[303px] mb-3 bg-white rounded-[20px] border-2 border-white">
          {boothData.images && boothData.images.length > 0 ? (
            <BoothCarousel
              images={boothData.images}
              handleIndex={(index) =>
                console.log("Current image index:", index)
              }
            />
          ) : (
            <img
              src="https://via.placeholder.com/305x303"
              alt="booth"
              className="w-full h-auto object-contain"
            />
          )}
        </div>

        {/* 카테고리 정보 있을 때만 렌더링 */}
        {categories && (
          <div className="flex items-center justify-center w-[80px] h-[25px] mb-3 bg-[#00ff00] rounded-full">
            <span className="text-black text-xs font-normal">{categories}</span>
          </div>
        )}

        <div className="text-white w-full space-y-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {/* 부스 이름 */}
              <h1 className="text-3xl text-main font-cafe24">
                {boothData.name}
              </h1>

              {/* 북마크 */}
              <div onClick={toggleBookmark} className="cursor-pointer">
                {like ? (
                  <img
                    src={bookmark_filled}
                    alt="favorites"
                    className="w-9 h-9"
                  />
                ) : (
                  <img
                    src={bookmark_empty}
                    alt="bookmark"
                    className="w-9 h-9"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 mr-1">
              {/* 좋아요 */}
              <LikingBooth boothId={Number(id)} />

              {/* 댓글 개수 */}
              <div className="relative w-6 h-6">
                <img src={comment} className="w-full h-full" alt="comment" />
                <span className="absolute top-[1px] right-2 transform text-black text-xs rounded-full z-20">
                  {commentCount}
                </span>
              </div>

              {/* 관리자일때 부스 삭제 가능 */}
              {isLoggedIn() === adminToken && (
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="fixed bottom-5 right-30 px-5 text-xl shadow-lg shadow-[#555555]"
                  onClick={() => {
                    deleteBooth(Number(id));
                  }}
                />
              )}
            </div>
          </div>

          {/* 부스 위치 */}
          <div className="flex items-center space-x-2">
            <img src={location} alt="Location" className="w-4 h-4" />
            <span>{boothData.location}</span>
          </div>

          {/* 운영 일시 */}
          <div className="flex items-center space-x-2">
            <img src={time} alt="Time" className="w-4 h-4" />
            <span>
              {boothData.start_date} ~ {boothData.end_date}{" "}
              {boothData.start_time} ~ {boothData.end_time}
            </span>
          </div>

          {/* 부스 설명 */}
          <div>{boothData.description}</div>
        </div>

        {/* 댓글 분리선 */}
        <div className="w-full my-4">
          <div className="relative w-full flex items-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="flex-grow h-[2px] bg-white"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div className="mt-2 text-left">
            <span className="text-white text-[15px] font-normal font-['Pretendard']">
              댓글
            </span>
          </div>
        </div>
      </div>

      {/* 작성된 댓글들 */}
      <BoothComments nickname={nickname} commentsUpdated={commentsUpdated} />

      {/* 로그인 여부에 따라 댓글 작성란 처리 */}
      {isLoggedIn() ? (
        <NewBoothComment
          nickname={nickname}
          onCommentSubmit={() => setCommentsUpdated(!commentsUpdated)}
        />
      ) : (
        <NewBoothComment nickname={null} onClick={handleOpenLoginModal} />
      )}

      {showLoginModal && (
        <SignInModal
          isOpen={showLoginModal}
          setIsOpen={setShowLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
