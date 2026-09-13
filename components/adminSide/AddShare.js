import { useState } from "react";
import { database } from "../../firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { PieChart } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";

const AddShare = ({ shareData }) => {
  const [shareId, setShareId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [percentage, setPercentage] = useState("");
  const router = useRouter();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!shareData?.id) {
      setDoc(doc(database, "share percentage2", `${shareId}`), {
        id: shareId,
        owner_Name: ownerName,
        percentage: percentage,
      })
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setShareId("");
          setOwnerName("");
          setPercentage("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to save the owner share. Please try again.");
        });
    } else {
      updateDoc(
        doc(database, "share percentage2", `${shareId || shareData?.id}`),
        {
          id: shareId || shareData?.id,
          owner_Name: ownerName || shareData?.owner_Name,
          percentage: percentage || shareData?.percentage,
        }
      )
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setShareId("");
          setOwnerName("");
          setPercentage("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update the owner share. Please try again.");
        });
    }
  };

  return (
    <FormShell
      icon={<PieChart size={20} />}
      title={!shareData?.id ? "Add Owner Share" : "Update Owner Share"}
    >
      <form onSubmit={onHandleSubmit}>
        <Field label="Share Id">
          <input
            className={inputClass}
            type="text"
            value={shareId || shareData?.id || ""}
            onChange={(e) => setShareId(e.target.value)}
          />
        </Field>
        <Field label="Owner Name">
          <input
            className={inputClass}
            type="text"
            value={ownerName || shareData?.owner_Name || ""}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </Field>
        <Field label="Share Percentage">
          <input
            className={inputClass}
            type="text"
            value={percentage || shareData?.percentage || ""}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </Field>
        <SubmitButton>{!shareData?.id ? "Create" : "Update"}</SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddShare;
