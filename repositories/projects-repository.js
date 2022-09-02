export default $axios => ({
    projects () {
        return $axios.get('/projects-manage/index');
    },
    updateProject (params, payload) {
        return $axios.post('/projects-manage/update', payload, { params });
    }
});
