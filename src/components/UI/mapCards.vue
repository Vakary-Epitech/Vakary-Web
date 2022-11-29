<template>
    <div class="cardBasicContainer">
        <div>
            <span class="evenSmallerText">{{ this.id }}. </span>
            <span class="textBasicMargin evenSmallerText">{{ this.city }}</span>
            <span class="textBasicMargin alignRight evenSmallerText">Groupe: {{ this.groupe }}</span>
        </div>
        <span class="evenSmallerText">{{ this.time }}</span>
    </div>
</template>

<script>
export default {
    props: ["city", "time", "groupe", "id"],
}
</script>

<style scoped>
.cardBasicContainer {
    height: 5vh;
    margin-top: 6px;
    margin-bottom: 6px;
}

.textBasicMargin {
    margin-left: 2px;
    margin-right: 2px;
}

.alignRight {
    float: right;
}

</style>