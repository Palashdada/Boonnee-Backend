const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utiles/responce");
const bcrypt = require("bcrypt");
const { createToken } = require("../utiles/tokenCreate");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("DB_URL:", process.env.DB_URL);
    // console.log("CONNECTED DB:", adminModel.db.name);
    // console.log("COLLECTION:", adminModel.collection.name);
    // console.log("LOGIN EMAIL RAW:", JSON.stringify(req.body.email));
    console.log(email);
    console.log("LOGIN EMAIL:", email);
    const all = await adminModel.find({}).select("+password");
    console.log(
      "ALL ADMINS:",
      all.map((a) => ({ id: a._id, email: a.email, role: a.role }))
    );

    // const admin2 = await adminModel
    //   .findOne({
    //     email: { $regex: "^p@gmail\\.com", $options: "i" },
    //   })
    //   .select("+password");
    // console.log("REGEX MATCH ADMIN:", admin2);
    // const count = await adminModel.countDocuments();
    // console.log("ADMIN COUNT:", count);
    try {
      const emailTrim = email.trim();
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log("ADMIN FOUND:", admin);

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin._id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success " });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      console.log("ADMIN LOGIN ERROR =>", error); // ✅ full object
      console.log("STACK =>", error.stack);
      responseReturn(res, 500, { error: error.message });
    }
  };
  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log(seller);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new authControllers();
