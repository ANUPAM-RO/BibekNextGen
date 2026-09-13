import { database } from "@/firebaseconfig";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { BellPlus } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";

const AddNotification = () => {
  const [mesId, setMsgId] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setDoc(doc(database, "store notification2", `${mesId}`), {
      message_Id: mesId,
      message: message,
    })
      .then(() => {
        console.log("store successfully");
        setMessage("");
        setMsgId("");
        router.push("/adminPage");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to save the notification. Please try again.");
      });
  };
  return (
    <FormShell icon={<BellPlus size={20} />} title="Add Notification">
      <form onSubmit={onHandleSubmit}>
        <Field label="Id">
          <input
            className={inputClass}
            type="text"
            value={mesId}
            onChange={(e) => setMsgId(e.target.value)}
          />
        </Field>
        <Field label="Message">
          <textarea
            className={inputClass}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Field>
        <SubmitButton>Add</SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddNotification;
