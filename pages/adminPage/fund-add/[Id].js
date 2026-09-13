import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import AddFund from "@/components/adminSide/AddFund";

const UpdateFund = () => {
  const [fundData, setFundData] = useState([]);
  const router = useRouter();
  const fundId = router?.query?.Id;

  const getFundData = async () => {
    getDocs(collection(database, "fund2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFundData(data);
    });
  };

  const fundDetails = fundData?.filter((data) => data?.id == fundId);

  useEffect(() => {
    getFundData();
  }, []);

  return (
    <div>
      <AddFund fundData={fundDetails[0]} />
    </div>
  );
};

export default UpdateFund;
