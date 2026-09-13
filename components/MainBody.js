import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import Department from "./Department";
import {
  Wallet,
  FolderKanban,
  Bell,
  Users,
  Briefcase,
} from "lucide-react";

const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const SectionHeader = ({ icon, title, accent = "text-primary" }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className={accent}>{icon}</span>
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
  </div>
);

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const OwnerCard = ({ name, percentage }) => (
  <div className="card bg-base-100 border border-slate-100 shadow-soft flex-1">
    <div className="card-body flex-row items-center gap-4">
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
        {initials(name)}
      </div>
      <div className="flex-1">
        <p className="text-slate-800 font-semibold">{name}</p>
        <p className="text-sm text-slate-500">Owner</p>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="badge badge-primary badge-lg font-semibold">
        {percentage}%
      </span>
    </div>
  </div>
);

const ProjectCard = ({ name, amount, type }) => (
  <div className="card bg-base-100 border border-slate-100 shadow-soft hover:shadow-lg transition-shadow">
    <div className="card-body">
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title text-slate-800 text-base">{name}</h3>
        <span
          className={`badge badge-sm font-semibold ${
            type === "CP" ? "badge-success" : "badge-ghost"
          }`}
        >
          {type === "CP" ? "Current" : "Previous"}
        </span>
      </div>
      <p className="text-2xl font-bold text-primary mt-1">
        {currency(amount)}
      </p>
    </div>
  </div>
);

const MainBody = () => {
  const [memberData, setMemberData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [shareData, setShareData] = useState([]);
  const [message, setMessage] = useState([]);
  const [fundData, setFundData] = useState([]);

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
  const getShareData = async () => {
    getDocs(collection(database, "share percentage2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setShareData(data);
    });
  };
  const getNotificationData = async () => {
    getDocs(collection(database, "store notification2")).then(
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMessage(data);
      }
    );
  };
  const getFundData = async () => {
    getDocs(collection(database, "fund2")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFundData(data);
    });
  };
  const currentProjects = projectData?.filter(
    (data) => data.project_Type === "CP"
  );
  const previousProjects = projectData?.filter(
    (data) => data?.project_Type === "PP"
  );

  useEffect(() => {
    getMemberData();
    getProjectData();
    getShareData();
    getNotificationData();
    getFundData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionHeader icon={<Briefcase size={20} />} title="Owners" />
        {!!shareData?.length ? (
          <div className="flex flex-col md:flex-row gap-4">
            {shareData?.map((data) => (
              <OwnerCard
                key={data?.id}
                name={data?.owner_Name}
                percentage={data?.percentage}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No owners added yet.</p>
        )}
      </section>

      <section>
        <SectionHeader icon={<Wallet size={20} />} title="Company Fund" />
        <div className="card bg-base-100 border border-slate-100 shadow-soft max-w-sm">
          <div className="card-body flex-row items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-success/10 text-success flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Available balance</p>
              <p className="text-2xl font-bold text-slate-800">
                {currency(fundData[0]?.amount)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader icon={<FolderKanban size={20} />} title="Projects" />

        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Current
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
          {!!currentProjects?.length &&
            currentProjects?.map((data) => (
              <ProjectCard
                key={data?.project_Id}
                name={data?.project_Name}
                amount={data?.project_Amount}
                type={data?.project_Type}
              />
            ))}
        </div>

        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Previous
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {!!previousProjects?.length &&
            previousProjects?.map((data) => (
              <ProjectCard
                key={data?.project_Id}
                name={data?.project_Name}
                amount={data?.project_Amount}
                type={data?.project_Type}
              />
            ))}
        </div>
      </section>

      <section>
        <SectionHeader
          icon={<Bell size={20} />}
          title="Notices"
          accent="text-warning"
        />
        <div className="flex flex-col gap-3">
          {!!message?.length ? (
            message?.map((data, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-slate-100 bg-base-100 shadow-soft px-5 py-4 transition hover:shadow-lg hover:border-warning/30"
              >
                <div className="h-9 w-9 shrink-0 rounded-full bg-warning/10 text-warning flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <p className="text-slate-700 leading-relaxed pt-1.5">
                  {data?.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">No notices right now.</p>
          )}
        </div>
      </section>

      <section>
        <SectionHeader icon={<Users size={20} />} title="Employees" />
        <div className="card bg-base-100 border border-slate-100 shadow-soft">
          <div className="card-body">
            <Department memberData={memberData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainBody;
