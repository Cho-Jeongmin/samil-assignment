"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function isStringArray(arr: SelectOptions): arr is string[] {
  return typeof arr[0] === "string";
}

export type SelectOptions = string[] | { label: string; value: string }[];

interface SearchableSelectProps {
  options: SelectOptions;
  value: string | null;
  setValue: (option: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchDisabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options: rawOptions,
  value,
  setValue,
  placeholder = "검색어를 입력하세요",
  className,
  disabled = false,
  searchDisabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedOptionRef = useRef<HTMLLIElement | null>(null);

  const options = isStringArray(rawOptions)
    ? rawOptions.map((opt: string) => ({ label: opt, value: opt }))
    : rawOptions;

  // input에 자동 포커스
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  // 검색 키워드로 필터링
  const filteredOptions = isSelected
    ? options
    : options.filter((opt) =>
        opt.label.toLowerCase().includes(keyword.toLowerCase())
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
          readOnly={searchDisabled}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={clsx(
            "w-full focus:outline-none",
            disabled && "cursor-not-allowed",
            searchDisabled && "cursor-pointer"
          )}
        />
        <ChevronDown
          onClick={() => !disabled && setOpen((prev) => !prev)}
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
              filteredOptions.map((opt) => (
                <li
                  key={uuidv4()}
                  ref={value === opt.value ? selectedOptionRef : null}
                  onClick={() => {
                    setValue?.(opt.value);
                    setKeyword(opt.label);
                    setOpen(false);
                    setIsSelected(true);
                  }}
                  className={clsx(
                    "p-2 rounded-xs cursor-pointer",
                    value === opt.value
                      ? "bg-primary-300 rounded-sm!"
                      : "hover:bg-gray-100"
                  )}
                >
                  {opt.label}
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
