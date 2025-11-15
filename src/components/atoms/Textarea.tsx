export default function Textarea({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="outline-0 border border-border rounded-md resize-none p-4 text-text h-70"
      {...props}
    />
  );
}
