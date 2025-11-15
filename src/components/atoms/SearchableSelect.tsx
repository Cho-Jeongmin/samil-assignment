"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface SearchableSelectProps {
  options: string[];
  value: string | null;
  setValue: (option: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  setValue,
  placeholder = "검색어를 입력하세요",
  className,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedOptionRef = useRef<HTMLLIElement | null>(null);

  // input에 자동 포커스
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, []);

  // 검색 키워드로 필터링
  const filteredOptions = isSelected
    ? options
    : options.filter((opt) =>
        opt.toLowerCase().includes(keyword.toLowerCase())
      );

  // 드랍다운 오픈 시, 선택된 옵션으로 자동 스크롤
  useEffect(() => {
    if (open && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    }
  }, [open]);

  // 바깥영역 클릭시 드랍다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      <div
        className={clsx(
          "flex justify-between items-center border border-border rounded-md px-4 h-10 text-gray-600 appearance-none",
          open && "border-main",
          disabled && "bg-gray-100 cursor-not-allowed"
        )}
        onClick={() => !disabled && setOpen(!open)}
      >
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            if (!open) setOpen(true);
            if (isSelected) setIsSelected(false);
            setValue("");
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "w-full focus:outline-none",
            disabled && "cursor-not-allowed"
          )}
        />
        <ChevronDown
          size={24}
          className={clsx(
            "hover:cursor-pointer",
            disabled && "cursor-not-allowed!"
          )}
        />
      </div>

      {/* 드랍다운 */}
      {open && !disabled && (
        <div className="absolute mt-1 w-full p-2 bg-white rounded-md shadow-2xl z-10 max-h-60 overflow-auto">
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt: string) => (
                <li
                  key={uuidv4()}
                  ref={value === opt ? selectedOptionRef : null}
                  onClick={() => {
                    setValue?.(opt);
                    setKeyword(opt);
                    setOpen(false);
                    setIsSelected(true);
                  }}
                  className={clsx(
                    "p-2 rounded-xs cursor-pointer",
                    value === opt
                      ? "bg-primary-300 rounded-sm!"
                      : "hover:bg-gray-100"
                  )}
                >
                  {opt}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">검색 결과가 없습니다</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
