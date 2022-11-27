<template>
    <div>
        <span>{{ this.city }}</span>
        <span>{{ this.time }}</span>
        <span>{{ this.groupe }}</span>
    </div>
</template>

<script>
export default {
    props: ["city", "time", "groupe"],
}
</script>

<style scoped>

</style>