import "@/../public/assets/fonts/font.css";
import location_black from "@/../public/assets/svgs/location_black.svg";
import location_white from "@/../public/assets/svgs/location_white.svg";
import { useState, useRef, useEffect } from "react";
import { EventType } from "@/constants/events";
import down_arrow from "@/../public/assets/svgs/down_arrow.svg";

const Now = ({
  nowActive,
  isNow,
}: {
  nowActive?: boolean;
  isNow?: boolean;
}) => (
  <div
    className={`flex mr-0.5 justify-center font-pretendard items-center font-black text-black text-xs rounded-3xl w-10 h-7 flex-shrink-0 ${
      nowActive ? "visible" : "invisible"
    } ${isNow ? "bg-main" : "bg-slate-300"}`}
  >
    NOW
  </div>
);

const EventDetails = ({
  event,
  nowActive,
  isTopSection,
}: {
  event: EventType;
  nowActive: boolean;
  isTopSection: boolean;
}) => (
  <div className="grid grid-cols-[75%_25%] w-full">
    <div className="flex flex-row items-center gap-1.5 justify-start">
      <Now nowActive={nowActive} isNow={true} />
      <span className="truncate">
        {new Date(event.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
        ~
        {new Date(event.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
      <span className="truncate">{event.content}</span>
    </div>
    <div className="flex items-center gap-1.5 ml-auto mr-2">
      <img
        src={
          isTopSection
            ? location_black
            : nowActive
            ? location_white
            : location_black
        }
      />
      <span className="truncate">{event.location}</span>
    </div>
  </div>
);

type ArcodionProps = {
  events: EventType[];
};

const Arcodion: React.FC<ArcodionProps> = ({ events }) => {
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const arcodionRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      arcodionRef.current &&
      !arcodionRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleInteraction = () => setOpen((prev) => !prev);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      console.log(`Current Time Updated: ${now.toLocaleTimeString()}`); // 콘솔에 시간 출력
      setCurrentTime(now);
    };

    // 첫 렌더링 시 즉시 시간 출력
    updateTime();

    const scheduleUpdate = () => {
      const now = new Date();
      const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      console.log(`[Scheduled]: Next update in ${msUntilNextMinute}ms`); // 스케줄 정보 출력

      const timeoutId = setTimeout(() => {
        updateTime(); // 첫 00초 업데이트
        const intervalId = setInterval(updateTime, 60000); // 이후 1분마다 업데이트

        // Cleanup 함수에서 interval 정리
        return () => clearInterval(intervalId);
      }, msUntilNextMinute);

      return () => clearTimeout(timeoutId);
    };

    const cancelTimeout = scheduleUpdate();
    return cancelTimeout;
  }, []);

  const isCurrentEvent = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    return currentTime >= startTime && currentTime < endTime;
  };

  const currentEvent = events.find((event) =>
    isCurrentEvent(event.start, event.end)
  );

  return (
    <div ref={arcodionRef} className="font-pretendard text-xs">
      {!open ? (
        <div
          onClick={handleInteraction}
          className="flex flex-row justify-between items-center w-full h-14 bg-white rounded-3xl py-2 px-2.5 gap-1"
        >
          {currentEvent ? (
            <EventDetails
              event={currentEvent}
              nowActive={true}
              isTopSection={true}
            />
          ) : (
            <Now isNow={false} nowActive={true} />
          )}
          <div className="mr-1">
            <img src={down_arrow} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-start w-full h-72 bg-white rounded-3xl overflow-y-auto overflow-hidden">
          <div className="flex flex-col w-full h-full py-2 px-2">
            {events.map((event) => {
              const nowActive = isCurrentEvent(event.start, event.end);
              const nowClasses = `rounded-3xl gap-2 w-full h-12 flex flex-row items-center py-2.5 px-2.5 ${
                nowActive ? "bg-black text-white" : "bg-none text-black"
              } `;
              return (
                <div className={nowClasses} key={event.order}>
                  <EventDetails
                    event={event}
                    nowActive={nowActive}
                    isTopSection={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Arcodion;
