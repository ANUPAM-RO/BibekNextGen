import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import UpdateShare from "@/components/adminSide/UpdateShare";

const EditShare = () => {
  const [projectData, setProjectData] = useState([]);
  const router = useRouter();
  const shareId = router?.query?.shareId;
  const getShareData = async () => {
    getDocs(collection(database, "share percentage2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setProjectData(data);
    });
  };
  const projectDetails = projectData?.filter((data) => data?.id === shareId);

  useEffect(() => {
    getShareData();
  }, []);
  return (
    <div>
      <UpdateShare shareData={projectDetails[0]} />
    </div>
  );
};

export default EditShare;
