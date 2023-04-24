<template>
    <div class="cardBasicContainer">
        <div>
            <span class="dropboxText">{{ this.id }}. </span>
            <span class="textBasicMargin dropboxText">{{ this.city }}</span>
            <span class="textBasicMargin alignRight dropboxText">{{ $t("mapPage.group") }}: {{ this.groupe }}</span>
        </div>
        <div>
            <span class="dropboxText">{{ this.time }}</span>
            <span class="dropboxText textBasicMargin alignRight">{{ this.date }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["city", "time", "groupe", "id", "date"],
}
</script>

<style scoped>

.textBasicMargin {
    margin-left: 2px;
    margin-right: 2px;
}

.alignRight {
    float: right;
}
</style>