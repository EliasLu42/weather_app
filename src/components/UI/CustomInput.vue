<template>
    <label :class="['CustomInput', additionalClass]">
      <input placeholder=" ">
      <div class="CustomInput_caption">{{ labelText }}</div>

      <CustomButton
          v-if="withBtn"
          :additionalClass="btnParams.additionalClass"
          :style="btnParams.style"
          :withHover="btnParams.withHover"

          @click="$emit('btnClick', $event)"
      ></CustomButton>
    </label>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton";

export default {
  name:'CustomInput',

  components:{
    CustomButton
  },

  props:{
    labelText:String,
    additionalClass:[String, Object],
    withBtn:Boolean,
    btnParams:{
      additionalClass:[String, Object],
      style:String,
      withHover:Boolean
    }
  },

  setup(){

    return{}
  }
}
</script>

