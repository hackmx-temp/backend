const { Router } = require("express");

module.exports = function ({ PasswordResetTokenController }) {
    const router = Router();

    router.post("/validate", PasswordResetTokenController.validate);

    return router;
}