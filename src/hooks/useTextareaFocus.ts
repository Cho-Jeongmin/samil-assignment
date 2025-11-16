import { useLayoutEffect, useRef } from "react";

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
