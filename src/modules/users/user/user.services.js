const Users = require("../../../models/users/user/user.model");

class UserService {
  users;
  constructor() {
    this.users = Users;
  }

  create = async (userData) => {
    try {
      const newUser = await this.users.create({
        ...userData,
      });
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };

  findUserById = async (id) => {
    try {
      const user = await this.users.findById(id);

      // .populate("Restaurants")
      // .populate("Drivers");

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  findUserByEmail = async (email) => {
    try {
      const user = await this.users.findOne({ email: email });
      // .populate("restaurants")
      // .populate("drivers");

      return user;
    } catch (error) {}
  };

  updateData = async (id, userData) => {
    console.log(userData, "userData");
    try {
      const updatedUser = await this.users.findByIdAndUpdate(
        id,
        {
          ...userData,
        },
        {
          new: true,
        }
      );

      // .populate("Restaurants")
      // .populate("Drivers");
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  };

  updateRestaurants = async (userId, restaurantId) => {
    try {
      const updatedUser = await this.users.findByIdAndUpdate(userId, {
        $push: { restaurants: restaurantId },
      });

      return updatedUser;
    } catch (error) {}
  };

  updateRole = async (id, role) => {
    try {
      const updatedUser = await this.users.findByIdAndUpdate(
        id,
        { $push: { roles: role } },
        { password: 0 }, //Don't return password
        {
          new: true,
        }
      );

      return updatedUser;
    } catch (error) {}
  };

  matchPassword = async (password) => {
    try {
      // const validPassword = await this.users.matchPassword(password);
      console.log(await this.users.matchPassword(password), "log pass");
      const validPassword = await this.users.schema.methods.matchPassword(
        password
      );

      console.log(validPassword);

      return validPassword;
    } catch (error) {
      console.log(error);
    }
  };

  fetchAllUser = async () => {
    try {
      const users = await this.users.find({}, { password: 0 });
      // .populate("Restaurants")
      // .populate("Drivers");
      return users;
    } catch (error) {}
  };

  deleteUser = async (id) => {
    try {
      const deleteUser = await this.users.findByIdAndDelete(id);
      return deleteUser;
    } catch (error) {}
  };
}

module.exports = UserService;
