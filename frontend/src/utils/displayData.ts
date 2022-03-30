export const eventCategoryCode = {
    meeting: "meeting",
    tech: "tech",
    meetup: "meetup",
} as const;

export const eventCategory = {
    [eventCategoryCode.meeting]: "会議",
    [eventCategoryCode.tech]: "技術",
    [eventCategoryCode.meetup]: "交流",
} as const;

export type EventCategoryType = keyof typeof eventCategoryCode;
