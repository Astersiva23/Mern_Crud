import User from "../model/userModel.js";
import path from 'path';
import fs from 'fs';

export const create = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    let filename = null;

    if (req.files && req.files.file) {
      const file = req.files.file;
      filename = `${Date.now()}_${file.name}`;
      const uploadPath = path.join("C:/Mern_Crud/server/uploads", filename);
      fs.renameSync(file.tempFilePath, uploadPath);  // Move the file to the desired folder
    }

    const newUser = new User({
      name,
      email,
      address,
      filename // Save file name in the schema
    });

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedData = await newUser.save();
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// export const create = async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     const { email } = newUser;

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ message: "User already exists." });
//     }
//     const savedData = await newUser.save();
//     // res.status(200).json(savedData);
//     res.status(200).json({ message: "User created successfully." });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

export const getAllUsers = async (req, res) => {
    try {
      const userData = await User.find();
      if (!userData || userData.length === 0) {
        return res.status(404).json({ message: "User data not found." });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };

  export const getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };

  export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
      const updatedData = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // res.status(200).json(updatedData);
      res.status(200).json({ message: "User Updated successfully." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  