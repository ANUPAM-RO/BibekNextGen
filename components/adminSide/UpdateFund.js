import { database } from "@/firebaseconfig";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const UpdateFund = (fundData) => {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    try {
      updateDoc(doc(database, "fund2", `${fundData?.id}`), {
        amount: amount || fundData?.amount,
      }).then(() => {
        alert("fund update successfully");
        router.push("/adminPage");
        setAmount("");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className=" text-center">
        <p className="text-3xl font-bold pb-10 ">UPDATE FUND</p>
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Amount
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={amount || fundData?.amount}
                onChange={(e) => setAmount(e.target.value)}
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
                UPDATE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFund;
