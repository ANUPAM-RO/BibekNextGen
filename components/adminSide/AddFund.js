import { useState } from "react";
import { database } from "@/firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Wallet } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";

const AddFund = ({ fundData }) => {
  const [fundId, setFundId] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!fundData?.id) {
      setDoc(doc(database, "fund2", `${fundId}`), {
        id: fundId,
        amount: amount,
      })
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setFundId("");
          setAmount("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to save the fund. Please try again.");
        });
    } else {
      updateDoc(doc(database, "fund2", `${fundId || fundData?.id}`), {
        id: fundId || fundData?.id,
        amount: amount || fundData?.amount,
      })
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setFundId("");
          setAmount("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update the fund. Please try again.");
        });
    }
  };

  return (
    <FormShell
      icon={<Wallet size={20} />}
      title={!fundData?.id ? "Add Fund" : "Update Fund"}
    >
      <form onSubmit={onHandleSubmit}>
        <Field label="Fund Id">
          <input
            className={inputClass}
            type="text"
            value={fundId || fundData?.id || ""}
            onChange={(e) => setFundId(e.target.value)}
          />
        </Field>
        <Field label="Amount">
          <input
            className={inputClass}
            type="text"
            value={amount || fundData?.amount || ""}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>
        <SubmitButton>{!fundData?.id ? "Create" : "Update"}</SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddFund;
