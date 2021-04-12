const express = require("express");
const { isLoggedIn, logout } = require("../Controller/authController");
const { getHomePage, getLoginPage, getSignupPage, getPlansPage, getResetPasswordPage, getProfilePage } = require("../Controller/viewController");

const viewRouter = express.Router();

//this is all front end work which user sees and pages they go to

viewRouter.use(isLoggedIn);

viewRouter.route("/").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/logout").get(logout)
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/resetpassword/:token").get(getResetPasswordPage);
viewRouter.route("/profile").get(getProfilePage);


module.exports = viewRouter; 