"use client";

import { PropsWithChildren, useEffect } from "react";

export default function ScrollTop({ children }: Partial<PropsWithChildren>) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return children;
}
