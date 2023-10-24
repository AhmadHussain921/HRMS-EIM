require("dotenv").config();
const express = require("express");
const request = require("supertest");
const personalRoutes = require("../routes/personalRoute");
const userRoutes = require("../routes/userRoutes");
const { connectDB } = require("../config/db");
const app = express();
app.use(express.json());
connectDB();
app.use("/", userRoutes);
app.use("/person", personalRoutes);
let token = "";
let pid = "";
describe("Good Person Routes", function () {
  const AdminData = {
    name: "raza",
    email: "raza@gmail.com",
    password: "1234",
    type: 1,
  };
  const PersonData = {
    name: "Raza",
    email: "raza@gmail.com",
    address: "G13 street no 128",
    contact: "03111111111",
    dob: "30 oct 2001",
  };
  const ExperienceData = {
    skills: [
      {
        name: "Responsive Web Design",
        duration: "3 years",
        confidence: "89%",
      },
      {
        name: "MERN Stack",
        duration: "4 years",
        confidence: "99%",
      },
    ],
    trainings: [
      {
        name: "Machine Learning Specialization",
        instituteName: "Stanford Online",
        description: "This was good",
        duration: "6 month",
        outcomes: "I was able to get info",
      },
    ],
    prevJobs: [
      {
        name: "Internee",
        companyName: "Axpert Solutions",
        companyContact: "34562727",
        salary: "238889",
      },
    ],
  };

  test("get token", async () => {
    const loginUser = await request(app)
      .post("/login")
      .send({ email: AdminData.email, password: AdminData.password });
    expect(loginUser.statusCode).toBe(201);
    console.log("Logged in user is ", loginUser.body);
    token = await loginUser.body.token;
    pid = await loginUser.body._id;
  });

  test("add person by admin", async () => {
    const resWithToken = await request(app)
      .post("/person/add")
      .send(PersonData)
      .set("Authorization", `Bearer ${token}`);
    expect(resWithToken.statusCode).toBe(201);
  });

  test("get all the by admin", async () => {
    const resWithToken = await request(app)
      .get("/person")
      .set("Authorization", `Bearer ${token}`);
    expect(resWithToken.statusCode).toBe(200);
  });
  // afterAll("adding experience in the person", async () => {
  //   const resWithToken = await request(app)
  //     .put(`/person/experience/add?pid=${pid}`)
  //     .send(ExperienceData)
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(resWithToken.statusCode).toBe(201);
  // });
  // afterAll("adding person to department", async () => {
  //   const resWithToken = await request(app)
  //     .post(`/person/department/add?pid=${pid}`)
  //     .send(ExperienceData)
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(resWithToken.statusCode).toBe(201);
  // });
});
