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
  const [hour, setHour] = useState<number>(10);
  const [minute, setMinute] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      return;
    }

    // Apply current time to the selected date
    const newDate = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    setSelectedDate(newDate);

    // Don't close the picker - let user select time
    // if (onChange) {
    //   onChange(newDate.toISOString());
    // }
  };

  const handleTimeChange = (newHour?: number, newMinute?: number) => {
    const updatedHour = newHour ?? hour;
    const updatedMinute = newMinute ?? minute;

    setHour(updatedHour);
    setMinute(updatedMinute);

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(updatedHour, updatedMinute, 0, 0);
      setSelectedDate(newDate);

      if (onChange) {
        onChange(newDate.toISOString());
      }
    }
  };

  const handleConfirm = () => {
    if (selectedDate && onChange) {
      const finalDate = new Date(selectedDate);
      finalDate.setHours(hour, minute, 0, 0);
      onChange(finalDate.toISOString());
      setIsOpen(false);
    }
  };

  const generateHours = () => {
    return Array.from({ length: 24 }, (_, i) => i);
  };

  const generateMinutes = () => {
    // Generate minutes in 15-minute intervals for simplicity
    return [0, 15, 30, 45];
  };

  return (
    <div className="datetime-picker">
      <div className="datetime-trigger">
        <span className="datetime-icon">{icon}</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          onClickOutside={() => setIsOpen(false)}
          onCalendarClose={() => setIsOpen(false)}
          onCalendarOpen={() => setIsOpen(true)}
          open={isOpen}
          dateFormat="d MMM yyyy, HH:mm"
          minDate={new Date()}
          placeholderText={placeholder}
          className="datetime-input"
          wrapperClassName="datetime-wrapper"
          calendarClassName="datetime-calendar"
          autoComplete="off"
          showPopperArrow={false}
          popperPlacement="bottom-start"
          onInputClick={() => setIsOpen(true)}
          shouldCloseOnSelect={false}
        >
          <div className="custom-time-picker-inline">
            <div className="custom-time-header">
              Select Time (24-hour format)
            </div>
            <div className="custom-time-selectors">
              {/* Hour Selector */}
              <div className="time-selector-column">
                <div className="time-selector-label">Hour</div>
                <div className="time-selector-options scrollable">
                  {generateHours().map((h) => (
                    <button
                      key={h}
                      type="button"
                      className={`time-option ${hour === h ? "selected" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeChange(h, undefined);
                      }}
                    >
                      {h.toString().padStart(2, "0")}:00
                    </button>
                  ))}
                </div>
              </div>

              {/* Minute Selector */}
              <div className="time-selector-column">
                <div className="time-selector-label">Minutes</div>
                <div className="time-selector-options">
                  {generateMinutes().map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`time-option ${minute === m ? "selected" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeChange(undefined, m);
                      }}
                    >
                      :{m.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="custom-time-footer">
              <button
                type="button"
                className="time-confirm-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                disabled={!selectedDate}
              >
                Confirm Date & Time
              </button>
            </div>
          </div>
        </DatePicker>
      </div>
    </div>
  );
};

export default DateTimePicker;
