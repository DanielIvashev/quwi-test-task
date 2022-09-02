export const state = () => ({
    form: {
        email: {
            value: '',
            placeholder: 'Email',
            error: null,
            label: 'Email'
        },
        password: {
            value: '',
            placeholder: 'Password',
            error: null,
            type: 'password',
            label: 'Password'
        }
    },
    loginLoading: false,
    loginError: null,
    logoutLoading: false,
    logoutError: null
});

export const getters = {
    getForm (state) {
        return state.form;
    },
    isLoginLoading (state) {
        return state.loginLoading;
    },
    isLogoutLoading (state) {
        return state.logoutLoading;
    }
};

export const mutations = {
    UPDATE_FORM (state, {
        fieldName,
        property,
        value
    }) {
        state.form[fieldName][property] = value;
        if (property === 'value') {
            state.form[fieldName].error = null;
        }
    },
    LOGIN_START (state) {
        state.loginLoading = true;
        state.loginError = null;
    },
    LOGIN_SUCCESS (state) {
        state.loginLoading = false;
        state.loginError = null;

        const formItems = Object.entries(state.form);
        formItems.forEach(([key, value]) => {
            value.value = '';
        });
    },
    LOGIN_FAILED (state, { error }) {
        state.loginLoading = false;
        state.loginError = error;
    },
    LOGOUT_START (state) {
        state.logoutLoading = true;
        state.logoutError = null;
    },
    LOGOUT_SUCCESS (state) {
        state.logoutLoading = false;
        state.logoutError = null;
    },
    LOGOUT_FAILED (state, { error }) {
        state.logoutLoading = false;
        state.logoutError = error;
    }
};

export const actions = {
    login ({
        commit,
        getters
    }) {
        commit('LOGIN_START');
        const {
            email: { value: emailVal },
            password: { value: passVal }
        } = getters.getForm;
        return this.$auth.loginWith('local', {
            data: {
                email: emailVal,
                password: passVal
            }
        })
            .then(response => {
                if (response?.status === 200) {
                    commit('LOGIN_SUCCESS');
                } else {
                    throw new Error('Login failed');
                }
            })
            .catch(({ response } = {}) => {
                if (response.data && response.data.first_errors) {
                    Object.entries(response.data.first_errors).forEach(([fieldName, value]) => {
                        commit('UPDATE_FORM', {
                            fieldName,
                            property: 'error',
                            value
                        });
                    });
                }
                commit('LOGIN_FAILED', { error: response });
            });
    },
    logout ({ commit }) {
        commit('LOGOUT_START');
        return this.$auth.logout()
            .then(response => {
                if (response?.status === 200) {
                    commit('LOGOUT_SUCCESS');
                }
            })
            .catch(({ response } = {}) => {
                commit('LOGIN_FAILED', { error: response });
            });
    }
};
