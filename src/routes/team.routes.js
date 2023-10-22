const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware")

module.exports = function({ TeamController }) {
  const router = Router();

  // Team Management Routes
  router.get("/all", authMiddleware, TeamController.getAll);
  router.get("/completed", authMiddleware, TeamController.getAllCompleted);
  router.get("/id/:teamId", authMiddleware, TeamController.get);
  router.get("/name/:teamName", authMiddleware, TeamController.getByName);

  return router;
};