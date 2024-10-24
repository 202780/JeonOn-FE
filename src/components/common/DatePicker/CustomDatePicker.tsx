import triangle_down from "@/../public/assets/svgs/triangle_down.svg";
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

type CustomInputProps = {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <div className="relative flex items-center">
      <Input
        placeholder="yyyy-mm-dd"
        required
        value={value}
        ref={ref}
        readOnly
        className="font-pretendard bg-white text-black text-sm px-2 py-1 border rounded-md w-40"
      />
      <button
        onClick={onClick}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white p-1"
      >
        <img src={triangle_down} alt="Open calendar" className="w-4 h-4" />
      </button>
    </div>
  )
);

type CustomDatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

export const CustomDatePicker = ({
  selectedDate,
  onChange,
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      shouldCloseOnSelect={true}
      selected={selectedDate}
      onChange={onChange}
      timeInputLabel=""
      timeFormat="HH:mm"
      dateFormat="yyyy-MM-dd"
      customInput={<CustomInput />}
      showPopperArrow={false}
      popperPlacement="bottom-start"
      portalId="root-portal"
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="datepickerHeader flex justify-between items-center text-white font-bold text-sm mx-3">
          <span>
            {date.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="flex gap-3">
            <button onClick={decreaseMonth}>&lt;</button>
            <button onClick={increaseMonth}>&gt;</button>
          </div>
        </div>
      )}
      renderDayContents={(day, date) => {
        const isSelected =
          selectedDate?.getTime() === date.getTime() &&
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();

        return (
          <div className={`${isSelected ? "text-black" : "text-white"}`}>
            {day}
          </div>
        );
      }}
    />
  );
};
