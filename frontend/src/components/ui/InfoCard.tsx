interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function InfoCard({ children, className = '', ...props }: InfoCardProps) {
  return (
    <div
      className={`flex flex-col h-fit gap-2 justify-around bg-[#23222599] backdrop-blur-sm rounded p-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
