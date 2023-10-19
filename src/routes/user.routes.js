const { Router } = require("express");
const {AuthMiddleware} = require("../middlewares")

module.exports = function({ UserController }) {
  const router = Router();

  router.get("", UserController.getAll);
  router.get("/find/:userId", UserController.get);
  // Creation API, I preferred to have this API in Auth
  router.post("", UserController.validCreate);
  router.get("/count", UserController.count);
  router.get("/countByCampus/:campus", UserController.countByCampus);
  router.patch("/update/:userId", AuthMiddleware, UserController.update);
  router.delete("/delete/:userId", AuthMiddleware, UserController.delete);

  return router;
};
