import HomePage from "@/components/HomePage";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const home = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setChecking(false);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (checking) return null;

  return <HomePage />;
};

export default home;
