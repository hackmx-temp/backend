const Router = require("express").Router;

module.exports = function({ EmailController }) {
    const router = Router();
    
    router.post("/sendEmail", EmailController.sendEmailToUser);
    
    return router;
    }