# Miyashita Group Calendar (MGC)

## 概要

Miyashita Group Calendar（以降は MGC）とは以前グループ開発のアクションプランとして作り始まったウェブアプリケーションです。アクションプランプランの実施中にカレンダーが完了になれず、中途半端な状態で残りましたが、元々のグループメンバの希望により開発が復活になりました。
MGC は次の機能を持っているアプリケーション：

-   ユーザー登録機能
-   イベント検索機能
-   イベント仮登録機能
-   ユーザー情報とイベント情報の修正機能
-   UI テーマ選択機能

## 言語

-   Next.js(React, TypeScript)
-   Express
-   MySQL

## ライブラリ

-   Material-UI
-   FullCalendar
-   react-hook-form

## Git

-   https://github.com/ishiyama-tomoki-work/mgc-v1

## PM

-   https://tomishiyama.atlassian.net/jira/software/projects/MGC/issues/

## インストール

1. EDI もしくはエディターをインストールします
   例：https://code.visualstudio.com/

2. Node.js をインストールする
   https://nodejs.org/en/

3. 新規プロジェクトフォルダ（MGC-V1）を作成し、エディター（EDI）で開き、Git レポジトリーを作成する：
   git init

4. PJ レポジトリーへプールリクエストをする：
   git pull https://github.com/ishiyama-tomoki-work/mgc-v1.git main

5. npm install で必要なモジュール（ライブラリ）をダウンロードする

## 起動

-   npm run dev でクライアント起動をする

## License

-   GNU AGPLv3
    https://choosealicense.com/licenses/agpl-3.0/
