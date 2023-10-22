const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware")

module.exports = function({ RegisteredUserController }) {
  const router = Router();

  //router.get("", RegisteredUserController.getAll);
  //router.get("/:registeredUserId", RegisteredUserController.get);
  //router.patch("/:registeredUserId", RegisteredUserController.update);
  //router.delete("/:registeredUserId", RegisteredUserController.delete);
  // router.post("", RegisteredUserController.create);
  router.delete("", authMiddleware, RegisteredUserController.delete);

  // Team management routes
  router.delete("/deleteTeam", authMiddleware, RegisteredUserController.deleteTeam);
  router.post("/createTeam", authMiddleware, RegisteredUserController.createTeam);
  router.patch("/updateTeamName", authMiddleware, RegisteredUserController.updateTeamName);

  // Team request management routes
  router.post("/createTeamRequest", authMiddleware, RegisteredUserController.createTeamRequest);
  router.patch("/manageTeamRequest", authMiddleware, RegisteredUserController.manageTeamRequest);

  return router;
};