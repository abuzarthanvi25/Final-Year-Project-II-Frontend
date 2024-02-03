import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";

const CustomTable = ({columns = [], rows = [], tableTitle =''}) => {
    return (
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
            >
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        {tableTitle}
                    </Typography>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {columns.map(
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
                        {rows.map(
                            ({ title, members, completion }, key) => {
                                const className = `py-3 px-5 ${key === rows.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                    }`;

                                return (
                                    <tr key={key}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography
                                                    variant="paragraph"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {title}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            {members.map(({ profile_picture, full_name }, key) => (
                                                <Tooltip key={key} content={full_name}>
                                                    <Avatar
                                                        src={profile_picture ? profile_picture?.url : ''}
                                                        alt={full_name}
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
                                                    {Math.round(Math.random() * 100).toString()}%
                                                </Typography>
                                                <Progress
                                                    value={Math.round(Math.random() * 100)}
                                                    variant="gradient"
                                                    color={Math.round(Math.random() * 100).toString() === 100 ? "green" : "blue"}
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
    )
}

export default CustomTable
