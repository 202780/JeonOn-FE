import { useEffect, useState } from "react";
import { events } from "@/constants/events";
import Arcodion from "@/components/ui/arcodion";
import Carousel from "@/components/ui/carousel";

const dates = [
  { date: 5, day: "TUE" },
  { date: 6, day: "WED" },
  { date: 7, day: "THU" },
];

export default function TimeTable() {
  const [selectedDate, setSelectedDate] = useState<number>(5);
  const today = new Date();
  const todayDate = today.getDate();

  useEffect(() => {
    console.log(today);
    const currentDate = dates.find((item) => item.date === todayDate);
    setSelectedDate(currentDate ? currentDate.date : 5);
  }, []);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start).getDate();
    return eventDate === selectedDate;
  });

  const specialEvents = filteredEvents.filter((event) => event.special);

  return (
    <div className="h-full w-full min-h-screen flex flex-col font-pretendard">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">타임테이블</h1>
      </div>
      <div className="flex flex-row gap-3 justify-center items-center mt-14 mb-10">
        {dates.map((item) => {
          const isSelected = selectedDate === item.date;
          const circleClasses = `flex flex-col justify-center rounded-full ${
            isSelected ? "w-16 h-16 bg-main" : "w-12 h-12 bg-white"
          }`;

          const dateClasses = `block text-semibold leading-none font-cafe24 ${
            isSelected ? "text-3xl" : "text-xl"
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
      <div className="flex flex-col">
        <div className="font-pretendard text-white font-xl flex justify-center mb-3">
          SPECIAL GUEST
        </div>
        <div className="flex flex-col overflow-hidden">
          <Carousel slides={specialEvents} />
        </div>
      </div>
    </div>
  );
}
