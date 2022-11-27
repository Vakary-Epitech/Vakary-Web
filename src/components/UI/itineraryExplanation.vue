<template>
    <div class="explanatoryCardDesign">
        <div>
            <button @click="goBackToItineraryDropdown">Go back</button>
            <span>City : {{ this.selectedItineraryInfo.city }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["selectedItineraryInfo"],
    methods: {
        goBackToItineraryDropdown() {
            this.$emit("goBackToItineraryDropdown");
        }
    }
}
</script>

<style scoped>
.explanatoryCardDesign {
    display: flex;
    background-color: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 15px;
    border: none;
    font-size: calc(12px + 0.4vw);
    width: 20vw;
    height: 60vh;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}
</style>