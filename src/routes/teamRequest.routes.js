const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function({ TeamRequestController }) {
  const router = Router();

  router.get("/:teamRequestId", TeamRequestController.get);
  router.get("", authMiddleware,TeamRequestController.getAll);
  //router.get("forTeam/:teamId", TeamRequestController.get);
  //router.get("user/", authMiddleware, TeamRequestController.get);

  //router.post("", TeamRequestController.create);
  //router.patch("/:teamRequestId", TeamRequestController.update);
  //router.delete("/:teamRequestId", TeamRequestController.delete);

  return router;
};