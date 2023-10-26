const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({
    HomeRoutes,
    UserRoutes,
    AuthRoutes,
    RegisteredUserRoutes,
    TeamRoutes,
    TeamRequestRoutes,
    EmailRoutes,
    PasswordResetTokenRoutes
}){
    const router = express.Router()
    const apiRoutes = express.Router();
    const corsOptions = {
        origin: ['https://www.hackmx.mx', 'https://hackmx.mx'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      };
      
    apiRoutes
        .use(express.json())
        .use(cors(corsOptions))
        .use(helmet())
        .use(compression())

    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    apiRoutes.use("/registeredUser", RegisteredUserRoutes);
    apiRoutes.use("/team", TeamRoutes);
    apiRoutes.use("/teamRequest", TeamRequestRoutes);
    apiRoutes.use("/email", EmailRoutes);
    apiRoutes.use("/passwordResetToken", PasswordResetTokenRoutes);

    router.use("/hackMX", apiRoutes);
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
};
