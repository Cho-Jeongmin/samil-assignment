import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFavorite,
  deleteFavorite,
  getFavoriteDetail,
  getFavorites,
  updateFavoriteMemo,
} from "./api";
import axios from "axios";
import toast from "react-hot-toast";

// 관심기업 목록 조회 쿼리
export const useFavoritesQuery = (page: number) =>
  useQuery({
    queryKey: ["favorites", page],
    queryFn: () => getFavorites(page),
  });

// 관심기업 상세 조회 쿼리
export const useFavoriteDetailQuery = (id: number) =>
  useQuery({
    queryKey: ["favorite-detail", id],
    queryFn: () => getFavoriteDetail(id),
    enabled: id >= 0,
  });

// 관심기업 생성 뮤테이션
export const useCreateFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, memo }: { name: string; memo: string }) =>
      createFavorite({ company_name: name, memo: memo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.log("관심기업 생성 시 에러 발생", error);
    },
  });
};

// 관심기업 메모 수정 뮤테이션
export const useUpdateFavoriteMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, memo }: { id: number; memo: string }) =>
      updateFavoriteMemo(id, memo),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorite-detail", variables.id],
      });
    },
  });
};

// 관심기업 삭제 뮤테이션
export const useDeleteFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map((id) => deleteFavorite(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
