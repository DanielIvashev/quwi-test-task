export const state = () => ({
    app_init: {}
});

export const getters = {};

export const mutations = {
    APP_INIT (state, { data }) {
        state.app_init = data;
    }
};

export const actions = {};
