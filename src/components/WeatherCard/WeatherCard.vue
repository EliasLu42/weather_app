<template>
  <div :class="weatherCard.r.weatherWidgetClass">
    <div class="WeatherWidget_card_header">
      {{ weatherCard.r.cardHeader }}
    </div>

    <template v-if="!isSettings">
      <div class="WeatherWidget_card_stat">
        <img class="WeatherWidget_card_statIcon" :src="weatherCard.r.weatherIcon">
        <div class="WeatherWidget_card_temp">{{ weatherCard.r.temp }}&deg;C</div>
      </div>

      <div class="WeatherWidget_card_params">
        <WeatherCardParam v-for="param of weatherCard.r.params" :key="param.name" :name="param.name" :value="param.value" :iconName="param.iconName"></WeatherCardParam>
      </div>
    </template>

    <template v-if="isSettings">
      <div ref="dragContainer" class="WeatherWidget_card_settingsList">
        <WeatherSettingsItem
            v-for="(loaction) of presetLocations"
            :location="loaction.name"
            :key="loaction.id"
            :data-location_id="loaction.id"

            :ref="setDraggableElements"

            draggable="true"

            @deleteLocation="$emit('deleteLocation', $event)"
        ></WeatherSettingsItem>
      </div>

      <CustomInput
          additionalClass="WeatherWidget_card-settings_newCity"
          labelText="Add new location"
          :withBtn="true"
          :btnParams="addLocationBtnParams"

          @btnClick="addLocation"
      ></CustomInput>
    </template>

    <div v-if="errorMessage" class="WeatherWidget_card_error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss">
  @import "src/assets/styles/WeatherCard.scss";
</style>

<script>
import { ref, onMounted } from 'vue';
  import CustomInput from "@/components/UI/CustomInput";
  import WeatherCardC from './WeatherCardC';
  import WeatherCardParam from './WeatherCardParam';
  import WeatherSettingsItem from "./WeatherSettingsItem";

  export default {
    name:'WeatherCard',

    components:{
      CustomInput,
      WeatherSettingsItem,
      WeatherCardParam
    },

    emits:['addLocation', 'deleteLocation', 'setNewLocationPosition'],

    props:{
      locationName:String,
      isSettings:Boolean,
      presetLocations: Array,
      errorMessage:String
    },

    setup(props, {emit}){
      const weatherCard = new WeatherCardC(props);

      const draggableElements = ref([]);
      const dragContainer = ref(null);
      const setDraggableElements = el => {
        if (el) draggableElements.value.push(el);
      };

      const addLocationBtnParams = {
        withHover:true,
        style:'enter'
      };

      const addLocation = (e) => {
        const elInput = e.currentTarget.parentElement.querySelector('input');
        const newLocationName = elInput.value;

        emit('addLocation', newLocationName);
      };

      onMounted(async () => {
        const dragParams = {
          index:0,
          locationId:0
        };

        if(props.locationName) await weatherCard.getWeatherByCity(props.locationName);

        if(draggableElements.value.length){
          draggableElements.value.forEach(draggable => {
            draggable.$el.addEventListener('dragstart', () => {
              draggable.$el.classList.add('dragging');
            })

            draggable.$el.addEventListener('dragend', () => {
              draggable.$el.classList.remove('dragging');

              emit('setNewLocationPosition', dragParams);
            })
          });

          const container = dragContainer.value;
          container.addEventListener('dragover', e => {
            e.preventDefault();

            const afterElementId = getDragAfterElement(container, e.clientY) * 1;
            const draggable = document.querySelector('.dragging');
            const draggableElementId = draggable.getAttribute('data-location_id') * 1;

            let index = props.presetLocations.findIndex((location) => location.id === afterElementId);
            if(index === -1 && props.presetLocations.length) index = props.presetLocations.length;

            dragParams.index = index;
            dragParams.locationId = draggableElementId;
          })

          const getDragAfterElement = (container, y) => {
            const draggableElements = [...container.querySelectorAll('[draggable]:not(.dragging)')]

            return draggableElements.reduce((closest, child) => {
              const box = child.getBoundingClientRect();
              const offset = y - box.top - box.height / 2;

              if(offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child, id:child.getAttribute('data-location_id') };
              }else{
                return closest;
              }
            }, { offset: Number.NEGATIVE_INFINITY }).id
          }
        }
      });

      return {
        addLocationBtnParams,
        weatherCard,
        dragContainer,
        draggableElements,
        setDraggableElements,
        addLocation,
      }
    }
  }
</script>