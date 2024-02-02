import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { showFaliureToast } from '@/utils/toast-helpers';
import { getProfileDetailsRequest } from '@/store/reducers/user-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import useEffectOnce from "@/hooks/useEffectOnce";
import { Grid } from "@mui/material";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.auth)
  const token = get(userDetails, 'token', null);

  const handleLogout = () => {
    try {
      dispatch(logoutUserRequest()).then(() => navigate("/sign-in"));
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetProfile = () => {
    try {
      if (token) {
        dispatch(getProfileDetailsRequest({ token }))
          .then(unwrapResult)
          .catch(err => {
            showFaliureToast(err?.response?.data?.message)
            if (err?.response?.data?.message === 'User not found') {
              handleLogout();
            }
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffectOnce(() => {
    handleGetProfile()
  })

  return (
    <div className="mt-12">
      <Grid className="m-3" spacing={3} container>
        <Grid item md={6} xs={12}>
          <Grid spacing={2} container>
            {statisticsCardsData.map(({ icon, title, footer, ...rest }, I) => (
              <Grid key={I} item xs={12} md={12}>
                <div style={{ padding: '1px' }}>
                  <StatisticsCard
                    key={title}
                    {...rest}
                    title={title}
                    icon={React.createElement(icon, {
                      className: "w-6 h-6 text-white",
                    })}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid style={{ height: '42vh' }} item xs={12} md={6} lg={6} xl={6}>
          <iframe className="rounded-xl h-full pointer-events-none" src="https://flipclock.tk/" width={"100%"}></iframe>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="mb-4">
            <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Group Courses
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Course Title", "members", "Progress"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {projectsTableData.map(
                      ({ img, name, members, budget, completion }, key) => {
                        const className = `py-3 px-5 ${key === projectsTableData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                          }`;

                        return (
                          <tr key={name}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="paragraph"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {name}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              {members.map(({ img, name }, key) => (
                                <Tooltip key={name} content={name}>
                                  <Avatar
                                    src={img}
                                    alt={name}
                                    size="sm"
                                    variant="circular"
                                    className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                      }`}
                                  />
                                </Tooltip>
                              ))}
                            </td>
                            <td className={className}>
                              <div className="w-10/12">
                                <Typography
                                  variant="small"
                                  className="mb-1 block text-xs font-medium text-blue-gray-600"
                                >
                                  {completion}%
                                </Typography>
                                <Progress
                                  value={completion}
                                  variant="gradient"
                                  color={completion === 100 ? "green" : "blue"}
                                  className="h-1"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="mb-4">
            <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Courses
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Course Title", "members", "Progress"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {projectsTableData.map(
                      ({ img, name, members, budget, completion }, key) => {
                        const className = `py-3 px-5 ${key === projectsTableData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                          }`;

                        return (
                          <tr key={name}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="paragraph"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {name}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              {members.map(({ img, name }, key) => (
                                <Tooltip key={name} content={name}>
                                  <Avatar
                                    src={img}
                                    alt={name}
                                    size="sm"
                                    variant="circular"
                                    className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                      }`}
                                  />
                                </Tooltip>
                              ))}
                            </td>
                            <td className={className}>
                              <div className="w-10/12">
                                <Typography
                                  variant="small"
                                  className="mb-1 block text-xs font-medium text-blue-gray-600"
                                >
                                  {completion}%
                                </Typography>
                                <Progress
                                  value={completion}
                                  variant="gradient"
                                  color={completion === 100 ? "green" : "blue"}
                                  className="h-1"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
