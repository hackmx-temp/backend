const { Router } = require("express");

module.exports = function({ TeamRequestController }) {
  const router = Router();

  //router.get("", TeamRequestController.getAll);
  //router.get("/:teamRequestId", TeamRequestController.get);
  //router.post("", TeamRequestController.create);
  //router.patch("/:teamRequestId", TeamRequestController.update);
  //router.delete("/:teamRequestId", TeamRequestController.delete);

  return router;
};