const {createContainer, asClass, asValue, asFunction} = require("awilix");

// config
const config = require("../config");
const app = require('.')

// services
const {
    HomeService,
    UserService,
    AuthService,
    RegisteredUserService,
    TeamService,
    TeamRequestService
 } = require("../services");

// controllers
const {
    HomeController,
    UserController,
    AuthController,
    RegisteredUserController,
    TeamController,
    TeamRequestController
} = require("../controllers");

// routes
const {
    HomeRoutes,
    UserRoutes,
    AuthRoutes,
    RegisteredUserRoutes,
    TeamRoutes,
    TeamRequestRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const {
    User,
    RegisteredUser,
    Team,
    TeamRequest
} = require("../models")

// repositories
const {
    UserRepository,
    RegisteredUserRepository,
    TeamRepository,
    TeamRequestRepository
} = require("../repositories")

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        RegisteredUserService: asClass(RegisteredUserService).singleton(),
        TeamService: asClass(TeamService).singleton(),
        TeamRequestService: asClass(TeamRequestService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        RegisteredUserController: asClass(RegisteredUserController.bind(RegisteredUserController)).singleton(),
        TeamController: asClass(TeamController.bind(TeamController)).singleton(),
        TeamRequestController: asClass(TeamRequestController.bind(TeamRequestController)).singleton(),
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        RegisteredUserRoutes: asFunction(RegisteredUserRoutes).singleton(),
        TeamRoutes: asFunction(TeamRoutes).singleton(),
        TeamRequestRoutes: asFunction(TeamRequestRoutes).singleton()
    })
    .register({
        User: asValue(User),
        RegisteredUser: asValue(RegisteredUser),
        Team: asValue(Team),
        TeamRequest: asValue(TeamRequest)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        RegisteredUserRepository: asClass(RegisteredUserRepository).singleton(),
        TeamRepository: asClass(TeamRepository).singleton(),
        TeamRequestRepository: asClass(TeamRequestRepository).singleton()
    });

module.exports = container;
