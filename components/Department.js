import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function Department({ memberData }) {
  const fontendData = memberData?.filter((data) => data?.type === "fed");
  const backendData = memberData?.filter((data) => data?.type === "bed");
  const devopsData = memberData?.filter((data) => data?.type === "dvd");

  const data = [
    {
      label: "Frontend Department",
      value: "fed",
      dataArr: fontendData,
    },
    {
      label: "Backend Department",
      value: "bed",
      dataArr: backendData,
    },
    {
      label: "Devops Department",
      value: "dvd",
      dataArr: devopsData,
    },
  ];

  return (
    <Tabs value="html">
      <TabsHeader className="mb-2">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, dataArr }) => (
          <TabPanel key={value} value={value}>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Degisnation</th>
                  </tr>
                </thead>
                <tbody>
                  {dataArr?.map((emp) => (
                    <tr>
                      <td>{emp?.member_Id}</td>
                      <td>{emp?.member_Name}</td>
                      <td>{emp?.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
