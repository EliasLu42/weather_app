<template>
  <div class="WeatherWidget">
    <div v-show="!weatherWidget.r.settingsOpened" class="WeatherWidget_list">
      <WeatherCard :locationName="location.name" :key="location.id" v-for="(location) of weatherWidget.r.presetLocations"></WeatherCard>
    </div>

    <WeatherCard
        v-if="weatherWidget.r.settingsOpened"
        :isSettings="weatherWidget.r.settingsOpened"
        :presetLocations="weatherWidget.r.presetLocations"
        :errorMessage="weatherWidget.r.errorMessage"

        @addLocation="weatherWidget.addLocation"
        @deleteLocation="weatherWidget.deleteLocation"
        @setNewLocationPosition="weatherWidget.setNewLocationPosition"
    ></WeatherCard>

    <CustomButton :additionalClass="weatherWidget.r.settingsOpenerClass" @click="weatherWidget.switchOpenerSettings"></CustomButton>
  </div>
</template>

<style lang="scss">
  @import "src/assets/styles/WeatherWidget.scss";
</style>

<script>

import CustomButton from "@/components/UI/CustomButton";
import WeatherWidgetC from '@/components/WeatherWidgetC';
import WeatherCard from "@/components/WeatherCard/WeatherCard";

export default {
  name:'WeatherWidget',

  components:{
    CustomButton,
    WeatherCard
  },

  props:{},

  setup(){

    const weatherWidget = new WeatherWidgetC();

    return{
      weatherWidget
    }
  }
}
</script>

