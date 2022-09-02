<template>
    <section class="login">
        <LoginForm />
    </section>
</template>

<script>
export default {
    auth: 'guest',
    layout: 'auth',
    middleware ({
        store,
        redirect
    }) {
        if (store.state.auth.loggedIn) {
            return redirect('/');
        }
    }
};
</script>

<style lang="scss">
@import '~assets/scss/login';
</style>
