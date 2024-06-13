import express from "express";
import {
  Profile,
  ShowAllUsers,
  UpdateProduct,
  UpdateProfile,
  UpdateUsername,
  UserByID,
  UserRegister,
  addProducts,
  deleteProduct,
  getProducts,
  userLogin,
} from "./controller";
import verifyToken from "../../middleware/authMiddlewares";
import HandleErrors from "../../middleware/handleErrors";
import { validationResult } from "express-validator";

import { validate } from "../../middleware/validations";
import { loginSchema, registrationSchema } from "./Validations";
import { validatePathParams, validateQueryParams } from "../../middleware/JoiMiddlewares";
const ProductRouter = express.Router();
ProductRouter.get("/products", getProducts);
ProductRouter.post("/create-products", addProducts);
ProductRouter.put("/update-products", UpdateProduct);
ProductRouter.delete("/delete-products", deleteProduct);
ProductRouter.post("/register", HandleErrors(UserRegister));
ProductRouter.post("/login", HandleErrors(userLogin));
ProductRouter.get("/profile", verifyToken, HandleErrors(Profile));
ProductRouter.put("/profile", verifyToken, HandleErrors(UpdateProfile));
ProductRouter.put(
  "/update-username",
  verifyToken,
  HandleErrors(UpdateUsername)
);
ProductRouter.get("/get-all-users", validateQueryParams ,HandleErrors(ShowAllUsers));
ProductRouter.get("/user/:id", validatePathParams,HandleErrors(UserByID));
export default ProductRouter;
