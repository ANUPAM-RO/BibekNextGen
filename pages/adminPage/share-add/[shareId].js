import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import AddShare from "@/components/adminSide/AddShare";

const UpdateShare = () => {
  const [shareData, setShareData] = useState([]);
  const router = useRouter();
  const shareId = router?.query?.shareId;

  const getShareData = async () => {
    getDocs(collection(database, "share percentage2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setShareData(data);
    });
  };

  const shareDetails = shareData?.filter((data) => data?.id === shareId);

  useEffect(() => {
    getShareData();
  }, []);

  return (
    <div>
      <AddShare shareData={shareDetails[0]} />
    </div>
  );
};

export default UpdateShare;
