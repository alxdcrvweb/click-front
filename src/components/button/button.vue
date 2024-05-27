<template>
    <button @click="buttonHandler" class="button">
      <BlockContainer :backgroundColor="touched?'#111111':'black'">
        <div :class="!touched?'buttonBG':'buttonBG animated'">
          <div :class="reverseIcon?'buttonGridReverse':'buttonGrid'">
            <div class="slotContainer">
              <slot/>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="chevron-right">
                <path id="Vector 144" d="M6 4L10 8L6 12" stroke="white"/>
              </g>
            </svg>
          </div>
        </div>
      </BlockContainer>
    </button>
</template>

<script lang="ts">
  import {ref} from "vue";
  import BlockContainer from "@/components/layouts/BlockContainer.vue";
  const touched = ref(false)
  export default {
    name: 'Button',
    components: {BlockContainer},
    props: {
      onClick: Function,
      reverseIcon: Boolean
    },
    setup() {
      return {touched}
    },
    methods: {
      buttonHandler() {
        console.log('this.onclick', this.onClick)
        this.onClick && this.onClick()
        this.touched = true
        setTimeout(() => {
          this.touched = false
        }, 200)
      },

    }
  }


</script>
<style lang="scss">
.button {
  color: white;
  padding: 0px;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  border: 0;
    .slotContainer {
      flex-grow: 3
    }
    .buttonGrid {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .buttonGridReverse {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-direction: row-reverse;
      svg {
        transform: rotate(180deg);
      }
    }
  }
  .animated {
  }
</style>
