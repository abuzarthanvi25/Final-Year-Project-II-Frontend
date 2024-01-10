import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Details from "@/widgets/custom-widgets/profile/tabs/details";

export function Profile() {
  const tabs = [
    {
      label: "Details",
      value: "details",
      icon: <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
      component: <Details/>
    },
    {
      label: "Settings",
      value: "settings",
      icon: <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
      component: <></>
    },
  ];

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <Tabs value="details">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src="/img/bruce-mars.jpeg"
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    Richard Davis
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Student
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <TabsHeader>
                  {tabs.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
              </div>
            </div>
            <TabsBody>
              {tabs.map(({ value, component }) => (
                <TabPanel key={value} value={value}>
                  {component}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
