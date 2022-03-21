import React from "react";
import { MainLayout } from "../../../layouts/MainLayout";

export default {
    component: MainLayout,
    title: "MainLayout",
};

const Template = (args: any) => <MainLayout {...args} />;

export const Default = Template.bind({});

// Default.args = {};
