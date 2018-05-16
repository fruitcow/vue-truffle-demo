<template>
  <section id='rating'>
    <div>
      <h3>美食餐廳之以太坊：Ethereum, Vue</h3>
      <hr />
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>餐廳</th>
            <th>投票數</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in restaurants">
          <tr>
            <td>{{item.name}}</td>
            <td>{{item.rating}}</td>
            <td><Button @click="sendRating(index)" bsStyle="primary">投票</Button></td>
          </tr>
          </template>
        </tbody>
      </Table>
    </div>
  </section>
</template>
<script>
  // import Ratings from '@/js/rating'
  import contract from 'truffle-contract'
  import RatingsContract from '@contracts/Rating.json'

  export default {
    name: 'rating',
    data () {
      return {
        restaurants: [
          {name: '皇樓中餐廳', rating: 0},
          {name: '星亞自助餐', rating: 0},
          {name: 'Casa義大利餐廳', rating: 0}
        ]}
    },
    beforeCreate: function () {
      // Ratings.init()
    },
    methods: {/*
      sendRating2 (index) {
        console.log(this.restaurants[index].name)
        let self = this
        Ratings.create(this.restaurants[index].name).then(tx => {
          console.log(tx)
          self.$router.push('/')
        }).catch(err => {
          console.log(err)
        })
      }, */
      sendRating (index) {
        var toAddress = '0x888bc8347b0ab29661625c38e0135a5dc387c2b7'
        var RatingInstance
        console.log('Transfer ' + ' TT to ' + toAddress)
        var Contract = contract(RatingsContract)
        Contract.setProvider(window.web3.currentProvider)

        Contract.at(toAddress).then(instance => {
          RatingInstance = instance

          return RatingInstance.voteForRestaurant(this.restaurants[index].name, {from: window.web3.eth.accounts[0]})
        }).catch(err => {
          alert('ERROR!' + err.message)
        })
      }
    }
  }
</script>