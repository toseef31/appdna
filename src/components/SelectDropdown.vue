<template>
  <div>
    <div class="custom-select-container">
      <div
        class="custom-select"
        :class="{ 'focused': isFocused, 'no-outline': !props.isOutline }"
        tabindex="0"
        @focusin="handleFocusIn"
        @focusout="handleFocusOut"
      >
        <div class="default-option" v-if="!selectedOption">
          Select an option
        </div>
        <div class="selected-option" v-else>
          {{ selectedOption }}
        </div>
      </div>
      <div class="dropdown-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2656 7.63281L12 12.8985L6.73436 7.63281L5 9.36717L12 16.3672L19 9.36717L17.2656 7.63281Z"
            fill="#B4BDC6"
            :class="{ 'focused-dropdown': isFocused }"
          />
        </svg>
      </div>
      <div
        class="options-list"
        v-if="isFocused"
        :style="{
          position: props.position,
        }"
      >
        <div
          class="custom-option"
          v-for="option in props.dataList"
          @click="selectOption(option.name)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  position: String,
  dataList: Array,
  isOutline: {
    default: true,
    type: Boolean
  }
});

const isFocused = ref(false);
const selectedOption = ref("");
const optionsList = [
  {
    opt: "option 1",
  },
  {
    opt: "option 2",
  },
  {
    opt: "option 3",
  },
  {
    opt: "option 4",
  },
];

const selectOption = (option) => {
  selectedOption.value = option;
};
const handleFocusIn = () => {
  isFocused.value = true;
};
const handleFocusOut = () => {
  setTimeout(() => {
    isFocused.value = false;
  }, 50);
};
</script>
