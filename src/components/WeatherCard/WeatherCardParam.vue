<template>
  <div class="WeatherWidget_card_param">
    <img :src="iconSrc" v-if="iconName" class="WeatherWidget_card_param_icon">

    <div>{{ name ? name + ':' : ''  }} {{ value }}</div>
  </div>

</template>

<style lang="scss">

</style>

<script>
import { computed } from "vue";

export default {
  name:'WeatherWidgetParam',

  props:{
    name:{
      type:String
    },
    value:{
      type:[String, Number],
      required:true
    },
    iconName:{
      type:String,
      required:false
    }
  },

  setup(props){
    const iconSrc = computed(() => {
      return require(`@/assets/images/${props.iconName}.svg`);
    });

    return{
      iconSrc
    }
  }
}
</script>

