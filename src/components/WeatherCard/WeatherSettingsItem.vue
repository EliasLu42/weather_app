<template>
  <div class="WeatherWidget_card-settings_item">
    <CustomButton class="WeatherWidget_card-settings_drag" :style="'burger'"></CustomButton>

    <div class="WeatherWidget_card-settings_location">{{ location }}</div>

    <CustomButton
        class="WeatherWidget_card-settings_delete"
        :style="'delete'"
        @click="$emit('deleteLocation', location)"
    ></CustomButton>
  </div>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton";

export default {
  name:'WeatherSettingsItems',

  emits:['deleteLocation'],

  components:{
    CustomButton
  },

  props:{
    location:String
  },

  setup(){

    return{
    }
  }
}
</script>

