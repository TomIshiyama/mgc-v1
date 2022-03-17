# Miyashita Group Calendar

## 環境構築

-   mysql 起動 以下のどれか

```
brew services start mysql
mysql.server start
mysql.server start --skip-grant-tables
```

-   ログイン

```
mysql --user=root --password
```

-   init_mgc_db.sql をコピペ
    -> GoogleDrive か当プロジェクトのルートディレクトリにある

-   推奨エディタ：VS Code

-   mgc_rest_test.http を REST プラグインをインストールしてからリクエストテストに使えるようになります。
