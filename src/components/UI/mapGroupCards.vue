<template>
    <div class="cardBasicContainer">
        <div>
            <span class="dropboxText textBasicMargin">{{ $t("groupCards.group") }} {{ this.groupName }} </span>
            <span class="dropboxText textBasicMargin alignRight">{{ $t("groupCards.numberOfMembers") }} {{ this.numberOfMember }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["groupName", "numberOfMember"],
}
</script>

<style scoped>
.cardBasicContainer {
    height: 5vh;
    margin-top: 6px;
    margin-bottom: 6px;
    padding: 10px;
}

.textBasicMargin {
    margin-left: 2px;
    margin-right: 2px;
}

.alignRight {
    float: right;
}
</style>