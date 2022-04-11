const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const get = require("./api/get");
const post = require("./api/post");
const put = require("./api/put");
const del = require("./api/delete");
const humps = require("humps");
//For Ishiyama san:
//起動のためにexpressのインストールが必須
//user, event,attendee,categoryが入っているURLだけでハンドリングをして、該当のAPIを呼び出して、APIに引数を渡せます。引数は今のところURLですが、本来ならばリクエストボディーです。

app.use(express.json(), cors());
app.route(/(users|events|attendees|categories|login|filter)\?*/)
    .get((req, res) => {
        get(req)
            .then((result) => {
                res.send(humps.camelizeKeys(result));
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .post((req, res) => {
        console.log("body in index: ", req.body);
        post(req)
            .then((result) => {
                res.send(humps.camelizeKeys(result));
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .put((req, res) => {
        console.log("request: ", req);
        put(req)
            .then((result) => {
                console.log("Connection successfully");
                res.send(humps.camelizeKeys(result));
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .delete((req, res) => {
        console.log("request: ", req);
        del(req)
            .then((result) => {
                console.log("Connection successfully");
                res.send(humps.camelizeKeys(result));
            })
            .catch((err) => {
                res.send(err);
            });
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//TODO: 担当のAPIを作る
//TODO: routeハンドリングを改善する
