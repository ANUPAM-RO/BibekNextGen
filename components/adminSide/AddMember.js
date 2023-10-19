import { useState } from "react";
import { database } from "../../firebaseconfig";
// import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
// const dbInstance = collection(database, 'store product', "Stone");
const AddMember = ({ memberData }) => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();
  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!memberData?.member_Id) {
      try {
        setDoc(doc(database, "store member", `${memberId}`), {
          member_Id: memberId,
          member_Name: memberName,
          designation: designation,
          type: type,
        }).then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setMemberId("");
          setMemberName("");
          setDesignation("");
          setType("");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        updateDoc(
          doc(
            database,
            "store member",
            `${memberId || memberData?.member_Id}`
          ),
          {
            member_Id: memberId || memberData?.member_Id,
            member_Name: memberName || memberData?.member_Name,
            designation: designation || memberData?.designation,
            type: type || memberData?.type,
          }
        ).then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setMemberId("");
          setMemberName("");
          setDesignation("");
          setType("");
        });
      } catch (error) {
        console.log(error);
      }
    }
    console.log(memberName, designation, memberData);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className=" text-center">
        <p className="text-3xl font-bold pb-10 ">ADD MEMBER</p>
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Member Id
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={memberId || memberData?.member_Id}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Member Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={memberName || memberData?.member_Name}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Degisnation
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="text"
                value={designation || memberData?.designation}
                onChange={(e) => setDesignation(e.target.value)}
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
                value={type || memberData?.type}
                onChange={(e) => setType(e.target.value)}
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
                {!memberData?.member_Id ? "CREATE" : "UPDATE"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
