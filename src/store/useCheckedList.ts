import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CheckedListState {
  checkedList: number[];
  isMasterChecked: boolean;
  toggleCheck: (id: number, allListLength: number) => void;
  onClickMaster: (newList: number[] | undefined) => void;
  resetCheckedList: () => void;
}

export const useCheckedList = create<CheckedListState>()(
  devtools(
    immer((set, get) => ({
      // 체크된 id 목록
      checkedList: [],

      // 전체 체크 여부
      isMasterChecked: false,

      // 한개 체크 또는 해제
      toggleCheck: (id, allListLength) =>
        set((state) => {
          const index = state.checkedList.indexOf(id);
          if (index >= 0) {
            state.checkedList.splice(index, 1); // 이미 존재하면 삭제
            state.isMasterChecked = false; // 마스터 해제
          } else {
            state.checkedList.push(id); // 존재하지 않으면 추가
            if (state.checkedList.length === allListLength) {
              state.isMasterChecked = true; // 마스터 체크
            }
          }
        }),

      // 전체 체크 또는 해제
      onClickMaster: (allList: number[] | undefined) =>
        set((state) => {
          if (allList) {
            if (state.checkedList.length === allList.length) {
              // 전체해제
              state.checkedList = [];
              state.isMasterChecked = false;
            } else {
              // 전체체크
              state.checkedList = allList;
              state.isMasterChecked = true;
            }
          }
        }),
      resetCheckedList: () =>
        set((state) => {
          state.checkedList = [];
          state.isMasterChecked = false;
        }),
    })),
    { name: "CheckedListStore" }
  )
);
