const SpecialDiscountService = require("./discounts.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const HttpException = require("../../exceptions/HttpExceptions");

class SpecialDiscountController {
  constructor() {
    this.specialDiscountService = new SpecialDiscountService();
    this.restaurantService = new RestaurantService();
  }

  createDiscount = async (req, res, next) => {
    try {
      const { restaurantId } = req.body;
      const discount = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const newDiscount = await this.specialDiscountService.createDiscount({
        ...discount,
      });

      const data = {
        id: newDiscount._id,
        name: newDiscount.name,
        restaurantId: newDiscount.restaurantId,
        details: newDiscount.details,
        discountType: newDiscount.discountType,
        active: newDiscount.active,
        discountValue: newDiscount.discountValue,
        startDate: newDiscount.startDate,
        endDate: newDiscount.endDate,
        expired: newDiscount.expired,
        usabilityLimit: newDiscount.usabilityLimit,
        usageCount: newDiscount.usageCount,
      };

      return res.status(201).json({
        status: "success",
        message: "Discount created",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllDiscounts = async (req, res, next) => {
    try {
      const discounts = await this.specialDiscountService.getAllDiscounts();

      const datas = discounts.map((discount) => {
        return {
          id: discount._id,
          name: discount.name,
          restaurantId: discount.restaurantId,
          details: discount.details,
          discountType: discount.discountType,
          active: discount.active,
          discountValue: discount.discountValue,
          startDate: discount.startDate,
          endDate: discount.endDate,
          expired: discount.expired,
          usabilityLimit: discount.usabilityLimit,
          usageCount: discount.usageCount,
        };
      });

      return res.status(200).json({
        status: "success",
        message: "All discounts",
        datas,
      });
    } catch (error) {
      next(error);
    }
  };

  getDiscountById = async (req, res, next) => {
    try {
      const { discountId } = req.params;

      const discountExist = await this.specialDiscountService.getDiscountById(
        discountId
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      const discount = await this.specialDiscountService.getDiscountById(
        discountId
      );

      const data = {
        id: discount._id,
        name: discount.name,
        restaurantId: discount.restaurantId,
        details: discount.details,
        discountType: discount.discountType,
        active: discount.active,
        discountValue: discount.discountValue,
        startDate: discount.startDate,
        endDate: discount.endDate,
        expired: discount.expired,
        usabilityLimit: discount.usabilityLimit,
        usageCount: discount.usageCount,
      };

      return res.status(200).json({
        status: "success",
        message: "Discount found",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurantDiscounts = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const discounts =
        await this.specialDiscountService.getRestaurantDiscounts(restaurantId);

      const datas = discounts.map((discount) => {
        return {
          id: discount._id,
          name: discount.name,
          restaurantId: discount.restaurantId,
          details: discount.details,
          discountType: discount.discountType,
          active: discount.active,
          discountValue: discount.discountValue,
          startDate: discount.startDate,
          endDate: discount.endDate,
          expired: discount.expired,
          usabilityLimit: discount.usabilityLimit,
          usageCount: discount.usageCount,
        };
      });
      return res.status(200).json({
        status: "success",
        message: "All Restaurant discounts",
        datas,
      });
    } catch (error) {
      next(error);
    }
  };

  updateDiscount = async (req, res, next) => {
    try {
      const { discountId } = req.params;
      const discountData = req.body;

      const discountExist = await this.specialDiscountService.getDiscountById(
        discountId
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      const discount = await this.specialDiscountService.updateDiscountById(
        discountId,
        discountData
      );

      const data = {
        id: discount._id,
        name: discount.name,
        restaurantId: discount.restaurantId,
        details: discount.details,
        discountType: discount.discountType,
        active: discount.active,
        discountValue: discount.discountValue,
        startDate: discount.startDate,
        endDate: discount.endDate,
        expired: discount.expired,
        usabilityLimit: discount.usabilityLimit,
        usageCount: discount.usageCount,
      };

      return res.status(200).json({
        status: "success",
        message: "Discount Updated",
        data,
      });
    } catch (err) {}
  };

  activateDiscount = async (req, res, next) => {
    try {
      const { discountId } = req.params;

      const discountExist = await this.specialDiscountService.getDiscountById(
        discountId
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      await this.specialDiscountService.updateDiscountById(discountId, {
        active: true,
      });

      return res.status(200).json({
        status: "success",
        message: "Discount activated",
      });
    } catch (error) {
      next(error);
    }
  };

  deactivateDiscount = async (req, res, next) => {
    try {
      const { discountId } = req.params;

      const discountExist = await this.specialDiscountService.getDiscountById(
        discountId
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      await this.specialDiscountService.updateDiscountById(discountId, {
        active: false,
      });

      return res.status(200).json({
        status: "success",
        message: "Discount deactivated",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteDiscount = async (req, res, next) => {
    try {
      const { discountId } = req.params;

      const discountExist = await this.specialDiscountService.getDiscountById(
        discountId
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      await this.specialDiscountService.deleteDiscountById(discountId);

      return res.status(200).json({
        status: "success",
        message: "Discount deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SpecialDiscountController;
