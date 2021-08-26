const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require("../../util/validators");

function generateToken(user){
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.email,
        },
        SECRET_KEY,
        { expiresIn: "24h" }
      );
}

module.exports = {
  Mutation: {
      async login(_,{username,password}){
          const {errors, valid} = validateLoginInput(username,password);
          const admin = await Admin.findOne({username});
          if(!admin){
            errors.general = "Admin not found";
            throw new UserInputError ("Admin not found", {errors})
          }
          const match = await bcrypt.compare(password, admin.password);
          if(!match){
            errors.general = "Wrong password";
            throw new UserInputError ("Wrong password", {errors})
          }
          const token = generateToken(admin)

          return {
            ...admin._doc,
            id: admin._id,
            token,
          };

      },
    async register(
      _,
      { registerAdminInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // validate admin data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //Make sure admin doesn't exist
      const admin = await Admin.findOne({ username });
      if (admin) {
        throw new UserInputError("Admin Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      //
      //hash password and create auth token
      password = await bcrypt.hash(password, 12);
      const newAdmin = new Admin({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newAdmin.save();

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
