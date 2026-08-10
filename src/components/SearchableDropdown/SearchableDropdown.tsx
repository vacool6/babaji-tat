import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import "./SearchableDropdown.css";

export interface DropdownOption {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  placeholder: string;
  options: DropdownOption[];
  icon: ReactNode;
  onSelect?: (value: string, label: string) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  placeholder,
  options,
  icon,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Reset search term when closing
        if (selectedLabel) {
          setSearchTerm("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedLabel]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedLabel(option.label);
    setSearchTerm("");
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    if (onSelect) {
      onSelect(option.value, option.label);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const displayValue = selectedLabel && !isOpen ? selectedLabel : searchTerm;

  return (
    <div
      className={`searchable-dropdown ${isOpen ? "open" : ""}`}
      ref={containerRef}
    >
      <div className="dropdown-trigger">
        <span className="dropdown-icon">{icon}</span>
        <input
          ref={inputRef}
          type="text"
          className="dropdown-input"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
        />
        <ChevronDown className="dropdown-arrow" size={16} />
      </div>

      <div className="dropdown-menu">
        <ul className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="dropdown-item no-results">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchableDropdown;
