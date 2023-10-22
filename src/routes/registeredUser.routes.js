const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware")

module.exports = function({ RegisteredUserController }) {
  const router = Router();

  // Registered User Management Routes
  router.get("", authMiddleware, RegisteredUserController.get);
  router.patch("", authMiddleware, RegisteredUserController.update);
  router.delete("", authMiddleware, RegisteredUserController.delete);

  // Team management routes
  router.post("/createTeam", authMiddleware, RegisteredUserController.createTeam);
  router.patch("/updateTeamName", authMiddleware, RegisteredUserController.updateTeamName);
  router.delete("/deleteTeam", authMiddleware, RegisteredUserController.deleteTeam);

  // Team request management routes
  router.post("/createTeamRequest", authMiddleware, RegisteredUserController.createTeamRequest);
  router.patch("/manageTeamRequest", authMiddleware, RegisteredUserController.manageTeamRequest);
  router.get("/getTeamRequests", authMiddleware, RegisteredUserController.getTeamRequests);

  return router;
};