const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../../index.js").app;
const authController = require("../auth.controller.js");

afterEach(async () => {
    await authController.cleanUpUsers();
});

describe("Suite de pruebas auth", () => {
    it("should return 401 when no jwt token avaliable", (done) => {
        chai.request(app)
            .get("/admin")
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it("should return 200 when jwt token provided", (done) => {
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application-json")
            .send({ user: "Sa4dUs", password: "2702" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get("/admin")
                    .set("Authorization", `JWT ${res.body.token}`)
                    .end((err, res) => {
                        console.log(res)
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});
