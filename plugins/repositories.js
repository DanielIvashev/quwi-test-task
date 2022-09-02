import createRepository from '~/repositories/repository';

export default ({ $axios }, inject) => {
    inject('repositories', createRepository($axios));
};
