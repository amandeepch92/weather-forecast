<template>
	<li>
	    <span class="date">{{ item.date | dayMonth(item.date) }}</span>
	    <span><img :src='item.day.condition.icon' :alt='item.day.condition.text' :title='item.day.condition.text'></span>
	    <span><strong>{{ item.day.maxtemp_c }}&deg; / </strong> {{ item.day.mintemp_c }}&deg;</span>
      <div class="weather-details">
        <p>humidity : {{item.day.avghumidity}}</p>
        <p>Weather : {{item.day.condition.text}}</p>
      </div>  
	</li>
</template>

<script>
import moment from 'moment'

export default {

  name: 'ForecastList',
  props: ['item'],
  filters:{
    dayMonth(value) {
        return moment(String(value)).format('D MMMM');
    }
  }  

}
</script>

<style lang="scss" scoped>
li{
  margin: 0;
  border-right: 1px solid #ccc;
  padding: 1em;
  font-size: .9rem;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column wrap;
  flex-flow: column wrap;
  flex-grow: 1;
  justify-content: center;
  .date{
    color: #4169E1;
    font-weight: 600;
  }
  .weather-details{
    margin-top: 10px;
  }
  &:last-child{
    border: none;
  }
}
</style>