import { Avatar, Button, Card, Tooltip, Typography } from "@material-tailwind/react"
import "./course-card.css"

const CourseCard = ({title = 'Lorem ipsum dolor .', type = 'Lorem ipsum',description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem iure consequatur aperiam fugiat ipsam! Voluptatum illo accusamus inventore esse aut.' , members = [
  { img: "", full_name: "Romina Hadid" },
  { img: "/img/team-2.jpeg", full_name: "Ryan Tompson" },
  { img: "/img/team-3.jpeg", full_name: "Jessica Doe" },
  { img: "/img/team-4.jpeg", full_name: "Alexander Smith" },
  { img: "/img/team-4.jpeg", full_name: "Alexander Smith" },
], handleViewNotes = () => {}}) => {
  return (
    <Card className="image-wrapper shadow-2xl">
      <Typography className="text-4xl font-bold text-gray-800 mt-2">{title}</Typography>
      <Typography className="text-xs text-gray-800 mb-1">{type}</Typography>
      <Typography className="font-normal text-black my-1">{description}</Typography>
      {!!members.length && <Typography className="text-xs font-extrabold text-gray-900 mr-2 text-right">Members</Typography>}
      <div className="flex justify-between my-1 items-center flex-wrap">
      <Button onClick={handleViewNotes} size="sm">View Notes</Button>
      {
        !!members.length &&
      <div>
        {members.map(({ img, full_name }, key) => (
          <Tooltip placement="bottom-end" key={key} content={full_name}>
            <Avatar
              src={img ? img : '/img/placeholder-avatar.webp'}
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
