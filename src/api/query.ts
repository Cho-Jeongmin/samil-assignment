import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFavorite,
  deleteFavorite,
  getFavoriteDetail,
  getFavorites,
  updateFavoriteMemo,
} from "./api";
import toast from "react-hot-toast";
import axios from "axios";

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
      toast.success("관심기업이 등록되었습니다.");
    },
    onError: (error) => {
      console.log("관심기업 생성 시 에러 발생", error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("이미 등록된 기업입니다.");
      } else {
        toast.error("관심기업 등록에 실패했습니다.");
      }
    },
  });
};

// 관심기업 메모 수정 뮤테이션
export const useUpdateFavoriteMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      memo,
      onSuccess,
    }: {
      id: number;
      memo: string;
      onSuccess: () => void;
    }) => updateFavoriteMemo(id, memo),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorite-detail", variables.id],
      });
      toast.success("메모가 수정되었습니다.");
      variables.onSuccess();
    },
    onError: (error) => {
      console.log("관심기업 메모 수정 시 에러 발생", error);
      toast.error("메모 수정에 실패했습니다.");
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
      toast.success("삭제되었습니다.");
    },
    onError: (error) => {
      console.log("관심기업 삭제 시 에러 발생", error);
      toast.error("삭제에 실패했습니다.");
    },
  });
};
