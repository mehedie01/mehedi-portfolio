import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  title: string;
  titleNumber: string;
}

export function Section({ id, className, children, title, titleNumber }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 w-full", className)}>
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-primary text-xl font-medium tracking-tight">
          {titleNumber}.
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="h-[1px] bg-border flex-1 max-w-xs ml-4 hidden sm:block"></div>
      </div>
      {children}
    </section>
  );
}
