import Vue from 'vue';

export const state = () => ({
    projects: [],
    loading: false,
    form: {
        name: {
            value: '',
            placeholder: 'Name',
            error: null,
            label: 'Name'
        }
    },
    error: null,
    updateProjectLoading: {},
    updateProjectError: null
});

export const getters = {
    getProjects (state) {
        return state.projects;
    },
    getForm (state) {
        return state.form;
    },
    getUpdatingIds (state) {
        return state.updateProjectLoading;
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
    PROJECTS_START (state) {
        state.loading = true;
        state.error = null;
    },
    PROJECTS_SUCCESS (state, { projects }) {
        state.loading = false;
        state.error = null;
        state.projects = projects;
    },
    PROJECTS_FAILED (state, { error }) {
        state.loading = false;
        state.error = error;
    },
    UPDATE_PROJECT_START (state, { id }) {
        Vue.set(state.updateProjectLoading, id, true);
        state.updateProjectError = null;
    },
    UPDATE_PROJECT_SUCCESS (state, {
        id,
        project
    }) {
        Vue.delete(state.updateProjectLoading, id);
        state.updateProjectError = null;
        state.projects = state.projects.map(proj => proj.id === id ? project : proj);
    },
    UPDATE_PROJECT_FAILED (state, {
        error,
        id
    }) {
        Vue.delete(state.updateProjectLoading, id);
        state.updateProjectError = error;
    }
};

export const actions = {
    loadProjects ({
        commit
    }) {
        commit('PROJECTS_START');
        return this.$repositories.projects.projects()
            .then(response => {
                if (response?.status === 200) {
                    commit('PROJECTS_SUCCESS', { projects: response.data?.projects });
                } else {
                    throw new Error('get projects failed');
                }
            })
            .catch(error => {
                commit('PROJECTS_FAILED', { error });
            });
    },
    updateProject ({
        commit,
        getters
    }, { id }) {
        commit('UPDATE_PROJECT_START', { id });
        const updatedProj = Object.entries(getters.getForm).reduce((acc, [fieldName, fieldData]) => {
            acc[fieldName] = fieldData.value;
            return acc;
        }, {});
        return this.$repositories.projects.updateProject({ id }, updatedProj)
            .then(response => {
                if (response?.status === 200) {
                    commit('UPDATE_PROJECT_SUCCESS', {
                        id,
                        project: response.data.project
                    });
                } else {
                    throw new Error('update project failed');
                }
            })
            .catch(error => {
                if (error?.response?.data?.first_errors) {
                    Object.entries(error.response.data.first_errors).forEach(([fieldName, value]) => {
                        commit('UPDATE_FORM', {
                            fieldName,
                            property: 'error',
                            value
                        });
                    });
                }
                commit('UPDATE_PROJECT_FAILED', {
                    error,
                    id
                });
            });
    }
};
