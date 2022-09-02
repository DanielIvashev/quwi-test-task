<template>
    <div class="projects-list">
        <ProjectPreview v-for="project in projects" :key="project.id" :project="project" />
    </div>
</template>

<script>
export default {
    fetch () {
        return this.$store.dispatch('projects/loadProjects');
    },
    computed: {
        projects () {
            return this.$store.getters['projects/getProjects'] || [];
        }
    }
};
</script>

<style lang="scss">
@import '~assets/scss/projects-list';
</style>
