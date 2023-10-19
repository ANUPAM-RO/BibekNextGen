import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebaseconfig";
import { useRouter } from "next/router";
const Dashboard = () => {
  const [memberData, setMemberData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [shareData, setShareData] = useState([]);
  const [fundData, setFundData] = useState([]);
  const [notificationData, setNotificationDate] = useState([]);

  const router = useRouter();

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

  const getNotificationData = async () => {
    getDocs(collection(database, "store notification2")).then(
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setNotificationDate(data);
      }
    );
  };

  const getShareData = async () => {
    getDocs(collection(database, "share percentage2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setShareData(data);
    });
  };
  const getFundData = async () => {
    getDocs(collection(database, "fund2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFundData(data);
    });
  };

  const deleteMember = async (id) => {
    await deleteDoc(doc(database, "store member2", id));
  };

  const deleteNotification = async (id) => {
    await deleteDoc(doc(database, "store notification2", id));
  };

  useEffect(() => {
    getMemberData();
    getProjectData();
    getNotificationData();
    getShareData();
    getFundData();
  }, []);
  return (
    <div>
      <div className="text-3xl text-center font-bold text-green-700">
        DASHBOARD
      </div>
      <div className="flex gap-6 justify-end m-6 mr-36">
        <Link href="/adminPage/member-add">
          <button className="btn btn-primary">Add Member</button>
        </Link>
        <Link href="/adminPage/project-add">
          <button className="btn btn-secondary">Add Project</button>
        </Link>
        <Link href="/adminPage/notification-add">
          <button className="btn btn-secondary">Add Notification</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <div className="text-center font-bold text-xl pb-4">Fund</div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {!!fundData.length &&
              fundData?.map((s) => (
                <tr className="" key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.amount}</td>
                  <td>
                    <button
                      className="btn bg-yellow-600 border-none hover:bg-yellow-500"
                      onClick={() => router.push(`/adminPage/fund/${s.id}`)}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <div className="text-center font-bold text-xl pb-4">Notification</div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {!!notificationData.length &&
              notificationData?.map((s) => (
                <tr className="" key={s.member_Id}>
                  <td>{s.message_Id}</td>
                  <td>{s.message}</td>
                  <td>
                    <button
                      className="btn bg-red-600 border-none hover:bg-red-500"
                      onClick={() => deleteNotification(s.message_Id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <div className="text-center font-bold text-xl pb-4">Percentage</div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Share percentage</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {!!shareData.length &&
              shareData?.map((s) => (
                <tr className="" key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.percentage}</td>
                  <td>
                    <button
                      className="btn bg-yellow-600 border-none hover:bg-yellow-500"
                      onClick={() => router.push(`/adminPage/${s.id}`)}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <div className="text-center font-bold text-xl pb-4">ALL MEMBER</div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Member_Id</th>
              <th>Member_Name</th>
              <th>Designation</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {!!memberData.length &&
              memberData?.map((s) => (
                <tr className="" key={s.member_Id}>
                  <td>{s.member_Id}</td>
                  <td>{s.member_Name}</td>
                  <td>{s.designation}</td>
                  <td>{s.type}</td>
                  <td>
                    <button
                      className="btn bg-yellow-600 border-none hover:bg-yellow-500"
                      onClick={() =>
                        router.push(`/adminPage/member-add/${s.member_Id}`)
                      }
                    >
                      EDIT
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn  bg-red-600 border-none hover:bg-red-500"
                      onClick={() => deleteMember(s.member_Id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Table title="PROJECTS" dataArr={projectData} />
    </div>
  );
};

const Table = ({ title, dataArr }) => {
  const router = useRouter();
  const deleteProject = async (id) => {
    await deleteDoc(doc(database, "store project", id));
  };
  return (
    <div className="overflow-x-auto pt-6">
      <div className="text-center font-bold text-xl pb-5">{title}</div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Project Id</th>
            <th>Project Name</th>
            <th>Project Type</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!!dataArr.length &&
            dataArr?.map((s) => (
              <tr className="" key={s.project_Id}>
                <td>{s.project_Id}</td>
                <td>{s.project_Name}</td>
                <td>{s.project_Type}</td>
                <td>{s.project_Amount}</td>
                <td>
                  <button
                    className="btn bg-yellow-600 border-none hover:bg-yellow-500"
                    onClick={() =>
                      router.push(`/adminPage/project-add/${s.project_Id}`)
                    }
                  >
                    EDIT
                  </button>
                </td>
                <td>
                  <button
                    className="btn  bg-red-600 border-none hover:bg-red-500"
                    onClick={() => deleteProject(s.project_Id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
