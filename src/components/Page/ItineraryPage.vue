<template>
    <div class="main-box">
        <div>
            <img src="@/assets/New-York-City-banner.jpg" alt="beauf">
        </div>
        <h2>
            Create your itinerary
        </h2>
        <div class="demo-time-range">
            <h4>
                What is the start time of the itinenary ?
            </h4>
            <el-time-select v-model="startTime" :max-time="endTime" class="m-4 input-itinerary" placeholder="Start time"
                start="00:00" step="00:15" end="23:45" />
            <h4>
                What is the end time of the itinenary ?
            </h4>
            <el-time-select v-model="endTime" class="input-itinerary" :min-time="startTime" placeholder="End time"
                start="00:00" step="00:15" end="23:45" />
        </div>
        <div>
            <h4>
                What is the budget for the itinerary itinenary ?
            </h4>
            <div>
                <el-input-number v-model="budget" :placeholder="Budget" :precision="2" :step="0.1" :max="10000" />
            </div>
        </div>
        <div>
            <h4>
                how many people are there ?
            </h4>
            <div>
                <span class="input-itinerary">
                    <el-input-number v-model="adult" :min="0" :max="100" @change="handleChange" />
                    <span class="text-margin">
                        Adult
                    </span>
                </span>
                <span class="input-itinerary">
                    <el-input-number v-model="child" :min="0" :max="100" @change="handleChange" />
                    <span class="text-margin">
                        Child
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')
const budget = ref('')
const adult = ref('')
const child = ref('')
</script>

<style>
.main-box {
    max-width: 100%;
    overflow-x: hidden
}

.input-itinerary {
    margin: 15px;
}

.text-margin {
    margin-left: 10px;
}
</style>