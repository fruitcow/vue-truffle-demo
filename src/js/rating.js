import contract from 'truffle-contract'
import RatingsContract from '@contracts/Rating.json'

const Ratings = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(RatingsContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        console.log(instance)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  create: function (name) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.voteForRestaurant(
        name,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Ratings
