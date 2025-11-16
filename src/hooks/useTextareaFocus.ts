import { useLayoutEffect, useRef } from "react";

// 관심기업 메모 수정칸 포커싱 hook
export default function useTextareaFocus(isEdit: boolean) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (isEdit) {
      if (textareaRef.current) {
        textareaRef.current?.focus();
      }
    }
  }, [isEdit]);

  return { textareaRef };
}
