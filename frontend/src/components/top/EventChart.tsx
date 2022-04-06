import * as MUI from "@mui/material";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { defDrawerWidth } from "../../utils/definitions";
import {
    eventCategory,
    eventCategoryCode,
    EventCategoryObjectType,
    EventCategoryType,
} from "../../utils/displayData";
import { COLOR } from "../../utils/styling";

const data: EventCategoryObjectType[] = [
    {
        [eventCategoryCode.meeting]: 1,
        [eventCategoryCode.tech]: 3,
        [eventCategoryCode.meetup]: 2,
    },
];
// TODO: 細かい表示調整
/**右サブDrawerに表示されるイベント分布のbar chartコンポーネント*/
const EventChart = () => {
    return (
        <MUI.Box margin="3em 0" position="relative">
            <MUI.Typography variant="h6">イベント分布</MUI.Typography>
            <BarChart
                width={defDrawerWidth.subMain - 25}
                height={80}
                layout="vertical"
                data={data}
                margin={{ top: 0, left: -20, right: 20, bottom: 0 }}
                // style={{ position: "absolute" }}
            >
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    tickMargin={0}
                />
                <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    tickMargin={0}
                />
                {/* //FIXME: カテゴリは追加される可能性があるので動的にコンテンツを作る*/}
                <Bar
                    dataKey={eventCategoryCode.meeting}
                    stackId="userEventId"
                    fill={COLOR.meeting}
                />
                <Bar
                    dataKey={eventCategoryCode.tech}
                    stackId="userEventId"
                    fill={COLOR.tech}
                />
                <Bar
                    dataKey={eventCategoryCode.meetup}
                    stackId="userEventId"
                    fill={COLOR.meetup}
                />
            </BarChart>
            {/* // カテゴリが追加されることを考慮しイテレーションで */}
            {/* as [EventCategoryType,number] */}
            <MUI.Box sx={{ position: "absolute", bottom: "0.5em" }}>
                {Object.entries(data[0]).map(([key, val], idx) => (
                    <MUI.Typography key={`${idx}`} variant="caption">
                        {`${eventCategory[key as EventCategoryType]} : ${val} `}
                    </MUI.Typography>
                ))}
            </MUI.Box>
        </MUI.Box>
    );
};
export default EventChart;
// NOTE: default export でないと dynamic componentが使用できないぽい？
