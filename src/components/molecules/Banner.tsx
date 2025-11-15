import Image from "next/image";

export default function Banner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative">
      <Image src="/banner.png" alt="banner image" width={1920} height={240} />
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center gap-2.5">
        <h2 className="text-base">{subtitle}</h2>
        <h1 className="text-[2rem] font-bold">{title}</h1>
      </div>
    </div>
  );
}
