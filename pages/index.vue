<template>
    <section class="home">
        <ProjectsList />
    </section>
</template>

<script>
export default {
    middleware: 'auth'
};
</script>

<style lang="scss">
@import '~assets/scss/home';
</style>
