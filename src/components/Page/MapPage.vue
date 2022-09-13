<template>
  <div>
    <GMapMap :center="userPosition" :zoom="12" map-type-id="terrain" style="width: 100vw; height: 70vh" ref="myMapRef">
      <GMapMarker :key="marker.label" v-for="marker in markersData" :position="marker.geolocalisation"
        :title="marker.label" :clickable="true" @click="openInfoWindow(marker.label, marker.geolocalisation)">
        <GMapInfoWindow :closeclick="true" @closeclick="openInfoWindow(null)" :opened="openedMarkerID === marker.label">
          <div>
            <li>Label : {{ marker.label }}</li>
            <li>description : {{ marker.description }}</li>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
      <map-info></map-info>
      <GMapPolyline :path="path" :editable="true" ref="polyline" />
    </GMapMap>
    <div>
      Map Page</div>
    <div>
      <button @click="increaseWaypointsIndex">Increase waypoints index</button>
      <button @click="drawPathBetweenSelectedPoint">Draw path between selected point</button>
    </div>
    <div>
      <span>selected Point : {{ $store.state.mapStore.selectedMarker }}</span>
    </div>
    <div>
      <div v-for="locomotionType in locomotionMethod" :key="locomotionType.id">
        <span>{{ locomotionType.locomotionType }}</span>
        <input type="radio" :value=locomotionType.locomotionType v-model="$store.state.mapStore.selectedMethodOfLocomotion" />
      </div>
    </div>
  </div>
</template>

<script>
import MapInfo from './mapInfo.vue';

export default {
  name: 'App',
  components: {
    MapInfo,
  },
  data() {
    return {
      openedMarkerID: null,
      waypoints: [],
      currentWaypointIndex: 0,
      path: [],
      locomotionMethod: [
        { id: 1, locomotionType: "walking" },
        { id: 2, locomotionType: "driving" },
        { id: 3, locomotionType: "bicycling" },
        { id: 4, locomotionType: "transit" },
      ],
      selectedLocomotionType: "walking",
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
    addCenterControl(controlDiv) {
      const controlUI = document.createElement('div');

      controlDiv.appendChild(controlUI);
      if (this.currentWaypointIndex == this.path.length - 1) {
        controlUI.innerHTML = '<div style="background: white; padding: 1rem;"><h2>Finished</h2></div>'
      } else {
        const currentWaypoint = this.waypoints[this.currentWaypointIndex];
        controlUI.innerHTML = '<div style="background: white; padding: 1rem; margin-top: 10px"><li>' + currentWaypoint.duration.text + '</li><li>' + currentWaypoint.distance.text + '</li><li>' + currentWaypoint.instruction + '</li></div>';
      }
    },

    increaseWaypointsIndex() {
      this.currentWaypointIndex += 1;
      if (this.currentWaypointIndex > this.path.length - 1)
        this.currentWaypointIndex = 0;
      this.$refs.myMapRef.$mapPromise.then((map) => {
        const centerControlDiv = document.createElement('div');
        this.addCenterControl(centerControlDiv, map);
        map.controls[google.maps.ControlPosition.TOP_LEFT].clear(); // eslint-disable-line no-undef
        map.controls[google.maps.ControlPosition.TOP_LEFT].push( // eslint-disable-line no-undef
          centerControlDiv
        );
      });
    },

    openInfoWindow(label, geolocalisation) {
      if (this.$store.state.mapStore.selectedMarker.length > 2)
        this.$store.dispatch("resetSelectedMarker");
      else if (geolocalisation)
        this.$store.dispatch("markerHasBeenSelected", geolocalisation);
      this.openedMarkerID = label;
    },

    drawPathBetweenSelectedPoint() {
      if (this.$store.state.mapStore.selectedMarker.length == 2) {
        this.$store.dispatch("calculatePath").then((steps) => {
          this.waypoints = [];
          this.path = [];
          let index = 0;

          steps.data.forEach(element => {
            let points = {};
            points.duration = element.duration;
            points.instruction = element.html_instructions;
            points.distance = element.distance;
            points.location = element.start_location;
            this.waypoints.push(points);
            this.path.push(element.start_location);
            if (index == steps.data.length - 1) {
              points.location = element.end_location;
              this.waypoints.push(points);
              this.path.push(element.end_location);
            }
            index += 1;
          });
          this.$refs.myMapRef.$mapPromise.then((map) => {
            const centerControlDiv = document.createElement('div');
            this.addCenterControl(centerControlDiv, map);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push( // eslint-disable-line no-undef
              centerControlDiv
            );
          });
        });
      }
    },
  },
}
</script>

<style scoped>

</style>
