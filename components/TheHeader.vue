<template>
    <header class="header">
        <div class="header__inner">
            <NuxtLink
                to="/"
                class="header__logo-link"
            >
                <img
                    src="~assets/img/quwi-logo.svg"
                    alt="Quwi"
                >
            </NuxtLink>
            <div
                :class="['header__nav', { 'active': isSidebarOpen }]"
                data-header-nav
                @click="onNavClick"
            >
                <nav :class="['header__nav-menu', { 'active block': isSidebarOpen }]">
                    <ul class="header__nav-list">
                        <li
                            v-if="$auth.loggedIn"
                            class="header__nav-list-item"
                        >
                            <a @click="logout">
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>
                <button
                    type="button"
                    :class="['header__burger', { 'active': isSidebarOpen }]"
                    @click="isSidebarOpen = !isSidebarOpen"
                >
                    <span class="header__burger-inner">
                        <span class="header__burger-line"></span>
                        <span class="header__burger-line"></span>
                        <span class="header__burger-line"></span>
                    </span>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'TheHeader',
    data () {
        return {
            isSidebarOpen: false
        };
    },
    methods: {
        onNavClick (e) {
            if ('headerNav' in e.target.dataset && this.isSidebarOpen) {
                this.isSidebarOpen = false;
            }
        },
        logout () {
            this.$store.dispatch('login/logout');
        }
    }
};
</script>

<style lang="scss">
@import '~assets/scss/header';
</style>
