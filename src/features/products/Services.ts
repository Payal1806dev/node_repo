// import { response } from "express";
import {
  IProfileData,
  IUserLogin,
  IUserRegister,
  QueryParams,
  productType,
} from "./interface";
import { ProductModel } from "./Model";
import { UserModel } from "./UserModel";
import EnvConfig from "../../config/envConfig";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const response: {
  message: string;
  data?: any;
  success: boolean;
} = { message: "", success: false };

class productService {
  async getAllProducts() {
    try {
      const product = await ProductModel.find();
      console.log(product);
      return product;
    } catch (error) {
      return "Product not found";
    }
  }

  async addProducts(productData: productType) {
    try {
      const { name, brand, price, category } = productData;
      const product = new ProductModel({
        name,
        brand,
        price,
        category,
      });
      const res = await product.save();
      return res;
    } catch (error) {
      return "Product not added";
    }
  }

  async ProductUpdate(productData: productType, name: string) {
    try {
      const product = await ProductModel.findOneAndUpdate(
        { name },
        productData,
        { new: true }
      );
    } catch (error) {
      return "Product not updated";
    }
    return response;
  }

  async deleteProduct(name: string) {
    try {
      const result = await ProductModel.findOneAndDelete({ name });
      if (result) {
        return "Product deleted successfully";
      } else {
        return "Product not found";
      }
    } catch (error) {
      return "Error deleting product";
    }
  }

  async userRegister(userdata: IUserRegister) {
    try {
      const { username, password, email, dob, gender } = userdata;
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      }); // checks if user already exists or not by email or username beacause both are unique
      if (existingUser) {
        response.success = false;
        response.message = "User already exists";
        return response;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username,
        email,
        password: hashedPassword,
        dob,
        gender,
      });
      const res = await user.save();
      if (res) {
        response.success = true;
        response.message = "User registered successfully";
      } else {
        response.success = false;
        response.message = "User not registered";
      }
    } catch (error) {
      response.success = false;
      response.message = "An error occurred while registering the user";
      console.log(error);
    }
    return response;
  }
  async userLogin(LoginData: IUserLogin) {
    try {
      const { email, password } = LoginData;
      const user = await UserModel.findOne({ email });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const env = EnvConfig();
          const SecretKey = env.secretKey;

          const token = jwt.sign(
            { userEmail: user.email },
            process.env.JWT_SECRET || SecretKey,
            {
              expiresIn: "1h",
            }
          );
          response.success = true;
          response.message = "User logged in successfully";
          const data = {
            token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
            },
          };
          response.data = data;
          return response;
        } else {
          response.success = false;
          response.message = "Invalid password";
          return response;
        }
      } else {
        response.success = false;
        response.message = "User not found";
        return response;
      }
    } catch (error) {}
  }

  async UsernameUpdate(ProfileData: IProfileData, email: string) {
    try {
      const user = await UserModel.findOneAndUpdate({ email }, ProfileData);
      if (user) {
        response.success = true;
        response.message = "User found";
        response.data = user;
        return response;
      } else {
        response.success = false;
        response.message = "User not found";
        response.data = "";
        return response;
      }
    } catch (error) {
      response.success = false;
      response.message = "An error occurred while finding the user";
    }
    return response;
  }

  async Profile(email: string) {
    try {
      const user = await UserModel.findOne(
        { email },
        { username: 1, email: 1, _id: 0, dob: 1, gender: 1 }
      );
      if (user) {
        response.success = true;
        response.message = "User found";
        response.data = user;
        return response;
      } else {
        response.success = false;
        response.message = "User not found";
        return response;
      }
    } catch (error) {
      response.success = false;
      response.message = "An error occurred while finding the user";
    }
    return response;
  }

  async ProfileUpdate(ProfileData: IProfileData, email: string) {
    try {
      const user = await UserModel.findOneAndUpdate({ email }, ProfileData);
      if (user) {
        response.success = true;
        response.message = "User found";
        response.data = user;
        return response;
      } else {
        response.success = false;
        response.message = "User not found";
        return response;
      }
    } catch (error) {
      response.success = false;
      response.message = "An error occurred while finding the user";
    }
    return response;
  }
  async ShowAllUsers({ page, limit, filter }: QueryParams) {
    try {
      const offset = (page - 1) * limit;
      const users = await UserModel.find({ username: new RegExp(filter, "i") })
        // .sort(cre)
        .skip(offset)
        .limit(limit);
      const totalUsers = await UserModel.countDocuments({
        username: new RegExp(filter, "i"),
      });
      return {
        success: true,
        message: "Users found",
        data: users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
      };
    } catch (error) {
      response.success = false;
      response.message = "An error occurred while finding the users";
    }
    return response;
  }
  

  async  findUserById(userId:string) {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            message: "User found",
            data: user,
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while finding the user",
        };
    }
  }
}

export default new productService();
