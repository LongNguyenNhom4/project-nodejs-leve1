const fs = require("fs");
const http = require("http");
const url = require("url");

const dataUsersJSON = fs.readFileSync("./data.json", "utf-8");
const dataUsers = JSON.parse(dataUsersJSON);
const tempUser = fs.readFileSync(
  `${__dirname}/templates/template-user.html`,
  "utf-8"
);
const tempUserItem = fs.readFileSync(
  `${__dirname}/templates/template-user-item.html`,
  "utf-8"
);

//---function
const dumpDataUser = require("./modules/dumpDataUser");

const server = http.createServer((req, res) => {
  //   const pathName = req.url;
  const { pathname, query } = url.parse(req.url);
  if (pathname === "/user") {
    console.log(query);
    const user = dataUsers
      .map((user) => dumpDataUser(tempUserItem, user))
      .join("");
    const output = tempUser.replace("{%USER_ITEM%}", user);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(output);
  }
});

server.listen(8000, "localhost", () => {
  console.log("Listenning from server");
});
