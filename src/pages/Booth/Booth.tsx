import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoothCategory from "@/components/ui/booth-category";
import BoothDate from "@/components/Booth/BoothDate";
import BoothCards from "@/components/Booth/BoothCards";
import BoothCarousel from "@/components/Booth/BoothCarousel";

import backgate_street_1 from "@/../public/images/booth-main/backgate_street_1.png";
import backgate_street_23 from "@/../public/images/booth-main/backgate_street_23.png";
import square_518_1 from "@/../public/images/booth-main/518_square_1.png";
import square_518_23 from "@/../public/images/booth-main/518_square_23.png";

import RegisterButton from "@/components/admin/registerButton";
import { checkAdminToken } from "@/utils/tokenHandler";

export default function Booth() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date();
    const koreaTimezoneOffset = 9 * 60;
    const koreaDate = new Date(currentDate.getTime() + koreaTimezoneOffset * 60 * 1000);
    const day = koreaDate.getDate();

    if (day <= 5) {
      setImages([backgate_street_1, square_518_1]);
    } else {
      setImages([backgate_street_23, square_518_23]);
    }
  }, []);

  useEffect(() => {
    if (selectedDate === 5) {
      setImages([backgate_street_1, square_518_1]);
    } else if (selectedDate === 6 || selectedDate === 7) {
      setImages([backgate_street_23, square_518_23]);
    }
  }, [selectedDate]);

  const handleDateChange = (number: number) => {
    setSelectedDate(number);
  };

  const handleIndex = (index: number) => {
    const location = index === 0 ? "backgate-street" : "square-518";
    setSelectedLocation(location);
    console.log("Selected Location: ", location);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleCardSelect = (boothId: number) => {
    navigate(`/booth/${boothId}`);
  };

  //console.log(checkAdminToken());

  return (
    <div className="h-auto flex flex-col justify-center items-center">
      <h1 className="text-main text-4xl font-cafe24 mb-5">부스</h1>

      <BoothDate selectedDate={selectedDate} onDateChange={handleDateChange} />

      <div className="mb-7 max-w-[90%] mx-auto h-auto">
        <BoothCarousel images={images} handleIndex={handleIndex} />
      </div>

      <BoothCategory onCategoryChange={handleCategoryChange} />

      <RegisterButton path={"booth"} />

      <BoothCards
        selectedDate={selectedDate}
        selectedCategories={selectedCategories}
        selectedLocation={selectedLocation}
        onCardSelect={handleCardSelect}
      />
    </div>
  );
}
