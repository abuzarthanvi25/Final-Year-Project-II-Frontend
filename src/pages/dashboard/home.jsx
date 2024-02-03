import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import {
  statisticsCardsData,
  projectsTableData,
} from "@/data";
import { showFaliureToast } from '@/utils/toast-helpers';
import { getProfileDetailsRequest } from '@/store/reducers/user-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import useEffectOnce from "@/hooks/useEffectOnce";
import { Grid, Skeleton } from "@mui/material";
import { getDashboardStatisticsRequest } from "@/store/reducers/dashboard-reducer";
import {
  UserGroupIcon,
  UserIcon,
  DocumentIcon,
  RectangleGroupIcon
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import CustomTable from "@/components/custom-table";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.auth)
  const { statistics } = useSelector((state) => state.dashboard)
  
  const token = get(userDetails, 'token', null);

  const totalPersonalCourses = get(statistics, 'totalPersonalCourses', 0);
  const totalGroupCourses = get(statistics, 'totalGroupCourses', 0);
  const allNotesOfCurrentUser = get(statistics, 'allNotesOfCurrentUser', 0);
  const allNotesOfCurrentUserSummarized = get(statistics, 'allNotesOfCurrentUserSummarized', 0);
  const personalCourses = get(statistics, 'personalCourses', []);
  const groupCourses = get(statistics, 'groupCourses', []);


  const [loading, setLoading] = useState(false);

  const statisticsData = [
    {
      color: "gray",
      icon: UserIcon,
      title: "Personal Courses",
      value: totalPersonalCourses,
    },
    {
      color: "gray",
      icon: UserGroupIcon,
      title: "Group Courses",
      value: totalGroupCourses,
    },
    {
      color: "gray",
      icon: DocumentIcon,
      title: "Total Notes",
      value: allNotesOfCurrentUser,
    },
    {
      color: "gray",
      icon: RectangleGroupIcon,
      title: "Total Summaries",
      value: allNotesOfCurrentUserSummarized,
    },
  ];

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
  const handleGetDashboardStatistics = () => {
    try {
      if (token) {
        setLoading(true)
        dispatch(getDashboardStatisticsRequest({ token }))
          .then(unwrapResult)
          .catch(err => {
            showFaliureToast(err?.response?.data?.message)
            if (err?.response?.data?.message === 'User not found') {
              handleLogout();
            }
          })
          .finally(() => setLoading(false))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffectOnce(() => {
    handleGetProfile();
    handleGetDashboardStatistics();
  })

  return (
    <div className="mt-12">
      <Grid className="m-3" spacing={3} container>
        <Grid item md={6} xs={12}>
          <Grid spacing={2} container>
            {statisticsData.map(({ icon, title, footer, ...rest }, I) => (
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
          {
            loading ? <Skeleton style={{height:'100%'}} variant='rectangular rounded-xl' className='' width={"100%"} /> :
          <iframe onLoadStart={() => setLoading(true)} onLoadedData={() => setLoading(false)} className="rounded-xl h-full pointer-events-none" src="https://flipclock.tk/" width={"100%"}></iframe>
          }
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="mb-4">
            <CustomTable tableTitle="Personal Courses" columns={['Course Title', 'Members']} rows={personalCourses} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="mb-4">
            <CustomTable tableTitle="Group Courses" columns={['Course Title', 'Members']} rows={groupCourses} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
