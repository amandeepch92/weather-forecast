<template>
    <div>
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error">
        <i></i>Sorry... data not available!
      </div>   
      <div v-else>     
        <ul v-if="forecast.length > 0" class="forecast-list">
          <ForecastList v-for="(item, index) in forecast" :key="index" :item="item">
          </ForecastList>
        </ul>        
      </div>

	</div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import ForecastList from './ForecastList'

export default {

  name: 'WeatherDetails',

  components: {
    ForecastList
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters([
      'current',
      'forecast',
    ])
  },
  methods: {

  } 
}
</script>

<style lang="scss" scoped>
.loading{
  z-index: 999;
  top: 0;
  right: 0;
  position: absolute;
  padding: 5px;
  color: #fff;
  background-color: #1200aa;
}
.forecast-list{
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  margin: 1em 0 0 0;
  padding: 0;
  color: #24282a;
  background-color: #eee;
  border: 1px solid #ccc;
}
</style>	