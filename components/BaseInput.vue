<template>
  <div class="base-input">
    <div class="base-input__group">
      <div class="base-input__input-inner">
        <div :class="['base-input__label', { 'error': error, 'has-value': value || error }]">
          {{ error || label }}
        </div>
        <input
          v-model="modelValue"
          :type="type"
          autofocus
          :placeholder="placeholder"
          :class="['base-input__input', { 'error': error }]"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss">
@import '~assets/scss/base-input';
</style>
