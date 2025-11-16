"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/api/api";
import { useCheckedList } from "@/store/useCheckedList";
import { Item } from "@/api/types";

import clsx from "clsx";
import Checkbox from "@/components/atoms/Checkbox";
import { Trash } from "lucide-react";
import SlidePanel from "@/components/atoms/SlidePanel";
import Detail from "./Detail";

export default function TableContent({
  onOpenDelete,
}: {
  onOpenDelete: () => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
  const items = favorites?.items;

  const {
    checkedList,
    isMasterChecked,
    toggleCheck,
    onClickMaster,
    setSingleDeleteId,
  } = useCheckedList();

  const [slidePanelOpen, setSlidePanelOpen] = useState(
    searchParams.get("company-id") ? true : false
  );

  const onOpenCloseItem = (id: number | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set("company-id", id.toString());
    } else {
      params.delete("company-id");
    }
    replace(`${pathname}?${params.toString()}`);
    setSlidePanelOpen((prev) => !prev);
  };

  return (
    <div>
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
                checked={isMasterChecked}
                onClick={() => onClickMaster(items?.map((item) => item.id))}
                className="ml-5"
              />
            </th>
            <th className="text-left">회사명</th>
            <th className="text-left">생성일자</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: Item) => (
            <tr
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
                  onClick={() => {
                    toggleCheck(item.id, items.length);
                  }}
                  className="ml-5"
                />
              </td>
              <td
                onClick={() => {
                  onOpenCloseItem(item.id);
                }}
                className="cursor-pointer"
              >
                {item.company_name}
              </td>
              <td
                onClick={() => {
                  onOpenCloseItem(item.id);
                }}
                className="cursor-pointer"
              >
                {item.created_at}
              </td>
              <td className="">
                <Trash
                  onClick={() => {
                    setSingleDeleteId(item.id);
                    onOpenDelete();
                  }}
                  size={20}
                  className="text-border cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SlidePanel
        open={slidePanelOpen}
        onClose={() => onOpenCloseItem(undefined)}
      >
        <Detail />
      </SlidePanel>
    </div>
  );
}
