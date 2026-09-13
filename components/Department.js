import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Department({ memberData }) {
  const fontendData = memberData?.filter((data) => data?.type === "fed");
  const backendData = memberData?.filter((data) => data?.type === "bed");
  const devopsData = memberData?.filter((data) => data?.type === "dvd");

  const data = [
    {
      label: "Frontend",
      value: "fed",
      dataArr: fontendData,
    },
    {
      label: "Backend",
      value: "bed",
      dataArr: backendData,
    },
    {
      label: "DevOps",
      value: "dvd",
      dataArr: devopsData,
    },
  ];

  return (
    <Tabs value="fed">
      <TabsHeader className="mb-4 bg-slate-100">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, dataArr }) => (
          <TabPanel key={value} value={value} className="p-0">
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                    <th>Employee</th>
                    <th>Id</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {dataArr?.length ? (
                    dataArr.map((emp) => (
                      <tr key={emp?.member_Id} className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                              {initials(emp?.member_Name)}
                            </div>
                            <span className="font-medium text-slate-800">
                              {emp?.member_Name}
                            </span>
                          </div>
                        </td>
                        <td className="text-slate-500">{emp?.member_Id}</td>
                        <td className="text-slate-500">{emp?.designation}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-slate-400 py-6">
                        No employees in this department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
