const routes = require("express").Router();
const locations = require("../controller/locationController");
const restaurant = require("../controller/restaurantController");
const mealType = require("../controller/mealTypeController");
const { genOrderDetails, verifyPayment } = require("../controller/paymentController");

routes.get("/", locations.home);
routes.get("/location-list", locations.locationList);
routes.get("/restaurant-list-by-loc-id/:locId", restaurant.restaurantByLocId);
routes.get("/restaurant-list-by-rest-id/:Id", restaurant.restaurantList_ByRestId);
routes.get("/menu-items-by-rest-id/:r_id", restaurant.menuItemsByRestId);
routes.get("/get-meal-type", mealType.mealTypes);
routes.post("/filter", restaurant.filter);

routes.post("/gen-order-details", genOrderDetails);
routes.post("/verify-payments", verifyPayment);

module.exports = routes;
