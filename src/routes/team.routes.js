const { Router } = require("express");

module.exports = function({ TeamController }) {
  const router = Router();

  //router.get("", TeamController.getAll);
  //router.get("/:teamId", TeamController.get);
  //router.post("", TeamController.create);
  //router.patch("/:teamId", TeamController.update);
  //router.delete("/:teamId", TeamController.delete);

  return router;
};