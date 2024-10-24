import { useState } from "react";
import { events } from "@/constants/events";
import "@/../public/assets/fonts/font.css";
import Arcodion from "@/components/ui/arcodion";
import Carousel from "@/components/ui/carousel";

const dates = [
  { date: 5, day: "TUE" },
  { date: 6, day: "WED" },
  { date: 7, day: "THU" },
];

export default function TimeTable() {
  const [selectedDate, setSelectedDate] = useState<number>(5);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start).getDate();
    return eventDate === selectedDate;
  });

  return (
    <div className="h-full w-full min-h-screen flex flex-col font-pretendard">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">타임테이블</h1>
      </div>
      <div className="flex flex-row gap-3 justify-center items-center mt-20 mb-10 ">
        {dates.map((item) => {
          const isSelected = selectedDate === item.date;
          const circleClasses = `flex flex-col justify-center rounded-full ${
            isSelected ? "w-16 h-16 bg-main" : "w-12 h-12 bg-white"
          }`;

          const dateClasses = `block font-bold leading-none ${
            isSelected ? "text-4xl" : "text-2xl"
          }`;

          const dayClasses = `block font-normal ${
            isSelected ? "text-sm" : "text-xs"
          }`;

          return (
            <div
              key={item.date}
              className={circleClasses}
              onClick={() => handleDateClick(item.date)}
            >
              <div className="text-center">
                <span className={dateClasses}>{item.date}</span>
                <span className={dayClasses}>{item.day}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-10 ml-5 mr-5">
        <div className="font-pretendard text-white font-xl flex justify-center mb-3">
          TIME TABLE
        </div>
        <Arcodion events={filteredEvents} />
      </div>
      <div className="">
        <div className="font-pretendard text-white font-xl flex justify-center mb-3">
          SPECIAL GUEST
        </div>
        <Carousel />
      </div>
    </div>
  );
}
