import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { database } from "@/firebaseconfig";
import AddFund from "@/components/adminSide/AddFund";

const FundAdd = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getDocs(collection(database, "fund2")).then((querySnapshot) => {
      const existing = querySnapshot.docs[0];
      if (existing) {
        router.replace(`/adminPage/fund-add/${existing.data()?.id}`);
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  if (checking) return null;

  return (
    <div>
      <AddFund />
    </div>
  );
};

export default FundAdd;
