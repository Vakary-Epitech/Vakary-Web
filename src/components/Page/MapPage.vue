<template>
  <div>
    <GMapMap :center="userPosition" :zoom="15" map-type-id="terrain" style="width: 100vw; height: 70vh"
      :disableDefaultUI="true">
      <GMapMarker :key="marker.label" v-for="marker in markersData" :position="marker.geolocalisation"
        :title="marker.label" :clickable="true" @click="openInfoWindow(marker.label)">
        <GMapInfoWindow :closeclick="true" @closeclick="openInfoWindow(null)" :opened="openedMarkerID === marker.label">
          <div>
            <li>Label : {{ marker.label }}</li>
            <li>description : {{ marker.description }}</li>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
      <GMapPolyline :path="path" :editable="true" ref="polyline" />
    </GMapMap>
    <div>
      Map Page</div>
    <div>
      <button @click="firstPath">First path</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      openedMarkerID: null,
      path: [],
    }
  },
  computed: {
    userPosition() {
      return ({
        lat: this.$store.state.userStore.currentUserLocation.latitude,
        lng: this.$store.state.userStore.currentUserLocation.longitude
      });
    },
    markersData() {
      return (this.$store.state.mapStore.marker);
    }
  },
  methods: {
    openInfoWindow(label) {
      this.openedMarkerID = label;
      console.log(label);
    },
    firstPath() {
      this.$store.dispatch("calculatePath").then((steps) => {
        this.path = [];
        steps.data.forEach(element => {
          this.path.push(element.end_location);
        });
      });
    },
  }
}
</script>

<style scoped>
</style>
