const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware")

module.exports = function({ RegisteredUserController }) {
  const router = Router();

  // Registered User Management Routes
  router.get("", authMiddleware, RegisteredUserController.get);
  router.patch("", authMiddleware, RegisteredUserController.update);
  router.delete("", authMiddleware, RegisteredUserController.delete);

  // Team management routes

  //body { "team_name": "Los teamos" }
  router.post("/createTeam", authMiddleware, RegisteredUserController.createTeam);
  //sin body
  router.get("/getTeam", authMiddleware, RegisteredUserController.getTeamByUserId);
  //body {"requested_email": "prueba@email.com"}
  router.post("/addMember", authMiddleware, RegisteredUserController.addMember);
  router.post("/removeMember", authMiddleware, RegisteredUserController.removeMember);
  //body {"team_name": "Los teamos", "new_team_name": "Los Teamos 2.0"}
  router.patch("/updateTeamName", authMiddleware, RegisteredUserController.updateTeamName);
  // sin body
  router.delete("/deleteTeam", authMiddleware, RegisteredUserController.deleteTeam);

  // Team request management routes
  // body {"team_name": "Los teamos"}
  router.post("/createTeamRequest", authMiddleware, RegisteredUserController.createTeamRequest);
  // body { "requested_email": "email@email.com", "status": true }
  router.patch("/manageTeamRequest", authMiddleware, RegisteredUserController.manageTeamRequest);

  // sin body
  // devuelve todas las requests de un equipo si eres lider
  // si no devuelve todas las requests que tu haz hecho a otros equipos
  router.get("/getTeamRequests", authMiddleware, RegisteredUserController.getTeamRequests);

  return router;
};