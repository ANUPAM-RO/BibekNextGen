import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import AddProject from "@/components/adminSide/AddProject";

const UpdateProject = () => {
  const [projectData, setProjectData] = useState([]);
  const router = useRouter();
  const projectId = router?.query?.projectId;
  const getProjectData = async () => {
    getDocs(collection(database, "store project2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setProjectData(data);
    });
  };
  const projectDetails = projectData?.filter(
    (data) => data?.project_Id === projectId
  );
  console.log(projectDetails);
  useEffect(() => {
    getProjectData();
  }, []);
  return (
    <div>
      <AddProject projectData={projectDetails[0]} />
    </div>
  );
};

export default UpdateProject;
