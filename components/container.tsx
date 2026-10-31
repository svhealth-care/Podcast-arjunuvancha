export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-none px-5 sm:px-8 lg:px-10 xl:px-14 ${className}`}>
      {children}
    </div>
  );
}
