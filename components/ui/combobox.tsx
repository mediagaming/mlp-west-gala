"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CustomComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  label?: string;
  emptyMessage?: string;
}

export function CustomCombobox({
  value,
  onValueChange,
  options,
  placeholder = "Select an option...",
  disabled = false,
  className,
  error = false,
  label,
  emptyMessage = "No options found.",
}: CustomComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const showCustomOption = searchValue && !filteredOptions.includes(searchValue);

  // Reset highlighted index when options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions, searchValue]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(
            prev + 1,
            filteredOptions.length - 1 + (showCustomOption ? 1 : 0)
          )
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (showCustomOption) {
          handleSelect(searchValue);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setSearchValue("");
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (!isOpen) setIsOpen(true);
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-combobox-item]");
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor="combobox-input">{label}</Label>}
      <div ref={comboboxRef} className="relative">
        {/* Trigger Button */}
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn(
            "w-full justify-between h-10",
            error && "border-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleTriggerClick}
          disabled={disabled}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  ref={inputRef}
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search or type custom value..."
                  className="pl-8 h-9"
                />
              </div>
            </div>

            {/* Options List */}
            <div
              ref={listRef}
              className="max-h-48 overflow-y-auto"
              role="listbox"
            >
              {filteredOptions.length === 0 && !showCustomOption ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  {emptyMessage}
                </div>
              ) : (
                <>
                  {/* Predefined Options */}
                  {filteredOptions.map((option, index) => (
                    <div
                      key={option}
                      data-combobox-item
                      className={cn(
                        "flex items-center px-3 py-2 text-sm cursor-pointer transition-colors",
                        highlightedIndex === index && "bg-gray-100",
                        value === option && "bg-blue-50"
                      )}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 flex-shrink-0",
                          value === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="flex-1 truncate">{option}</span>
                    </div>
                  ))}

                  {/* Custom Option */}
                  {showCustomOption && (
                    <div
                      data-combobox-item
                      className={cn(
                        "flex items-center px-3 py-2 text-sm cursor-pointer transition-colors border-t border-gray-100",
                        highlightedIndex === filteredOptions.length &&
                          "bg-gray-100"
                      )}
                      onClick={() => handleSelect(searchValue)}
                      onMouseEnter={() =>
                        setHighlightedIndex(filteredOptions.length)
                      }
                    >
                      <Plus className="mr-2 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="flex-1 truncate">
                        Add "{searchValue}"
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        Custom
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Plus icon component (add this if not already imported)
const Plus = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);