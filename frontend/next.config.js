// ESLintの設定 eslint-disable を追加する
/* eslint-disable
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/
/** @type {import('next').NextConfig} **/
// @typeを入れておくと、開発環境上で設定項目の確認が出来る

// ANALYZE=true が指定されていた時だけ、bundle-analyzer を実行
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//     enabled: ProcessingInstruction.env.ANALYZE === true,
// });

// module.exports = withBundleAnalyzer({
//     swcMinify: true,
//     reactStrictMode: true,
// });

const config = {
    experimental: {
        swcLoader: true,
        swcMinify: true,
        cpus: 4,
    },
};
module.exports = config;
