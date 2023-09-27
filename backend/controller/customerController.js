import Customer from "../model/customerSchema.js";
import User from "../model/userSchema.js";
import csv from "csv-parser";
import fs from "fs";

export const addCustomer = async (request, response) => {
  try {
    const newCustomer = await Customer.create({
      ...request.body,
      user: request.user._id,
    });
    await newCustomer.save();
    return response.status(200).json(newCustomer);
  } catch (error) {
    return response.status(500).json({ error: "Failed to add customer" });
  }
};

export const getAllCustomers = async (request, response) => {
  try {
    if (request.user.userRole === "admin") {
      const customers = await Customer.find().sort({
        createdAt: -1,
      });
      return response.status(200).json(customers);
    } else {
      const customers = await Customer.find({ user: request.user._id }).sort({
        createdAt: -1,
      });
      return response.status(200).json(customers);
    }
  } catch (error) {
    return response.status(500).json({ error: "Failed to get all customers" });
  }
};

export const getSingleCustomer = async (request, response) => {
  try {
    const customerId = request.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return response.status(400).json({ error: "Customer not found" });
    }
    const user = await User.findById(request.user._id);
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }
    const customerUserId = customer.user; // MongoDB ObjectID from customer document
    const loggedInUserId = user._id; // MongoDB ObjectID from user document
    // Make sure the logged-in user matches the customer user
    if (!customerUserId.equals(loggedInUserId)) {
      return response.status(401).json({ error: "User not authorized" });
    }
    return response.status(200).json(customer);
  } catch (error) {
    return response.status(500).json({ error: "Failed to get customer" });
  }
};

export const updateCustomer = async (request, response) => {
  try {
    const customerId = request.params.id;
    const customer = await Customer.findById(request.params.id);
    const user = await User.findById(request.user._id);
    // Check for user
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }
    const customerUserId = customer.user; // MongoDB ObjectID from customer document
    const loggedInUserId = user._id; // MongoDB ObjectID from user document
    // Make sure the logged in user matches the customer user
    if (!customerUserId.equals(loggedInUserId)) {
      return response.status(401).json({ error: "User not authorized" });
    }
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: customerId },
      request.body,
      {
        new: true,
      }
    );
    if (updatedCustomer) {
      return response.status(200).json(updatedCustomer);
    } else {
      return response.status(404).json({ error: "Customer not updated" });
    }
  } catch (error) {
    return response.status(500).json({ error: "Failed to update customer" });
  }
};

export const deleteCustomer = async (request, response) => {
  try {
    const customerId = request.params.id;
    const customer = await Customer.findById(request.params.id);
    const user = await User.findById(request.user._id);
    // Check for user
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }
    const customerUserId = customer.user; // MongoDB ObjectID from customer document
    const loggedInUserId = user._id; // MongoDB ObjectID from user document
    // Make sure the logged in user matches the customer user
    if (!customerUserId.equals(loggedInUserId)) {
      return response.status(401).json({ error: "User not authorized" });
    }
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    return response.status(200).json(deletedCustomer);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const uploadCustomers = async (request, response) => {
  try {
    const filePath = request.file.path;
    const user = request.body.user;
    const results = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          // const productValues = data.products.split("|");
          // const products = productValues.map((product) => {
          //   const trimmedProduct = product.trim();
          //   const lowercaseProduct = trimmedProduct.toLowerCase();
          //   const wordsInProduct = lowercaseProduct.split(" ");
          //   const capitalizedProduct = wordsInProduct
          //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          //     .join(" ");
          //   return {
          //     label: capitalizedProduct,
          //     value: lowercaseProduct.replace(/\s+/g, "-"),
          //   };
          // });

          // Create a new object with the modified products array
          const newData = { ...data, user };
          results.push(newData);
        })
        .on("end", () => resolve());
    });

    const docs = await Customer.insertMany(results);
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("File deleted successfully");
          resolve();
        }
      });
    });
    return response.status(200).json(docs);
  } catch (error) {
    return response.status(500).json({ message: "Failed to upload customers" });
  }
};
