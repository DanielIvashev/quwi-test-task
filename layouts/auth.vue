<template>
    <section class="auth-layout">
        <TheHeader />
        <main class="auth-layout__main">
            <div class="auth-layout__container">
                <Nuxt />
            </div>
        </main>
    </section>
</template>

<script>
export default {
    name: 'AuthLayout'
};
</script>

<style lang="scss">
@import '~assets/scss/auth-layout';
</style>
