import User from "../model/userSchema.js";
import JWT from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return JWT.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    if (!email || !password) {
      return response.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ error: "wrong email address" });
    }
    const match = await bcrypt.compare(password, user.password); //userExists.password is hashed password which exits in db
    if (!match) {
      return response.status(400).json({ error: "wrong password " });
    }
    const { _id, fullName, userName, userRole } = user;
    const token = createToken(_id);
    return response
      .status(200)
      .json({ email, fullName, userName, userRole, token });
  } catch (error) {
    return response.status(400).json({ error: "Login Failed" });
  }
};

export const signupUser = async (request, response) => {
  const { fullName, userName, email, password, userRole } = request.body;
  try {
    //validations
    if (!fullName || !userName || !email || !password || !userRole) {
      return response.status(400).json({ error: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return response
        .status(400)
        .json({ error: "enter a valid email address" });
    }
    if (!validator.isStrongPassword(password)) {
      return response.status(400).json({ error: "use a strong password" });
    }

    //check if email or username already in db
    const exists =
      (await User.findOne({ email })) || (await User.findOne({ userName }));
    if (exists) {
      return response
        .status(400)
        .json({ error: "email or userName already exists" });
    }

    //by using bcrypt generating salt
    const salt = await bcrypt.genSalt(10);
    //hashing the password before saving into database
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      userRole,
    });
    // const token = createToken(user._id);
    // return response.status(200).json({ email, token });
    return response.status(200).json({ email });
  } catch (error) {
    return response.status(400).json({ error: "Registration Failed" });
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find()
      .select("fullName userName email userRole")
      .sort({
        createdAt: -1,
      });
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json({ error: "Failed to get Users" });
  }
};

export const getSingleUser = async (request, response) => {
  try {
    // Assuming the authenticated user's information is available in the request.user object
    const userId = request.params.id;
    const user = await User.findById(userId).select(
      "fullName userName email userRole"
    );
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ error: "Failed to get user" });
  }
};

// export const updateUser = async (request, response) => {
//   try {
//     const { id: userId } = request.params;
//     const { password, userRole, email, userName } = request.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return response.status(401).json({ error: "User not found" });
//     }
//     if (!["admin", "manager", "agent"].includes(userRole)) {
//       return response.status(404).json({ error: "Invalid user role" });
//     }
//     if (password && !validator.isStrongPassword(password)) {
//       return response.status(404).json({ error: "Use a strong password" });
//     }

//     const update = password
//       ? {
//           ...request.body,
//           password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
//         }
//       : request.body;
//     const updatedUser = await User.findOneAndUpdate({ _id: userId }, update, {
//       new: true,
//     });
//     if (updatedUser) {
//       return response.status(200).json(updatedUser);
//     } else {
//       return response.status(404).json({ error: "User not found" });
//     }
//     // if (password) {
//     //   const salt = await bcrypt.genSalt(10);
//     //   const hash = await bcrypt.hash(password, salt);
//     //   const updatedUser = await User.findOneAndUpdate(
//     //     { _id: userId },
//     //     {
//     //       ...request.body,
//     //       password: hash,
//     //     },
//     //     {
//     //       new: true,
//     //     }
//     //   );
//     //   if (updatedUser) {
//     //     return response.status(200).json(updatedUser);
//     //   } else {
//     //     return response.status(404).json({ error: "User not found" });
//     //   }
//     // } else {
//     //   const updatedUser = await User.findOneAndUpdate(
//     //     { _id: userId },
//     //     request.body,
//     //     {
//     //       new: true,
//     //     }
//     //   );
//     //   if (updatedUser) {
//     //     return response.status(200).json(updatedUser);
//     //   } else {
//     //     return response.status(404).json({ error: "User not found" });
//     //   }
//     // }
//   } catch (error) {
//     return response.status(500).json({ error: error.message });
//   }
// };

export const updateUser = async (request, response) => {
  try {
    // const { id: userId } = request.params;
    let userId;
    if (request.params.id) {
      userId = request.params.id;
    } else {
      const token = request.headers.authorization.split(" ")[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      userId = decoded._id;
    }
    const { password, userRole, email, userName, fullName } = request.body;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }
    if (
      userRole === user.userRole &&
      email === user.email &&
      userName === user.userName &&
      fullName === user.fullName
    ) {
      return response.status(401).json({ error: "No changes made" });
    }

    if (!["admin", "manager", "agent"].includes(userRole)) {
      return response.status(404).json({ error: "Invalid user role" });
    }
    if (password && !validator.isStrongPassword(password)) {
      return response.status(404).json({ error: "Use a strong password" });
    }

    // Creating an empty update object
    let update = {};

    // Check if the request includes a new password and hash it
    if (password) {
      update.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    }

    // Check if the request includes a new userRole
    if (userRole) {
      update.userRole = userRole;
    }

    // Check if the request includes a new email and check for duplicates
    if (email) {
      // Check if the new email is different from the existing one
      if (email !== user.email) {
        const existingUserWithEmail = await User.findOne({ email });
        if (existingUserWithEmail) {
          return response.status(400).json({ error: "Email already exists" });
        }
        update.email = email;
      }
    }

    // Check if the request includes a new userName and check for duplicates
    if (userName) {
      // Check if the new userName is different from the existing one
      if (userName !== user.userName) {
        const existingUserWithUserName = await User.findOne({ userName });
        if (existingUserWithUserName) {
          return response
            .status(400)
            .json({ error: "Username already exists" });
        }
        update.userName = userName;
      }
    }

    // Perform the update operation
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...request.body, update },
      {
        new: true,
      }
    );

    if (updatedUser) {
      return response.status(200).json(updatedUser);
    } else {
      return response.status(404).json({ error: "User not Updated" });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
export const deleteUser = async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(request.params.id);
    // Check for user
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    return response.status(200).json(deletedUser);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
