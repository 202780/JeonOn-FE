import aespa from "@/../public/images/special-guest/aespa.jpg";
import newjeans from "@/../public/images/special-guest/newjeans.jpg"
import { FastForward } from "lucide-react";


export type EventType = {
  order: number;
  start: string;
  end: string;
  content: string;
  location: string;
  special: boolean;
  img?: string;
};

export const events: EventType[] = [
  // 2024-11-05 Events
  {
    order: 1,
    start: "2024-11-05T16:55:00",
    end: "2024-11-05T17:00:00",
    content: "오프닝 및 MC 소개",
    location: "대운동장",
    special: false,
  },
  {
    order: 2,
    start: "2024-11-05T17:00:00",
    end: "2024-11-05T17:23:00",
    content: "로터스",
    location: "대운동장",
    special: false,
  },
  {
    order: 3,
    start: "2024-11-05T17:26:00",
    end: "2024-11-05T17:50:00",
    content: "하이코드",
    location: "대운동장",
    special: false
  },
  {
    order: 4,
    start: "2024-11-05T17:53:00",
    end: "2024-11-05T18:16:00",
    content: "미올",
    location: "대운동장",
    special: false,
  },
  {
    order: 5,
    start: "2024-11-05T18:19:00",
    end: "2024-11-05T18:42:00",
    content: "릿치",
    location: "대운동장",
    special: false,
  },
  {
    order: 6,
    start: "2024-11-05T18:42:00",
    end: "2024-11-05T18:52:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false,
  },
  {
    order: 7,
    start: "2024-11-05T19:00:00",
    end: "2024-11-05T19:40:00",
    content: "개막식",
    location: "대운동장",
    special: false,
  },
  {
    order: 8,
    start: "2024-11-05T20:00:00",
    end: "2024-11-05T20:00:00",
    content: "연예인 공연",
    location: "대운동장",
    special: true,
  },

  // 2024-11-06 Events
  {
    order: 9,
    start: "2024-11-06T16:25:00",
    end: "2024-11-06T16:30:00",
    content: "오프닝 및 MC 소개",
    location: "대운동장",
    special: false,
  },
  {
    order: 10,
    start: "2024-11-06T16:30:00",
    end: "2024-11-06T16:52:00",
    content: "맥퀸토시",
    location: "대운동장",
    special: false,
  },
  {
    order: 11,
    start: "2024-11-06T16:56:00",
    end: "2024-11-06T17:21:00",
    content: "선율",
    location: "대운동장",
    special: false,
  },
  {
    order: 12,
    start: "2024-11-06T17:25:00",
    end: "2024-11-06T17:48:00",
    content: "알케미",
    location: "대운동장",
    special: false,
  },
  {
    order: 13,
    start: "2024-11-06T17:52:00",
    end: "2024-11-06T18:17:00",
    content: "숨",
    location: "대운동장",
    special: false,
  },
  {
    order: 14,
    start: "2024-11-06T18:21:00",
    end: "2024-11-06T18:45:00",
    content: "팩토리",
    location: "대운동장",
    special: false,
  },
  {
    order: 15,
    start: "2024-11-06T18:45:00",
    end: "2024-11-06T18:55:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false, 
  },
  {
    order: 16,
    start: "2024-11-06T18:55:00",
    end: "2024-11-05T19:20:00",
    content: "새내기를 찾아라",
    location: "대운동장",
    special: false,
  },
  {
    order: 17,
    start: "2024-11-06T19:30:00",
    end: "2024-11-07T19:30:00",
    content: "연예인 공연",
    location: "대운동장",
    special: true, 
  },

  // 2024-11-07 Events
  {
    order: 18,
    start: "2024-11-07T15:55:00",
    end: "2024-11-07T16:00:00",
    content: "오프닝 및 MC 소개",
    location: "대운동장",
    special: false,
  },
  {
    order: 19,
    start: "2024-11-07T16:00:00",
    end: "2024-11-07T16:22:00",
    content: "바이슨",
    location: "대운동장",
    special: false,
  },
  {
    order: 20,
    start: "2024-11-07T16:25:00",
    end: "2024-11-07T16:50:00",
    content: "메이플",
    location: "대운동장",
    special: false,
  },
  {
    order: 21,
    start: "2024-11-07T16:53:00",
    end: "2024-11-07T17:17:00",
    content: "뉴에라",
    location: "대운동장",
    special: false
  },
  {
    order: 22,
    start: "2024-11-07T17:17:00",
    end: "2024-11-07T17:30:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false
  },
  {
    order: 23,
    start: "2024-11-07T17:30:00",
    end: "2024-11-07T19:30:00",
    content: "대학가요제",
    location: "대운동장",
    special: false
  },
  {
    order: 24,
    start: "2024-11-07T19:40:00",
    end: "2024-11-07T19:40:00",
    content: "연예인 공연",
    location: "대운동장",
    special: true
  },
];
