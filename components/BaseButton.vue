<template>
    <button
        class="base-button"
        :type="type"
    >
        <Loader v-if="loading" />
        <template v-else>
            {{ label }}
        </template>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        label: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        }
    }
};
</script>
<style lang="scss">
@import '~assets/scss/base-button';
</style>
