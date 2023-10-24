require("dotenv").config();
const express = require("express");
const request = require("supertest");
const userRoutes = require("../routes/userRoutes");
const { connectDB } = require("../config/db");
const app = express();
app.use(express.json());
connectDB();
app.use("/", userRoutes);
let token = "";
describe("Good User Routes", function () {
  const AdminData = {
    name: "raza",
    email: "raza@gmail.com",
    password: "1234",
    type: 1,
  };
  test("responds to without token", async () => {
    const resWithoutToken = await request(app).get("/");
    expect(resWithoutToken.statusCode).toBe(401);
  });
  test("register user", async () => {
    const registerUser = await request(app).post("/register").send(AdminData);
    expect(registerUser.statusCode).toBe(201);
  });
  test("login user", async () => {
    const loginUser = await request(app)
      .post("/login")
      .send({ email: AdminData.email, password: AdminData.password });
    expect(loginUser.statusCode).toBe(201);
    token = await loginUser.body.token;
  });
  test("get all users user", async () => {
    const resWithToken = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`);
    expect(resWithToken.statusCode).toBe(200);
  });
});
