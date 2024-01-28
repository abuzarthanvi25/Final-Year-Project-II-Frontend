import { truncateString } from "@/utils/helpers";
import CustomAvatar from "../../components/custom-avatar/index"
import { Typography } from '@mui/material';
import { Tooltip } from "@material-tailwind/react";

export function MessageCard({ profile_picture, full_name = '', bio = '', action }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <CustomAvatar sx={{ borderRadius: '10px' }} src={profile_picture?.url} name={full_name} className={"shadow-lg shadow-blue-gray-500/25"} />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {full_name}
          </Typography>
          <Tooltip placement="top-start" content={<div className="w-80">{bio}</div>}>
            <Typography className="text-xs font-normal text-blue-gray-400">
              {truncateString(bio, 55)}
            </Typography>
          </Tooltip>
        </div>
      </div>
      {action}
    </div>
  );
}

MessageCard.displayName = "/src/widgets/cards/message-card.jsx";

export default MessageCard;
