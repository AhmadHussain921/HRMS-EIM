require("dotenv").config();
const express = require("express");
const request = require("supertest");
const personalRoutes = require("../routes/personalRoute");
const userRoutes = require("../routes/userRoutes");
const departmentRoutes = require("../routes/departmentRoute");
const { connectDB, disconnectDB } = require("../config/db");
const app = express();
app.use(express.json());
connectDB();
app.use("/", userRoutes);
app.use("/person", personalRoutes);
app.use("/department", departmentRoutes);
let token = "";
let pid = "";
let singleDepart = {};
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
  const RoleData = {
    name: "Frontend Developer",
    salary: "20000",
    duration: "2 yaer",
  };
  beforeAll((done) => {
    done();
  });

  test("get token", async () => {
    const loginUser = await request(app)
      .post("/login")
      .send({ email: AdminData.email, password: AdminData.password });
    await expect(loginUser.statusCode).toBe(201);
    token = await loginUser.body.token;
  });

  test("add person by admin", async () => {
    const resWithToken = await request(app)
      .post("/person/add")
      .send(PersonData)
      .set("Authorization", `Bearer ${token}`);
    await expect(resWithToken.statusCode).toBe(201);
    pid = await resWithToken.body._id;
  });

  test("get all persons by admin", async () => {
    const resWithToken = await request(app)
      .get("/person")
      .set("Authorization", `Bearer ${token}`);
    await expect(resWithToken.statusCode).toBe(200);
  });
  test("get all departments by admin", async () => {
    const resWithToken = await request(app)
      .get("/department")
      .set("Authorization", `Bearer ${token}`);
    await expect(resWithToken.statusCode).toBe(200);
    singleDepart = resWithToken.body.length > 0 ? resWithToken.body[0] : {};
  });
  afterAll(async () => {
    const resWithToken = await request(app)
      .put(`/person/experience/add?pid=${pid}`)
      .send(ExperienceData)
      .set("Authorization", `Bearer ${token}`);
    await expect(resWithToken.statusCode).toBe(201);
  });
  afterAll(async () => {
    if (singleDepart?._id) {
      const resWithToken = await request(app)
        .put(`/person/department/add?eid=${pid}&did=${singleDepart._id}`)
        .send(RoleData)
        .set("Authorization", `Bearer ${token}`);

      await expect(resWithToken.statusCode).toBe(201);
    } else {
      expect(true).toBe(true);
    }
  });
  afterAll((done) => {
    disconnectDB();
    done();
  });
});