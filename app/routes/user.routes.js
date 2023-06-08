const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/user", [authJwt.verifyToken], async(req, res) => {
        console.log(req.query);
        const response = await controller.getByName(req.query.barber);
        console.log('response: ');
        console.log(response);
        res.status(200).send(response);
    });

    // app.get(
    //     "/api/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};
