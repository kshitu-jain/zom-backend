const restModel = require("../model/restaurantModel");
const menuItems = require("../model/menuItemsModel");

module.exports.restaurantByLocId = async (request, response) => {
  let { locId } = request.params;
  try {
    let restList = await restModel.find(
      { location_id: locId },
      { name: 1, city: 1, location_id: 1, city_id: 1, locality: 1, image: 1 }
    );
    let restData = {
      status: restList.length === 0 ? false : true,
      restList,
      count: restList.length,
    };
    response.status(200).send(restData);
  } catch (error) {
    response.status(500).send({ status: false });
  }
};

module.exports.restaurantList_ByRestId = async (request, response) => {
  let { Id } = request.params;
  try {
    let restList = await restModel.findById(Id);
    let restData = {
      status: restList.length === 0 ? false : true,
      restList,
      count: restList.length,
    };
    response.status(200).send(restData);
  } catch (error) {
    response.status(500).send({ status: false, error });
  }
};

module.exports.menuItemsByRestId = async (request, response) => {
  let { r_id } = request.params;
  try {
    let menuList = await menuItems.find({ restaurantId: r_id });
    let menuItemsData = {
      status: menuList.length === 0 ? false : true,
      menuList,
      count: menuList.length,
    };
    response.status(200).send(menuItemsData);
  } catch (error) {
    response.status(500).send({ status: false, error });
  }
};

module.exports.filter = async (request, response) => {
  try {
    let { mealType, loc_id, lCost, hCost, sort, cuisine, page, itemsPerPage } = request.body; //to get data from body

    sort = sort ? sort : 1;
    page = page ? page : 1; //this "page" is defined page no
    itemsPerPage = itemsPerPage ? itemsPerPage : 2; //this will show items per page

    let startIndex = page * itemsPerPage - itemsPerPage;
    let lastIndex = page * itemsPerPage;

    let filter = {};
    if (mealType !== undefined) {
      filter["mealtype_id"] = mealType;
    }
    if (loc_id !== undefined) {
      filter["location_id"] = loc_id;
    }
    if (lCost !== undefined && hCost !== undefined) {
      filter["min_price"] = { $lt: hCost, $gt: lCost };
    }
    if (cuisine !== undefined) {
      filter["cuisine_id"] = { $in: cuisine };
    }
    console.log(filter);

    let restList = await restModel.find(filter).sort({ min_price: sort });
    let pageCount = Math.round(restList.length / 2); //  sort 1==>ascending & sort -1 ==>descending
    let filterResult = restList.slice(startIndex, lastIndex);

    let restData = {
      status: filterResult.length === 0 ? false : true,
      filterResult,
      count: filterResult.length,
      pageCount,
      page,
    };
    response.status(200).send(restData);
  } catch (error) {
    response.status(500).send({ status: false, error });
  }
};
