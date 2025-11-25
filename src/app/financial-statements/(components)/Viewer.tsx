import { Box } from "lucide-react";
import { useEffect, useRef } from "react";

interface ViewerProps {
  iframe: HTMLIFrameElement | undefined;
}

export default function Viewer({ iframe }: ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !iframe) return;

    container.innerHTML = "";
    container.appendChild(iframe);
  }, [iframe]);

  return (
    <div className="w-full h-[calc(100vh-130px)] flex items-center justify-center rounded-md border border-border bg-[#F9FAFB] overflow-hidden">
      {!iframe ? (
        <div className="flex flex-col items-center gap-5">
          <Box size={65} />
          <span>기업명과 보고서 옵션을 선택하여 제무제표를 조회해보세요.</span>
        </div>
      ) : (
        <div className="w-full h-full" ref={containerRef} />
      )}
    </div>
  );
}
