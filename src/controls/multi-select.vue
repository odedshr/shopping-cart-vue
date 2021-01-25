<template>
  <fieldset
    :data-expanded="expanded"
    tabindex="0"
    @focusout="toggle"
    class="field"
  >
    <slot />
    <ul class="output" @click="toggle">
      <li v-for="({key,value}, index) in data.filter(i=>i.checked)"
        :key="index"
        class="tag"
        data-pressed="true"
        @click.stop="remove(key)"
      >{{value}}</li>
    </ul>
    <ul class="input">
      <li v-for="({key,value, checked}, index) in data" :key="index">
        <input type="checkbox" :value="key" :id="'type-' + key" @change="update" hidden :checked="checked">
        <label :for="'type-' + key" class="tag toggleBtn">{{value}}</label>
      </li>
    </ul>
  </fieldset>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import { KeyValue } from './key-value';

export default defineComponent({
  props: {
    items: { type: Object, default: [] as KeyValue[]},
    value: { type: Object, default: [] as string[]}
  },

  setup(props, {emit}) {
    let oldSelected = (props.value as string[] || []).join();
    const selected = ref(props.value as string[] || []);
    const expanded = ref(false);
    const data = computed(()=> props.items
      .map((item: KeyValue) => ({ ...item, checked: (selected.value.indexOf(item.key) > -1)})));
    
    function toggle() {
      const newSelected = (selected.value as string[]).join();
      expanded.value = !expanded.value;

      if (!expanded.value && oldSelected !== newSelected) {
        emit("update", selected.value);
        oldSelected = newSelected;
      }
    }

    function remove(value: string) {
      selected.value = selected.value.filter(key=> key !== value);
    }

    function update({target}: {target: HTMLInputElement}) {
      const { value, checked }= target;
      if (!checked) {
        return remove(value);
      }

      const updatedList = [...selected.value, value];
      selected.value = [...new Set(updatedList) ];
    }

return { selected, toggle, remove, update, data, expanded };
  }
});
</script>

<style scoped lang="scss">
  @import './common';

  .field {
    position: relative;

    &:focus {
      outline: none;
    }
  }

  li {
    display: inline-block;
    height: 2.5rem;
  }

  .output {
    border: 1px solid $clr-border;
    box-shadow: 0 0.3rem 0.3rem $clr-shadow;
    display: flex;
    cursor: pointer;
    flex-wrap: wrap;
    gap: 0.5rem;
    min-height: 2rem;
    padding: 0.5rem;

    .tag {
      background: var(--nc-lk-1);
      color: var(--nc-bg-1);
      font-size: 1.2rem;
      height: 1.8rem;
    }
  }

  .input {
    background-color: var(--nc-bg-1);
    border: 1px solid $clr-border;
    border-top: none;
    box-shadow: 0 0.3rem 0.3rem $clr-shadow;
    background: white;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-height:0;
    overflow: hidden;
    opacity: 0;
    position: absolute;
    padding: 0.5rem;
    transition: max-height 0.5s ease-in-out, opacity 0.25s ease-in-out;
    width: inherit;
    z-index: 1;

    .field[data-expanded="true"] & {
      max-height: 100vh;
      opacity: 90;
    }
  }

</style>