module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
        {
            // 👇 The directory field sets the directory your stories
            // directory: "../packages/stories",
            // 👇 The titlePrefix field will generate automatic titles for your stories
            titlePrefix: "MyComponents",
            // 👇 Storybook will load all files that contain the stories extensio
            // files: "*.stories.*",
        },
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/react",
};
