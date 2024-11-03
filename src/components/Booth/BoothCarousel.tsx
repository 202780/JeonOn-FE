import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./BoothCarousel.css";

export default function BoothCarousel({
  images,
  handleIndex,
}: any) {
  const imageArray = Array.isArray(images) ? images : images?.split(',');

  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper mb-5"
        centeredSlides={true}
        spaceBetween={10}
        onSlideChange={(e) => {
          handleIndex(e.realIndex);
        }}
      >
        {imageArray && imageArray.length > 0 ? (
          imageArray.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <div>
                <div className="mb-5">
                  <img src={img} alt={`image-${i}`}/>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          // images가 없을 경우 빈 슬라이드 렌더링
          <SwiperSlide></SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
