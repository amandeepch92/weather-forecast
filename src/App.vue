<template>
  <div id="app">
      <h2>Weather Forecast App</h2>
      <Autocomplete :items="items" :value="init.city" @itemSelected="getData"></Autocomplete>  
      <WeatherDetails></WeatherDetails>
  </div>
</template>

<script>
import Autocomplete from './components/Autocomplete'
import WeatherDetails from './components/WeatherDetails'
import cities from './cities'

export default {
  name: 'app',
  components:{
    Autocomplete,
    WeatherDetails    
  },

  data () {
    return {
      init: {
        city: 'New Delhi',
        country: 'IN'
      },
      items: cities
    }
  },

  mounted: function(){
    this.getData(this.init);
  },

  methods: {
    getData(valueSelected){
      this.$store.dispatch('FETCH_WEATHER', valueSelected)
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  margin: 1em;  
}
.logo{
  width: 25px;
  height: 25px;
}
.footer {
    margin-top: 50px;
    text-align: center;
}
</style>
