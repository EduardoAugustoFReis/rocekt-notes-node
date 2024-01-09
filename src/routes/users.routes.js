const {Router, request} = require("express"); // importar express
const multer = require("multer");
const uploadConfig = require("../configs/uploads");

const UserController = require("../controllers/userController"); // importar classe UserControler
const UserAvatarController = require("../controllers/userAvatarController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router(); // inicializar express
const upload = multer(uploadConfig.MULTER);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes;