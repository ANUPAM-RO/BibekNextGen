import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import UpdateFund from "@/components/adminSide/UpdateFund";
import { useRouter } from "next/router";

const EditFund = () => {
  const [fundData, setFundData] = useState([]);
  const router = useRouter();
  const fundId = router?.query?.Id;
  const getShareData = async () => {
    getDocs(collection(database, "fund2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFundData(data);
    });
  };

  const projectDetails = fundData?.filter((data) => data?.id == fundId);
  console.log(projectDetails);
  useEffect(() => {
    getShareData();
  }, []);
  return (
    <div>
      <UpdateFund fundData={projectDetails[0]} />
    </div>
  );
};

export default EditFund;
