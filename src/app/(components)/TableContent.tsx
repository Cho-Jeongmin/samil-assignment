"use client";

import Checkbox from "@/components/atoms/Checkbox";
import { Item } from "@/lib/api";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function TableContent({ items }: { items: Item[] }) {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const onCheck = (id: number) => {
    setCheckedList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onCheckAll = () => {
    if (checkedList.length === items.length) {
      setCheckedList([]);
      setCheckedAll(false);
    } else {
      setCheckedList(items.map((item) => item.id));
      setCheckedAll(true);
    }
  };

  return (
    <table className="w-full rounded-lg outline outline-gray-300 overflow-hidden">
      <colgroup>
        <col className="w-14" />
        <col className="w-auto" />
        <col className="w-60" />
        <col className="w-10" />
      </colgroup>
      <thead>
        <tr className="h-12 bg-gray-100">
          <th>
            <Checkbox
              onClick={onCheckAll}
              checked={checkedAll}
              className="ml-5"
            />
          </th>
          <th className="text-left">회사명</th>
          <th className="text-left">생성일자</th>
          <th className="text-left"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: Item) => (
          <tr
            onClick={() => {}}
            className={clsx(
              "border-t border-t-gray-300 h-12",
              checkedList.includes(item.id)
                ? "bg-primary-100 hover:bg-primary-200"
                : "hover:bg-gray-50"
            )}
            key={item.id}
          >
            <td className="cursor-default">
              <Checkbox
                checked={checkedList.includes(item.id)}
                onChange={() => {
                  onCheck(item.id);
                }}
                className="ml-5"
              />
            </td>
            <td className="cursor-pointer">{item.company_name}</td>
            <td className="cursor-pointer">{item.created_at}</td>
            <td className="">
              <Trash size={20} className="text-border cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
