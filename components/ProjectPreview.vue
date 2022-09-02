<template>
    <div>
        <div class="project-preview" @click="showEditModal">
            <div class="project-preview__name-wrapper">
                <div class="project-preview__project-logo">
                    <img :src="project.logo_url" alt="">
                </div>
                <div class="project-preview__name">
                    <span>{{ project.name }}</span>
                </div>
            </div>
            <div class="project-preview__status-wrapper">
                <span :class="['project-preview__status', { 'active': project.is_active }]">
                    {{ project.is_active ? 'Active' : 'Disabled' }}
                </span>
            </div>
            <div class="project-preview__time-wrapper">
                <div class="project-preview__time-item">
                    <span class="project-preview__time-label">
                        Total
                    </span>
                    <span class="project-preview__time-value">
                        {{ spentSecondsToFormat }}
                    </span>
                </div>
            </div>
        </div>
        <modal
            :name="project.id + project.name"
            :shift-y="0.6"
            :adaptive="true"
            class="project-preview__edit-modal"
            @click.stop="() => {}"
        >
            <div class="project-preview__edit-project">
                <BaseInput
                    :value="name.value"
                    :label="name.label"
                    :type="name.type"
                    :placeholder="name.placeholder"
                    :error="name.error"
                    @input="name = $event"
                />
                <BaseButton
                    label="Update"
                    :loading="isUpdating"
                    class="project-preview__edit-save"
                    @click.native="updateProject"
                />
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        spentSecondsToFormat () {
            const sec = parseInt(this.project.spent_sec_all_time, 10);

            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec - (h * 3600)) / 60);
            let s = sec - (h * 3600) - (m * 60);

            if (h < 10) {
                h = '0' + h;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }
            return `${h}:${m}:${s}`;
        },
        name: {
            get () {
                return this.$store.getters['projects/getForm']?.name || {};
            },
            set (value) {
                this.updateForm({
                    fieldName: 'name',
                    value,
                    property: 'value'
                });
            }
        },
        isUpdating () {
            return this.project.id in this.$store.getters['projects/getUpdatingIds'];
        }
    },
    methods: {
        updateForm ({
            fieldName,
            value,
            property
        }) {
            this.$store.commit('projects/UPDATE_FORM', {
                fieldName,
                value,
                property
            });
        },
        showEditModal () {
            this.updateForm({
                fieldName: 'name',
                value: this.project.name,
                property: 'value'
            });
            this.$modal.show(this.project.id + this.project.name);
        },
        updateProject () {
            const {
                name
            } = {
                name: this.name.value
            };
            if (!name) {
                [['name', name]]
                    .forEach(([fieldName, value]) => !value && this.updateForm({
                        fieldName,
                        value: `${fieldName} can not be blank`,
                        property: 'error'
                    }));
                return;
            }
            this.$store.dispatch('projects/updateProject', { id: this.project.id });
        }
    }
};
</script>

<style lang="scss">
@import '~assets/scss/project-preview';
</style>
