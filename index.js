const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Sourav", phone: 7256327, email: "email1@mail.com" },
  { id: 2, name: "Rahat", phone: 7256327, email: "email2@mail.com" },
  { id: 3, name: "Priyo", phone: 7256327, email: "email3@mail.com" },
];

app.get("/", (req, res) => {
  res.send("Hello ExpressJS Hi!");
});

app.get("/users", (req, res) => {
  console.log("Query : ", req.query);
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter((user) => user.name.toLowerCase().includes(search));
    res.send(matched);
  } else {
    res.send(users);
  }
});

app.post("/user", (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
  console.log(req.body, user.id);
});

app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let user = users.find((u) => {
    u.id == id;
  });
  res.send(user);
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
