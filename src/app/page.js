"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return null;
}