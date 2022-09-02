<template>
    <div class="login-form">
        <NuxtLink
            :to="{ name: 'Login' }"
            class="login-form__logo-link"
        >
            <img
                src="~assets/img/quwi-logo.svg"
                alt="quwi"
                class="login-form__logo"
            >
        </NuxtLink>
        <BaseInput
            :value="email.value"
            :label="email.label"
            :type="email.type"
            :placeholder="email.placeholder"
            :error="email.error"
            @input="email = $event"
        />
        <BaseInput
            :value="password.value"
            :label="password.label"
            :type="password.type"
            :placeholder="password.placeholder"
            :error="password.error"
            @input="password = $event"
        />
        <BaseButton
            :loading="isLoading"
            label="login"
            class="login-form__submit-btn"
            @click.native="login"
        />
        <NuxtLink
            :to="{ name: 'Login' }"
            class="login-form__forgot-pass"
        >
            Forgot password?
        </NuxtLink>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    computed: {
        isLoading () {
            return this.$store.getters['login/isLoginLoading'];
        },
        email: {
            get () {
                return this.$store.getters['login/getForm']?.email || {};
            },
            set (value) {
                this.updateForm({
                    fieldName: 'email',
                    value,
                    property: 'value'
                });
            }
        },
        password: {
            get () {
                return this.$store.getters['login/getForm']?.password || {};
            },
            set (value) {
                this.updateForm({
                    fieldName: 'password',
                    value,
                    property: 'value'
                });
            }
        }
    },
    methods: {
        updateForm ({
            fieldName,
            value,
            property
        }) {
            this.$store.commit('login/UPDATE_FORM', {
                fieldName,
                value,
                property
            });
        },
        login () {
            const {
                email,
                password
            } = {
                email: this.email.value,
                password: this.password.value
            };
            if (!email || !password) {
                [['email', email], ['password', password]]
                    .forEach(([fieldName, value]) => !value && this.updateForm({
                        fieldName,
                        value: `${fieldName} can not be blank`,
                        property: 'error'
                    }));
                return;
            }

            this.$store.dispatch('login/login');
        }
    }
};
</script>

<style lang="scss">
@import '~assets/scss/login-form';
</style>
