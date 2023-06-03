<template>
    <div>
        <div class="row">
            <div class="col-4">
                <img :src="group.photo" class="w-100" />
            </div>
            <div class="col-8">
                <h3>{{ group.name }}</h3>
                <div v-if="group.emails">
                    <p>{{ $t('cardsGroup.members') }} : {{ group.emails?.length }}</p>
                    <p>Admin: {{ group.emails[0]?.emails }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["group"],
}
</script>

<style scoped>

</style>
