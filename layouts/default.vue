<template>
    <section class="default-layout">
        <TheHeader />
        <main class="default-layout__main">
            <div class="default-layout__container">
                <Nuxt />
            </div>
        </main>
    </section>
</template>

<script>
export default {
    name: 'DefaultLayout'
};
</script>

<style lang="scss">
@import '~assets/scss/default-layout';
</style>
