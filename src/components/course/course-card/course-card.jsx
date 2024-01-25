import { Avatar, Button, Card, CardHeader, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from "@material-tailwind/react"
import "./course-card.css"
import { truncateString } from '@/utils/helpers'
import { EllipsisVerticalIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

const CourseCard = ({title = 'Lorem ipsum dolor .', type = 'Lorem ipsum',description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem iure consequatur aperiam fugiat ipsam! Voluptatum illo accusamus inventore esse aut.' , members = [
  { img: "", full_name: "Romina Hadid" },
  { img: "/img/team-2.jpeg", full_name: "Ryan Tompson" },
  { img: "/img/team-3.jpeg", full_name: "Jessica Doe" },
  { img: "/img/team-4.jpeg", full_name: "Alexander Smith" },
  { img: "/img/team-4.jpeg", full_name: "Alexander Smith" },
], handleViewNotes = () => {}, handleDeleteCourse = () => {}, handleEditAction = () => {}}) => {
  return (
    <Card className="image-wrapper shadow-2xl">
      <div className='flex justify-between'>
      <Tooltip placement="top-start" content={title}>
        <Typography className="text-4xl font-bold text-gray-800 mt-2">{truncateString(title, 12)}</Typography>
      </Tooltip>
      <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-end"
          >
            <Menu placement="right-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList className='min-w-fit m-0'>
                <MenuItem onClick={handleEditAction} className='m-0'>
                  <div className='flex justify-evenly items-center'>
                  <PencilSquareIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-5"
                  />
                  </div>
                </MenuItem>
                <MenuItem onClick={handleDeleteCourse}>
                <div className='flex justify-evenly items-center'>
                  <TrashIcon
                    strokeWidth={3}
                    fill="red"
                    className="h-5"
                  />
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
      </div>
      <Typography className="text-xs text-gray-800 mb-1">{type}</Typography>
      <Tooltip style={{maxWidth: '20px'}} placement="top-end" content={<div className='w-80'>
        <Typography className='text-white font-medium text-xs'>{description}</Typography>
      </div>}>
        <Typography style={{minHeight:'78px'}} className="font-normal text-black my-1">{truncateString(description, 100)}</Typography>
      </Tooltip>
      {!!members.length && <Typography className="text-xs font-extrabold text-gray-900 mr-2 text-right">Members</Typography>}
      <div className="flex justify-between my-1 items-center flex-wrap">
      <Button variant="gradient" onClick={handleViewNotes} size="sm">View Notes</Button>
      {
        !!members.length &&
      <div>
        {members.map(({ profile_picture, full_name }, key) => (
          <Tooltip placement="bottom-end" key={key} content={full_name}>
            <Avatar
              src={profile_picture?.url ? profile_picture?.url : '/img/placeholder-avatar.webp'}
              alt={full_name}
              size="sm"
              variant="circular"
              className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                }`}
            />
          </Tooltip>
        ))}
      </div>
      }
      </div>
    </Card>
  )
}

export default CourseCard
