<template>
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Object,
            default: () => ({
                width: '16px',
                height: '16px'
            })
        }
    }
};
</script>

<style lang="scss">
@import '~assets/scss/loader';
</style>
