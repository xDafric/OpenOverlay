"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Banner1Props {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  defaultVisible?: boolean;
  className?: string;
}

const Banner = ({
  title,
  description,
  linkText,
  linkUrl,
  defaultVisible = true,
  className,
}: Banner1Props) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      className={cn("w-full border-b bg-background px-4 py-2", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <span className="text-sm flex justify-center gap-4">
            <span>
              <span className="font-medium">
                <strong>{title}</strong>{" "}
              </span>
              <span
                className=""
                dangerouslySetInnerHTML={{ __html: description }}
              ></span>
            </span>
            <a
              href={linkUrl}
              className="underline underline-offset-2 hover:text-foreground"
              target="_blank"
            >
              {linkText}
            </a>
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="-mr-2 h-8 w-8 flex-none"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default Banner;
