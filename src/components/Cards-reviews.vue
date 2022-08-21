<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-start">{{username}}</h5>
                <hr>
                <p class="card-text text-start">{{review}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardReviews',
        props: {
            username: {
                type: String,
                required: true
            },
            review: {
                type: String,
                required: true
            },
        }
    };
</script>

<style>
</style>