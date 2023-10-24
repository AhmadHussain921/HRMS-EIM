require("dotenv").config();
const express = require("express");
const request = require("supertest");
const departmentRoute = require("../routes/departmentRoute");
const userRoutes = require("../routes/userRoutes");

const { connectDB } = require("../config/db");
const { beforeEach } = require("node:test");
const app = express();
app.use(express.json());
connectDB();
app.use("/", userRoutes);
app.use("/department", departmentRoute);

let token = "";
describe("Good Department Routes", function () {
  const AdminData = {
    name: "raza",
    email: "raza@gmail.com",
    password: "1234",
    type: 1,
  };
  const departmentData = {
    name: "Full Stack department",
    email: "fs@gmail.com",
    contact: "031111111",
    description: "this is marketing department.",
  };

  test("get token", async () => {
    const loginUser = await request(app)
      .post("/login")
      .send({ email: AdminData.email, password: AdminData.password });
    expect(loginUser.statusCode).toBe(201);
    token = await loginUser.body.token;
  });

  test("add department by admin", async () => {
    const resWithToken = await request(app)
      .post("/department/add")
      .send(departmentData)
      .set("Authorization", `Bearer ${token}`);
    expect(resWithToken.statusCode).toBe(201);
  });

  test("get all dept by admin", async () => {
    const resWithToken = await request(app)
      .get("/department")
      .set("Authorization", `Bearer ${token}`);
    expect(resWithToken.statusCode).toBe(200);
  });
});
