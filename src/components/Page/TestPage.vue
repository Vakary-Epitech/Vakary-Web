<template>
  <div>
    <main>
      <div class="card-container">
        <cardsTinder     
        v-for="(card, index) in cards"
        :key="index"
        :index="index"
        :initialX="card.initialX"
        :initialY="card.initialY"
        @swipe="handleSwipe"></cardsTinder>
      </div>
    </main>
  </div>
</template>

<script>
import cardsTinder from '../UI/CardsTinder.vue';
export default {
  components: {
    cardsTinder
  },
  data() {
    return {
      cards: [
        { initialX: 0, initialY: 0}
      ]
    }
  },
  methods: {
    handleSwipe(direction, index) {
      if (direction === "right") {
        console.log("Swiped right on card with index " + index);
      }
      if (direction === "left") {
        console.log("Swiped left on card with index " + index);
      }
      const swipedCard = this.cards[index];
      this.cards.push({ initialX: swipedCard.initialX, initialY: swipedCard.initialY });
      this.cards.splice(index, 1);
    },
  }
}
</script>
<style scoped>
.card-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
