import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import Department from "./Department";

const MainBody = () => {
  const [memberData, setMemberData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [shareData, setShareData] = useState([]);
  const [message, setMessage] = useState([]);
  const [fundData, setFundData] = useState([]);

  const getMemberData = async () => {
    getDocs(collection(database, "store member")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMemberData(data);
    });
  };
  const getProjectData = async () => {
    getDocs(collection(database, "store project2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setProjectData(data);
    });
  };
  const getShareData = async () => {
    getDocs(collection(database, "share percentage2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setShareData(data);
    });
  };
  const getNotificationData = async () => {
    getDocs(collection(database, "store notification2")).then(
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMessage(data);
      }
    );
  };
  const getFundData = async () => {
    getDocs(collection(database, "fund2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFundData(data);
    });
  };
  const currentProjects = projectData?.filter(
    (data) => data.project_Type === "CP"
  );
  const previousProjects = projectData?.filter(
    (data) => data?.project_Type === "PP"
  );

  useEffect(() => {
    getMemberData();
    getProjectData();
    getShareData();
    getNotificationData();
    getFundData();
  }, []);
  return (
    <div>
      <div className="text-2xl font-bold text-green-500 flex justify-center pb-4 pt-4">
        Owners
      </div>
      <div className="flex justify-between">
        <div className="card w-96 h-36 bg-white text-primary-content ml-2">
          <div className="card-body">
            <p className="text-xl text-black">
              Owner Name :
              <span className="text-green-800 font-bold pl-2">
                Debanshu Das
              </span>
            </p>
            <p className="text-xl text-black">
              Share Persentage :
              <span className="text-amber-800 pl-2">{0}%</span>
            </p>
          </div>
        </div>

        <div className="card w-96 h-36 bg-white text-primary-content mr-2">
          <div className="card-body">
            <p className="text-xl text-black">
              Owner Name :
              <span className="text-green-800 font-bold pl-2">
                Subham Ghosh
              </span>
            </p>
            <p className="text-xl text-black">
              Share Persentage :
              <span className="text-amber-800 pl-2">{100}%</span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold text-red-500 flex justify-center pb-4 pt-4">
        Company Fund
      </div>
      <div className="flex justify-center">
        <div className="card w-96 h-24 bg-white text-primary-content mr-2 ">
          <div className="card-body">
            <p className="text-xl text-black">
              Amount :
              <span className="text-green-800 font-bold pl-2">
                {fundData[0]?.amount}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold text-red-500 flex justify-center pb-4 pt-4">
        Projects Minamata
      </div>
      <div>
        <p className="text-xl font-bold text-red-700 p-4">Previous Projects:</p>
        <div className=" grid grid-cols-3 md:grid-cols-2 gap-4 ">
          {!!previousProjects?.length &&
            previousProjects?.map((data) => (
              <div className="card w-96 bg-white text-neutral-content m-4">
                <div className="card-body">
                  <h2 className="card-title text-black">
                    Project name :
                    <span className="text-green-500">{data?.project_Name}</span>
                  </h2>
                  <p className="text-black font-semibold">
                    Amount :
                    <span className="text-cyan-400 font-semibold pl-2">
                      {data?.project_Amount}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <p className="text-xl font-bold text-red-700 p-4">Current Projects:</p>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {!!currentProjects?.length &&
            currentProjects?.map((data) => (
              <div className="card w-96 bg-white text-neutral-content m-4">
                <div className="card-body">
                  <h2 className="card-title text-black">
                    Project name :
                    <span className="text-green-500">{data?.project_Name}</span>
                  </h2>
                  <p className="text-black font-semibold">
                    Amount :
                    <span className="text-cyan-400 font-semibold  pl-2">
                      {data?.project_Amount}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text-2xl font-bold text-orange-700 flex justify-center pb-4 pt-4">
        Notice!!
      </div>
      <div className="card w-11/12 bg-white text-neutral-content ml-4 mb-4">
        <div className="card-body">
          {!!message?.length &&
            message?.map((data) => (
              <h2 className="card-title text-black">{data?.message}</h2>
            ))}
        </div>
      </div>
      <div className="text-2xl font-bold text-yellow-700 flex justify-center pb-4 pt-4">
        Employee list with details
      </div>
      <Department memberData={memberData} />
    </div>
  );
};

export default MainBody;
