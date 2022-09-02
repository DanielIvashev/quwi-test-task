import projectsRepository from './projects-repository';

export default $axios => ({
    projects: projectsRepository($axios)
});
