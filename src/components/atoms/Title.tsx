interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div>
      <h1 className="text-[1.75rem] font-semibold mb-1">{title}</h1>
      <h2 className="text-sm font-normal text-gray-500">{subtitle}</h2>
    </div>
  );
}
