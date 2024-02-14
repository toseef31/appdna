<template>
  <li>
    <router-link :to="to" :class="customClass">
      <SVG :iconType="iconType" />
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup>
import SVG from "../../assets/images/svgs/svgs.vue";

const props = defineProps({
  to: {
    required: true,
    type: String,
  },
  iconType: {
    required: true,
    type: String,
  },
  customClass: {
    required: false,
    type: String,
  },
});
</script>
