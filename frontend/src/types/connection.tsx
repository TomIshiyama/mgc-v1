export type BaseEventProps = {
    id?: number;
    userId: number;
    categoryId?: number;
    name: string;
    location?: string;
    detail?: string;
    begin: Date;
    end: Date;
    isTemporary: number; // TODO: booleanにしたいがDBの定義修正がいる
    lastUpdate: Date;
    createdDate: Date;
};

export type BaseUserProps = {
    id?: number;
    givenName: string;
    familyName: string;
    givenKana?: string;
    familyKana?: string;
    email: string;
    password: string;
    division: string;
    position: string;
    iconPath?: string;
    iconName?: string;
    description?: string;
    theme: string; // TODO: ほんまは固定値をバックエンドでもつべき
    isAdmin: number; // TODO: booleanにしたいがDBの定義修正がいる
    isStop: number; // TODO: booleanにしたいがDBの定義修正がいる
    lastUpdate?: Date;
};

export type BaseCategoryProps = {
    id: number;
    categoryCode: string;
    name: string;
};

export type BaseAttendeeProps = {
    userId?: number;
    eventId: number;
    lastUpdate?: Date;
    createdDate?: Date;
};

// WARNING: 徐々に変わりつつあるので未使用
export type ResponseEventProps = {
    list: BaseEventProps[];
};

export type ResponseBaseUserProps = {
    list: BaseUserProps[];
};

export type ResponseCategoryProps = {
    list: BaseCategoryProps[];
};

export type ResponseAttendeeProps = {
    list: BaseAttendeeProps[];
};
