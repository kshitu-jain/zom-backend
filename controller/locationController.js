const locationModel = require("../model/locationModel");

module.exports.home = (request, response) => {
  response.send("hello world");
};

module.exports.locationList = async (request, response) => {
  try {
    let locationList = await locationModel.find();
    let sendData = {
      status: locationList.length === 0 ? false : true,
      locationList,
      count: locationList.length,
    };
    response.send(sendData);
  } catch (error) {
    let err = { status: false, error };
    response.send(err);
  }
};
