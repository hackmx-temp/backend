const { Router } = require("express");

module.exports = function({ AuthController }) {
  const router = Router();

  router.post("/signup", AuthController.signUp);
  router.post("/login", AuthController.logIn);
  router.post("/verifyJWT", AuthController.verifyJWT);
  router.patch("/resetPassword", AuthController.resetPassword);

  return router;
};
