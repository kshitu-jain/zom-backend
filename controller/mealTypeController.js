const mealType = require("../model/mealTypeModel");

module.exports.mealTypes = async (request, response) => {
  try {
    let mealTypesList = await mealType.find();
    let sendData = {
      status: mealTypesList.length === 0 ? false : true,
      mealTypesList,
    };
    response.status(200).send(sendData);
  } catch (err) {
    let error = {
      status: false,
    };
    response.status(500).send({ error });
  }
};
