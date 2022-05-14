import * as MUI from "@mui/material";
import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { FetchEventContext } from "../../common/FetchEventProvider";
import { BaseCategoryProps } from "../../types/connection";
import { defDrawerWidth } from "../../utils/definitions";
import {
    eventCategoryCode,
    EventCategoryObjectType,
    EventCategoryType,
} from "../../utils/displayData";
import { COLOR } from "../../utils/styling";

type CategorizedEventListType = {
    name: string;
    code: string;
    count?: number;
};

export const data: EventCategoryObjectType[] = [
    {
        [eventCategoryCode.meeting]: 1,
        [eventCategoryCode.tech]: 3,
        [eventCategoryCode.meetup]: 2,
    },
];
// TODO: 細かい表示調整
/**右サブDrawerに表示されるイベント分布のbar chartコンポーネント*/
export const EventChart = React.memo(() => {
    const { event, category } = React.useContext(FetchEventContext);

    const categorizedEventList: CategorizedEventListType[] = React.useMemo(
        () =>
            // カテゴリIDごとにカウントアップし分配する
            event?.data?.reduce((acc: Record<number, CategorizedEventListType>, cur) => {
                const tmp: BaseCategoryProps | undefined = category?.data?.find(
                    (v) => cur.categoryId === v.id
                );
                return tmp
                    ? {
                          ...acc,
                          [tmp.id]: {
                              name: tmp.name,
                              code: tmp.categoryCode,
                              count: acc?.[tmp.id]?.count
                                  ? Number(acc?.[tmp.id]?.count) + 1
                                  : 1,
                          },
                      }
                    : { ...cur };
            }, {} as CategorizedEventListType),
        [event?.data]
    ) as CategorizedEventListType[];

    return (
        <MUI.Box margin="3em 0" position="relative">
            {/* TODO: うまく虹色になるように配色 */}
            <MUI.Typography variant="h6">イベント分布(虹色にしたい)</MUI.Typography>
            {/* Stacked Bar Chart を表示する */}
            <BarChart
                width={defDrawerWidth.subMain - 25}
                height={80}
                layout="vertical"
                data={data}
                margin={{ top: 0, left: -20, right: 20, bottom: 0 }}
                // style={{ position: "absolute" }}
            >
                {/* Tooltip  legendに関しては不要そうなので一旦非表示 */}
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
                {/* Bar Chart を生成 */}
                {category?.data?.map((datum, idx) => (
                    <Bar
                        dataKey={eventCategoryCode.meeting}
                        stackId="userEventId"
                        fill={COLOR[datum.categoryCode as EventCategoryType]}
                    />
                ))}
            </BarChart>
            {/* Legend部分 */}
            <MUI.Box sx={{ position: "absolute", bottom: "-1em" }}>
                {Object.values(categorizedEventList ?? []).map((datum, idx) => (
                    <MUI.Typography key={`${idx}`} variant="caption">
                        {`${datum?.name} : ${datum?.count ?? 0}, `}
                    </MUI.Typography>
                ))}
            </MUI.Box>
        </MUI.Box>
    );
});
