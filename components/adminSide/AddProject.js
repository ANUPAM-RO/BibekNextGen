import { useState } from "react";
import { database } from "../../firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FolderPlus } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";

const AddProject = ({ projectData }) => {
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectAmount, setProjectAmount] = useState(0);
  const router = useRouter();
  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!projectData?.project_Id) {
      setDoc(doc(database, "store project2", `${projectId}`), {
        project_Id: projectId,
        project_Name: projectName,
        project_Type: projectType,
        project_Amount: projectAmount,
      })
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setProjectId("");
          setProjectName("");
          setProjectType("");
          setProjectAmount("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to save the project. Please try again.");
        });
    } else {
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
      )
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setProjectId("");
          setProjectName("");
          setProjectType("");
          setProjectAmount("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update the project. Please try again.");
        });
    }
  };
  return (
    <FormShell
      icon={<FolderPlus size={20} />}
      title={!projectData?.project_Id ? "Add Project" : "Update Project"}
    >
      <form onSubmit={onHandleSubmit}>
        <Field label="Project Id">
          <input
            className={inputClass}
            type="text"
            value={projectId || projectData?.project_Id || ""}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </Field>
        <Field label="Project Name">
          <input
            className={inputClass}
            type="text"
            value={projectName || projectData?.project_Name || ""}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Field>
        <Field label="Type">
          <select
            className={inputClass}
            value={projectType || projectData?.project_Type || ""}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="" disabled>
              Select project type
            </option>
            <option value="CP">Current Project</option>
            <option value="PP">Previous Project</option>
          </select>
        </Field>
        <Field label="Amount">
          <textarea
            className={inputClass}
            value={projectAmount || projectData?.project_Amount || ""}
            onChange={(e) => setProjectAmount(e.target.value)}
          />
        </Field>
        <SubmitButton>
          {!projectData?.project_Id ? "Create" : "Update"}
        </SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddProject;
