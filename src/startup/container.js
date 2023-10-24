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
    TeamRequestService,
    EmailService,
    PasswordResetTokenService
 } = require("../services");

// controllers
const {
    HomeController,
    UserController,
    AuthController,
    RegisteredUserController,
    TeamController,
    TeamRequestController,
    EmailController,
    PasswordResetTokenController
} = require("../controllers");

// routes
const {
    HomeRoutes,
    UserRoutes,
    AuthRoutes,
    RegisteredUserRoutes,
    TeamRoutes,
    TeamRequestRoutes,
    EmailRoutes,
    PasswordResetTokenRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const {
    User,
    RegisteredUser,
    Team,
    TeamRequest,
    PasswordResetToken
} = require("../models")

// repositories
const {
    UserRepository,
    RegisteredUserRepository,
    TeamRepository,
    TeamRequestRepository,
    PasswordResetTokenRepository
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
        TeamRequestService: asClass(TeamRequestService).singleton(),
        EmailService: asClass(EmailService).singleton(),
        PasswordResetTokenService: asClass(PasswordResetTokenService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        RegisteredUserController: asClass(RegisteredUserController.bind(RegisteredUserController)).singleton(),
        TeamController: asClass(TeamController.bind(TeamController)).singleton(),
        TeamRequestController: asClass(TeamRequestController.bind(TeamRequestController)).singleton(),
        EmailController: asClass(EmailController.bind(EmailController)).singleton(),
        PasswordResetTokenController: asClass(PasswordResetTokenController.bind(PasswordResetTokenController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        RegisteredUserRoutes: asFunction(RegisteredUserRoutes).singleton(),
        TeamRoutes: asFunction(TeamRoutes).singleton(),
        TeamRequestRoutes: asFunction(TeamRequestRoutes).singleton(),
        EmailRoutes: asFunction(EmailRoutes).singleton(),
        PasswordResetTokenRoutes: asFunction(PasswordResetTokenRoutes).singleton()
    })
    .register({
        User: asValue(User),
        RegisteredUser: asValue(RegisteredUser),
        Team: asValue(Team),
        TeamRequest: asValue(TeamRequest),
        PasswordResetToken: asValue(PasswordResetToken)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        RegisteredUserRepository: asClass(RegisteredUserRepository).singleton(),
        TeamRepository: asClass(TeamRepository).singleton(),
        TeamRequestRepository: asClass(TeamRequestRepository).singleton(),
        PasswordResetTokenRepository: asClass(PasswordResetTokenRepository).singleton()
    });

module.exports = container;
