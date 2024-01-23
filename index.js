// const http = require("http");
// const server = http.createServer((req, res) => {
//     res.setHeader("Content-Type", "text/html");
//     res.end("OK");
// });

// server.listen("3000", () => console.log("OK 서버 시작"));
const express = require("express");
console.log(express)
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.set({"Content-Type" : "text/html; charset=utf-8"});
    res.end("헬로 expres1s");
});

app.listen(port, ()=>{
    console.log(`START SERVER : use ${port}`);
})
