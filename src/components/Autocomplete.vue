<template>
  <div class="autocomplete">
    <input
	    type="text"
	    v-model="search"
	    @input="onChange"
	    @keydown.enter="enter"
      @keydown.down="down"
      @keydown.up="up"
      class="search"
    />
    <i class="search icon"></i>

    <div 
    	v-show="isOpen"
    	class="menu autocomplete-results"
    >
      <div 
	      v-for="(result, i) in matches"
	      :key="i"
	      @click="setResult(result)"
      	class="item"
      	:class="{ 'is-active': i === counter }"
      >
        {{ result.city }} <small>({{ result.country }})</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Autocomplete',

	props: {
		value: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data () {
    return {
    	search: this.value,
    	isOpen: false,
    	counter: -1
    }
  },

  filters: {
    highlight: function (value, str) {
      var check = new RegExp(str, "ig");
      return value.city.replace(check, '<strong>' + str + '</strong>') + ' <small>(' + value.country + ')</small>'
    }
  },

  computed: {
  	matches(){
  		return this.search != "" ? this.items.filter((obj) => {
        return obj.city.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
      }) : []
  	}
  },

	mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods:{
  	onChange(){
      this.isOpen = true
  	},
		setResult(result) {
			this.$emit('itemSelected', result);
		  this.search = result.city;		  
		  this.isOpen = false;
		},
    // When enter pressed on the input
    enter () {
      this.$emit('itemSelected', this.matches[this.counter]);
      this.search = this.matches[this.counter].city;
      this.isOpen = false;
      this.counter = -1;
    },

    // When up pressed while suggestions are open
    up () {
      if (this.counter > 0) {
        this.counter--
        this.itemView(this.$el.getElementsByClassName('item')[this.counter])
      }
    },

    // When up pressed while suggestions are open
    down () {
      if (this.counter < this.matches.length - 1) {
        this.counter++
        this.itemView(this.$el.getElementsByClassName('item')[this.counter])
      }
    },

		handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.counter = -1;
      }
    }, 
    // Focus on item selected on key up/down
    itemView (item) {
      if (item && item.scrollIntoView) {
        item.scrollIntoView(false)
      }
    },


  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  width: 70%;
  input{
    &.search{
      width: 100%;
      padding: 10px;
    }
  }
  .menu{
    padding: 0;
    background: #e3e3e3;
    font-size: 1em;
    text-shadow: none;
    text-align: left;
    .item{
      position: relative;
      cursor: pointer;
      display: block;
      border: none;
      height: auto;
      text-align: left;
      border-top: none;
      line-height: 1em;
      color: rgba(0,0,0,.87);
      padding: .78571429rem 1.14285714rem;
      font-size: 1rem;
      text-transform: none;
      font-weight: 400;
      box-shadow: none;
    }
  }
  .autocomplete-results{
    display: block;
  }
  .item{
    cursor: pointer;
    &.is-active,&:hover{
      background-color: #33cccc;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>