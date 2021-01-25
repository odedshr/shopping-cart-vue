<template>
  <fieldset class="checkbox field">
    <input type="checkbox"
      :id="'id-'+value"
      :value="value"
      :checked="isChecked"
      @change="update"
      hidden
    ><label :for="'id-'+ value" class="tag toggleBtn"><slot /></label>
  </fieldset>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: { type: String, required: true },
    checked: { type: Boolean, default: false }
  },

  setup(props, {emit}) {
    const isChecked = ref(props.checked);

    function update() {
      isChecked.value = !isChecked.value;
      emit("update", { key: props.value, value: isChecked.value });
    }

    return { update, isChecked };
  }
});

</script>

<style scoped lang="scss">
  @import './common';

  .checkbox {
    display: flex;

    .toggleBtn {
      display: flex;
      align-items: center;
      padding: 1.5rem 0.5rem;
    }
    
    &[data-theme="mute"] .toggleBtn {
      background: none;
      border: none;
      color: var(--nc-tx-1);

      input:checked + .toggleBtn {
        background: none;
        border: none;
      }

      &:before {
        opacity: 0;
      }
    }
  } 
</style>