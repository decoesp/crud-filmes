interface TagCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TagCard({ children, className = '', ...props }: TagCardProps) {
  return (
    <div
      className={`${className} bg-[#8E4EC633] text-white w-fit px-2 py-1 rounded-sm hover:bg-[#8E4EC6] transition-colors cursor-pointer`}
      {...props}
    >
      {children}
    </div>
  );
}
