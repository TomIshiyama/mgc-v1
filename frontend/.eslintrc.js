module.exports = {
    root: true, // プロジェクトのルートに配置していると教えている
    env: {
        es2020: true,
        node: true,
    },
    parser: "@typescript-eslint/parser", // ESLintにTypeScriptを適応
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.eslint.json", "./tsconfig.json"],
    },
    plugins: ["react", "@typescript-eslint"], // TypeScriptプラグインのルールを適用
    extends: [
        "eslint:recommended", //ESLintのJavaScriptルールを適用
        "plugin:@typescript-eslint/recommended", // 型チェックが不要なルールを適用
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "prettier",
    ],
    ignorePatterns: [
        // Storybook の設定フォルダを追加する
        "!.storybook",
    ],
    settings: {
        //  Unable to resolve path to module import/no-unresolvedを防ぐ
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    rules: {
        "import/order": ["error"],
        "no-console": ["error"],
        "no-debugger": ["error"],
        "@typescript-eslint/no-non-null-assertion": "off", // non-null assertionの警告は非表示
    },
};
