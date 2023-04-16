<template>
  <admin-layout :collapsed="false" :compacted="false" />
</template>

<script>
import adminLayout from "./__admin.vue";

export default {
  components: { adminLayout },
  head() {
    return {
      bodyAttrs: {
        class: "context-right ",
      },
    };
  },
};
</script>
