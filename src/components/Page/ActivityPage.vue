<template>
    <div>
        HELLO WORLD
        {{activity.label}}
    </div>
</template>

<script>
export default {
    name: 'ActivityPage',
    props: {
        activity: {
            type: Object,
            required: true
        },
    },
};
</script>

<style>
</style>