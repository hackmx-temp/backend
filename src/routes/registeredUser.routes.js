const { Router } = require("express");

module.exports = function({ RegisteredUserController }) {
  const router = Router();

  router.get("", RegisteredUserController.getAll);
  router.get("/:registeredUserId", RegisteredUserController.get);
  router.post("", RegisteredUserController.create);
  router.patch("/:registeredUserId", RegisteredUserController.update);
  router.delete("/:registeredUserId", RegisteredUserController.delete);

  return router;
};