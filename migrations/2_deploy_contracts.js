var Users = artifacts.require("./Users.sol");

var Rating = artifacts.require("./Rating.sol");
module.exports = function(deployer) {
  deployer.deploy(Users).then(function() {
    return deployer.deploy(Rating,['皇樓中餐廳', '星亞自助餐', 'Casa義大利餐廳']);
  });
};
