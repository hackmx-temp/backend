const {createContainer, asClass, asValue, asFunction} = require("awilix");

// config
const config = require("../config");
const app = require('.')

// services
const { HomeService, UserService } = require("../services");

// controllers
const { HomeController, UserController  } = require("../controllers");

// routes
const { HomeRoutes, UserRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { User } = require("../models")

// repositories
const { UserRepository } = require("../repositories")

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton()

    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton()

    })
    .register({
        User: asValue(User)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton()
    });

module.exports = container;
