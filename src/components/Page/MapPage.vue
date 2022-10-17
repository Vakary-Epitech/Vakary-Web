<template>
  <div>
    <top-bar class="col-12"/>
    
    <GMapMap :center="userPosition" :options="options" :zoom="12" style="width: 100vw; height: 70vh" ref="myMapRef">
      <GMapMarker :position="userPosition" />
      <GMapMarker :key="marker.label" v-for="marker in markersData" :position="marker.geolocalisation"
      :title="marker.label" :clickable="true" @click="openInfoWindow(marker.label, marker.geolocalisation)">
      <GMapInfoWindow :closeclick="true" @closeclick="openInfoWindow(null)" :opened="openedMarkerID === marker.label">
            <div>
              <div class="col-12">
                <h4>{{ marker.label }}</h4>
              </div>
              <div class="col-12">
                <span>{{ marker.description }}</span>
              </div>
            </div>
          </GMapInfoWindow>
        </GMapMarker>
        <map-info></map-info>
        <GMapPolyline :options="{strokeColor:'#000642'}"  :path="path" ref="polyline" />
    </GMapMap>
    <div>
      Map Page</div>
    <div>
      <button @click="increaseWaypointsIndex">Increase waypoints index</button>
      <button @click="drawPathBetweenSelectedPoint">Draw path between selected point</button>
      <button @click="infos">Infos</button>
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
import mapInfo from './MapInfo.vue';
import topBar from '../UI/TopBar.vue';
export default {
  name: 'App',
  components: {
    topBar,
    mapInfo,
  },
  data() {
    return {
      openedMarkerID: null,
      waypoints: [],
      currentWaypointIndex: 0,
      path: [],
      options: {
        disableDefaultUI: true,              
        styles: [
          {
            featureType: 'landscape',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            stylers: [{ visibility: 'off' }],
          }
        ],
      },
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
      controlUI.id = 'centerControl';
      controlDiv.appendChild(controlUI);
      if (this.currentWaypointIndex == this.path.length - 1) {
        controlUI.innerHTML = '<div style="background: white; padding: 1rem;"><h2>Finished</h2></div>'
      } else {
        const currentWaypoint = this.waypoints[this.currentWaypointIndex];
        controlUI.innerHTML = '<div style="background: white; padding: 1rem; margin-top: 10px"><div class="col-12 text-start">Duration: ' + currentWaypoint.duration.text + '</div><div class="col-12 text-start">Distance: ' + currentWaypoint.distance.text + '</div><div class="col-12 text-start">' + currentWaypoint.instruction + '</div></div>';
      }
    },

    infos() {
      if (this.$store.state.mapStore.selectedMarker.length < 2 || this.waypoints.length == 0) {
        return;
      }
      let totalTime = 0;
      let totalDistance = 0;
      for (let i = 0; i < this.waypoints.length; i++) {
        totalTime += this.waypoints[i].duration.value;
        totalDistance += this.waypoints[i].distance.value;
      }
      let hours = Math.floor(totalTime / 3600);
      let minutes = Math.floor((totalTime % 3600) / 60);
      let seconds = totalTime % 60;
      let time = "";
      if (hours > 0) {
        time = hours + "h " + minutes + "m " + seconds + "s";
      } else {
        time = minutes + "m " + seconds + "s";
      }
      let km = Math.floor(totalDistance / 1000);
      let m = totalDistance % 1000;
      let distance = "";
      if (km > 0) {
        distance = km + "." + m + "km";
      } else {
        distance = m + "m";
      }
      const infoDiv = document.createElement('div');
      infoDiv.id = 'infoDiv';
      this.$refs.myMapRef.$mapPromise.then((map) => {
        infoDiv.innerHTML = '<div style="background: white; padding: 1rem;"><h3>Total Time :' + time + '</h3><h3>Total Distance: ' + distance + '</h3></div>'
        map.controls[google.maps.ControlPosition.TOP_RIGHT].clear(); // eslint-disable-line no-undef
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push( // eslint-disable-line no-undef
          infoDiv
        );
      });    
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
