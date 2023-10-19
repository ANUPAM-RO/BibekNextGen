import { database } from "@/firebaseconfig";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";

const AddNotification = () => {
  const [mesId, setMsgId] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    try {
      setDoc(doc(database, "store notification2", `${mesId}`), {
        message_Id: mesId,
        message: message,
      }).then(() => {
        console.log("store successfully");
        setMessage("");
        setMsgId("");
        router.push("/adminPage");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className=" text-center">
        <p className="text-3xl font-bold pb-10 ">Add Notification</p>
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Id
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={mesId}
                onChange={(e) => setMsgId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Message Box
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotification;
