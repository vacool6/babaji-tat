import { useState, ReactNode } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.css";

interface DateTimePickerProps {
  placeholder: string;
  icon: ReactNode;
  onChange?: (date: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  placeholder,
  icon,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      return;
    }

    // Apply current time to the selected date
    const newDate = new Date(date);
    let hours24 = hour;

    if (period === "PM" && hour !== 12) {
      hours24 = hour + 12;
    } else if (period === "AM" && hour === 12) {
      hours24 = 0;
    }

    newDate.setHours(hours24, minute, 0, 0);
    setSelectedDate(newDate);

    if (onChange) {
      onChange(newDate.toISOString());
    }
  };

  const handleTimeChange = (
    newPeriod?: "AM" | "PM",
    newHour?: number,
    newMinute?: number,
  ) => {
    const updatedPeriod = newPeriod ?? period;
    const updatedHour = newHour ?? hour;
    const updatedMinute = newMinute ?? minute;

    setPeriod(updatedPeriod);
    setHour(updatedHour);
    setMinute(updatedMinute);

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      let hours24 = updatedHour;

      if (updatedPeriod === "PM" && updatedHour !== 12) {
        hours24 = updatedHour + 12;
      } else if (updatedPeriod === "AM" && updatedHour === 12) {
        hours24 = 0;
      }

      newDate.setHours(hours24, updatedMinute, 0, 0);
      setSelectedDate(newDate);

      if (onChange) {
        onChange(newDate.toISOString());
      }
    }
  };

  const generateHours = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => i);
  };

  return (
    <div className="datetime-picker">
      <div className="datetime-trigger">
        <span className="datetime-icon">{icon}</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="d MMM yyyy, h:mm aa"
          minDate={new Date()}
          placeholderText={placeholder}
          className="datetime-input"
          wrapperClassName="datetime-wrapper"
          calendarClassName="datetime-calendar"
          popperClassName="datetime-popper"
          autoComplete="off"
          showPopperArrow={false}
          popperPlacement="bottom-start"
          popperModifiers={
            [
              {
                name: "offset",
                options: {
                  offset: [0, 8],
                },
              },
              {
                name: "preventOverflow",
                options: {
                  rootBoundary: "viewport",
                  tether: false,
                  altAxis: true,
                },
              },
            ] as any
          }
        >
          <div className="custom-time-picker-inline">
            <div className="custom-time-header">Select Time</div>
            <div className="custom-time-selectors">
              {/* AM/PM Selector */}
              <div className="time-selector-column">
                <div className="time-selector-label">Period</div>
                <div className="time-selector-options">
                  {["AM", "PM"].map((p) => (
                    <button
                      key={p}
                      className={`time-option ${period === p ? "selected" : ""}`}
                      onClick={() =>
                        handleTimeChange(p as "AM" | "PM", undefined, undefined)
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hour Selector */}
              <div className="time-selector-column">
                <div className="time-selector-label">Hour</div>
                <div className="time-selector-options scrollable">
                  {generateHours().map((h) => (
                    <button
                      key={h}
                      className={`time-option ${hour === h ? "selected" : ""}`}
                      onClick={() => handleTimeChange(undefined, h, undefined)}
                    >
                      {h.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minute Selector */}
              <div className="time-selector-column">
                <div className="time-selector-label">Minute</div>
                <div className="time-selector-options scrollable">
                  {generateMinutes().map((m) => (
                    <button
                      key={m}
                      className={`time-option ${minute === m ? "selected" : ""}`}
                      onClick={() => handleTimeChange(undefined, undefined, m)}
                    >
                      {m.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DatePicker>
      </div>
    </div>
  );
};

export default DateTimePicker;
