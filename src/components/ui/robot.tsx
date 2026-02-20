import { cn } from "@/lib/utils";

export function Robot({
  children,
  className,
  outerChildren,
  
}: {
  children: React.ReactNode;
  outerChildren?: React.ReactNode;
  className?: string;
  
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative  overflow-hidden select-none",
        className,
      )}
    >
      {/* Robot Image */}
      <img src={ "/robot-2d.webp"} alt="Robot" className="block h-auto w-full" />

      {/* Robot Screen */}
      <div className={cn("pointer-events-auto absolute top-[40.95%] left-[51.35%] flex aspect-[446/278] w-[36%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[12%/18%] ")}>
        {children}
      </div>

      {outerChildren}
    </div>
  );
}