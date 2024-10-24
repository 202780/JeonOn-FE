import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { EventType, events } from "@/constants/events";
import location_white from "@/../public/assets/svgs/location_white.svg";
import clock from "@/../public/assets/svgs/clock.svg";

const TWEEN_FACTOR_BASE = 0.52;

// Special guest carousel wrapper component
const SpecialGuestCarousel = () => {
  // special이 true인 이벤트들만 필터링
  const specialEvents = events.filter((event) => event.special);

  return <EmblaCarousel slides={specialEvents} />;
};

type EmblaCarouselProps = {
  slides: EventType[];
};

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType) => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map(
        (slideNode: HTMLElement) =>
          slideNode.querySelector(".embla__slide__number") as HTMLElement
      );
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi: EmblaCarouselType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      const diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (!slidesInView.includes(slideIndex)) return;

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("scroll", tweenScale)
      .on("select", () => {
        const index = emblaApi.selectedScrollSnap();
        setSelectedIndex(index);
      });
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  return (
    <div className="embla w-full">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((event) => (
            <div
              className="embla__slide flex-shrink-0 w-[55%] pl-4"
              key={event.order}
            >
              <div className="embla__slide__number flex justify-center items-center bg-gray-200 h-48 rounded-lg text-4xl">
                {event.img}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 mb-10 gap-2 text-center flex flex-col justify-center">
        <div className="text-xl font-cafe24 text-main">
          {slides[selectedIndex].content}
        </div>
        <div className="flex flex-col text-xs gap-2 font-pretendard text-white">
          <div className="flex flex-row justify-center gap-1">
            <img src={location_white} />
            <p>{slides[selectedIndex].location}</p>
          </div>
          <div className="flex flex-row justify-center gap-1">
            <img src={clock} />
            <p>
              {new Date(slides[selectedIndex].start).getDate()}(
              {
                ["일", "월", "화", "수", "목", "금", "토"][
                  new Date(slides[selectedIndex].start).getDay()
                ]
              }
              ){" "}
              {new Date(slides[selectedIndex].start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              ~{" "}
              {new Date(slides[selectedIndex].end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialGuestCarousel;
