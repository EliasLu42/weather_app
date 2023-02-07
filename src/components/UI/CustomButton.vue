<template>
  <button :class="btnStyles"></button>
</template>

<script>
import { computed } from "vue";

export default {
  name:'CustomButton',

  props:{
    additionalClass:[String, Object],
    style:String,
    withHover:Boolean
  },

  setup(props){
    const btnStyles = computed(() => {
      let styles = {};
      if(props.additionalClass && typeof(props.additionalClass) === 'object'){
        styles = Object.assign(props.additionalClass);
      }else{
        styles[[props.additionalClass]] = true;
      }

      styles[['CustomButton']] = true;
      styles[[`CustomButton-${props.style}`]] = props.style;
      styles[['CustomButton-hover']] = props.withHover;

      return styles;
    });

    return{
      btnStyles
    }
  }
}
</script>

