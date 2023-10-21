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
  router.delete("/deleteTeam", authMiddleware, RegisteredUserController.deleteTeam);
  router.post("/createTeam", authMiddleware, RegisteredUserController.createTeam);
  router.post("/updateTeamName", authMiddleware, RegisteredUserController.updateTeamName);

  return router;
};