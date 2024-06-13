import express from "express";
import productService from "./Services";
import { CustomRequest } from "../../middleware/authMiddlewares";
export const getProducts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const result = await productService.getAllProducts();
    console.log(result);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
};

export const addProducts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { name, brand, price, category } = request.body;
    const productData = { name, brand, price, category };
    const result = await productService.addProducts(productData);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
};

export const UpdateProduct = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { name, brand, category, price } = request.body;
    const ProductData = { name, brand, category, price };

    const result = await productService.ProductUpdate(ProductData, name);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
};

export const deleteProduct = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { name } = request.body;
    if (!name) {
      throw "Product name is required for deletion";
    }
    const result = await productService.deleteProduct(name);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
};
export const UserRegister = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { username, email, password, dob, gender } = request.body;
    const registerData = { username, email, password, dob, gender };
    const result = await productService.userRegister(registerData);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
};

export const userLogin = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { email, password } = request.body;
    const LoginData = { email, password };
    const result = await productService.userLogin(LoginData);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json(error);
  }
};

export const UpdateUsername = async (
  request: CustomRequest,
  response: express.Response
) => {
  try {
    // console.log(request.userEmail)
    if (!request.userEmail) {
      return response.status(400).json({ message: "Invalid Token" });
    }
    const { username, dob, gender, email } = request.body;
    const profileData = { username, dob, gender, email };
    // console.log(request.userEmail as string);
    const result = await productService.UsernameUpdate(
      profileData,
      request.userEmail as string
    );
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: "Error In code" });
  }
};
export const ShowAllUsers = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { page = 1, limit = 10, filter = "" } = request.query;
    const result = await productService.ShowAllUsers({
      page: parseInt(page as string),
      limit: parseInt(limit as string),

      filter: filter as string,
    });
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: "Error In code" });
  }
};

export const UserByID = async (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  console.log("req.params: ", req.params);

  try {
    const result = await productService.findUserById(userId);
    console.log("userId: ", userId);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("Error in getUserByIdController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Profile = async (
  request: CustomRequest,
  response: express.Response
) => {
  try {
    console.log(request.userEmail);
    if (!request.userEmail) {
      return response.status(400).json({ message: "Invalid Token" });
    }

    const result = await productService.Profile(request.userEmail as string);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: "Invalid Token" });
  }
};

export const UpdateProfile = async (
  request: CustomRequest,
  response: express.Response
) => {
  try {
    console.log(request.userEmail);
    if (!request.userEmail) {
      return response.status(400).json({ message: "Invalid Token" });
    }
    const { username, dob, gender, email } = request.body;
    const profileData = { username, dob, gender, email };
    console.log(request.userEmail as string);
    const result = await productService.ProfileUpdate(
      profileData,
      request.userEmail as string
    );
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: "Error In code" });
  }
};
