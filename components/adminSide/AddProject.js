import { useState } from "react";
import { database } from "../../firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const AddProject = ({ projectData }) => {
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectAmount, setProjectAmount] = useState(0);
  const router = useRouter();
  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!projectData?.project_Id) {
      try {
        setDoc(doc(database, "store project2", `${projectId}`), {
          project_Id: projectId,
          project_Name: projectName,
          project_Type: projectType,
          project_Amount: projectAmount,
        }).then(() => {
          console.log("store successfully");
          setProjectId("");
          setProjectName("");
          setProjectType("");
          setProjectAmount("");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        updateDoc(
          doc(
            database,
            "store project2",
            `${projectId || projectData?.project_Id}`
          ),
          {
            project_Id: projectId || projectData?.project_Id,
            project_Name: projectName || projectData?.project_Name,
            project_Type: projectType || projectData?.project_Type,
            project_Amount: projectAmount || projectData?.project_Amount,
          }
        ).then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setProjectId("");
          setProjectName("");
          setProjectType("");
          setProjectAmount("");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className=" text-center">
        <p className="text-3xl font-bold pb-10 ">ADD PROJECT</p>
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Project Id
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={projectId || projectData?.project_Id}
                onChange={(e) => setProjectId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Project Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={projectName || projectData?.project_Name}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Type
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="text"
                value={projectType || projectData?.project_Type}
                onChange={(e) => setProjectType(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Amount
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="text"
                value={projectAmount || projectData?.project_Amount}
                onChange={(e) => setProjectAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {!projectData?.project_Id ? "CREATE" : "UPDATE"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
