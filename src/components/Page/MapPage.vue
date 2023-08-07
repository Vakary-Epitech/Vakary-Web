<!-- This component is used for the map page of the website
     It is not using the i18n system yet for a translation system => only available in english atm -->

<template>
  <div class="fadeshow1">
    <GMapMap :center="getCenterOfMap" :options="options" :zoom="mapZoom" style="width: 100vw; height: 100vh"
      ref="myMapRef">
      <GMapMarker :key="marker.label" v-for="marker in markersData" :position="marker.geolocalisation"
        :title="marker.label" :clickable="true" @click="openInfoWindow(marker.label, marker.geolocalisation)">
        <GMapInfoWindow :closeclick="true" @closeclick="openInfoWindow(null)" :opened="openedMarkerID === marker.label">
          <div>
            <div class="col-12">
              <h4>{{ marker.label }}</h4>
            </div>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
      <map-info></map-info>
      <GMapPolyline :options="{ strokeColor: '#000642' }" :path="selectedPath" ref="polyline" />
    </GMapMap>
  </div>

  <div class="boxPosition fadeshow1">
    <div class="widgetPanel">
      <Transition name="slide-fade">

        <div v-if="!displayItineraryInformation && !showItineraryCreationModal" :class="(itineraryDropdownStatus)">
          <div class="dropdown-trigger" @click="(setItineraryDropdownState())">
            <button class="dropdownDesignMapPage" :style="itineraryCssDropdown" aria-haspopup="true"
              aria-controls="dropdown-menu2">
              <span class="dropdownTextPosition">{{ $t("mapPage.itinerary") }}</span>
              <span class="icon is-small dropdownArrowPosition">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>

            <div v-if="this.itineraryDropdown" style="background-color: white;" class="dropdown-content">
              <div style="display: flex; flex-direction: row;" class="cursorOnButton"
                @click="callItineraryCreationModal()">
                <div class="cardBasicContainer" style="display: flex; width: 70%; height: 100%;">
                  <span class="cardBasicContainer dropdownCreateTextPosition">{{
                    $t("mapPage.newItinerary") }}</span>
                </div>
                <div class="dropdownPlusPlacement">
                  <img style="max-height: 8vh; float: right"
                    src="https://thenounproject.com/api/private/icons/1939717/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkelyDx9zHAaBM2c-I2z8OqRc69gxfkRuq_k-p69-dWetmWZQoWsvYdfQXFK3PmtXgIZ9EdiaxWOdqU4LIDr_-VRuy2A%3D%3D" />
                </div>
              </div>
              <div class="topBorder">&nbsp;</div>
              <div v-for="(itineraryDisplay, index) of this.$store.state.itineraryStore.itinerary"
                :key="itineraryDisplay.id">
                <Transition name="slide-fade">
                  <mapCards @click="itineraryCardsHasBeenClicked(index)" class="cardOnDropdown mt-2"
                    :itinerary="itineraryDisplay" :index="index" />
                </Transition>
                <div class="topBorder">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="showItineraryCreationModal">
          <itineraryModal @goBackToItineraryDropdown="showItineraryCreationModal = false" style="min-width: 400px" />
        </div>

        <div v-else>
          <itineratyExplanation @goBackToItineraryDropdown="goBackToItineraryDropdown" @checkNextPOI="checkNextPOI"
            @checkPreviousPOI="checkPreviousPOI" :selectedItineraryInfo="selectedItineraryInfo" />
        </div>
      </Transition>
    </div>
  </div>

  <div class="langButtonPos fadeshow1">
    <img :src="this.$store.state.userStore.userProfileImage" class="flag-button profileIcon"
    @click="showProfile = !showProfile; showGroupCreationModal = false; showItineraryCreationModal = false" />
    <languages></languages>
  </div>

  <Transition name="slide-fade">
    <div class="profileModalPosition fadeshow1" v-if="showProfile">
      <profileModal style="max-width:300px" />
    </div>
  </Transition>

  <section name="groupDropdown">
    <div class="groupDropdownPosition fadeshow1">
      <div class="widgetPanel">
        <Transition name="slide-fade">
          <div v-if="!displayItineraryInformation && !showGroupCreationModal && !groupHasBeenClicked"
            :class="(groupDropdownStatus)">
            <div class="dropdown-trigger" @click=" (setGroupDropdownState())">
              <button class="dropdownDesignMapPage" :style="groupCssDropdown" aria-haspopup="true"
                aria-controls="dropdown-menu2">
                <span class="dropdownTextPosition dropboxText">{{ $t("mapPage.group") }}</span>
                <span class="icon is-small dropdownArrowPosition">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>

              <div v-if="this.groupDropdown && !this.groupHasBeenClicked" style="background-color: white;"
                class="dropdown-content">

                <div style="display: flex; flex-direction: row;" class="cursorOnButton" @click=" callGroupCreation()">
                  <div class="dropboxText cardBasicContainer" style="display: flex; width: 70%; height: 100%;">
                    <span class="dropboxText cardBasicContainer dropdownCreateTextPosition">{{
                      $t("mapPage.newGroup") }}</span>
                  </div>
                  <div class="dropdownPlusPlacement">
                    <img style="max-height: 8vh; float: right"
                      src="https://thenounproject.com/api/private/icons/1939717/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkelyDx9zHAaBM2c-I2z8OqRc69gxfkRuq_k-p69-dWetmWZQoWsvYdfQXFK3PmtXgIZ9EdiaxWOdqU4LIDr_-VRuy2A%3D%3D" />
                  </div>
                </div>

                <div class="cursorOnButton" v-for="(group, index) in this.$store.state.groupStore.groups" :key="group.id">
                  <div class="topBorder mt-2">&nbsp;</div>
                  <div @click=" groupCardsHasBeenClicked(group, index)">
                    <i class="fas fa-users ms-4 mt-2"></i>
                    <i class="fas fa-person fa-lg me-3 mt-2" style="float: right"></i>
                    <Transition name="slide-fade">
                      <mapGroupCardsVue :groupName="group.name" :numberOfMember="group.emails.length" :index="index" />
                    </Transition>
                  </div>
                  <div v-if="shouldDisplayButton(group.emails)" class="row my-2">
                    <div class="col-12 text-center">
                      {{ $t("mapPage.invitation") }}
                    </div>
                    <div class="col-6 text-center">
                      <button class="button-invit" @click="groupInvitation(group.backendGroupId, true)">
                        <i class="fa-solid fa-check custom-check"></i>
                        <span class="ms-1">{{ $t("mapPage.accept") }}</span>
                      </button>
                    </div>
                    <div class="col-6 text-center">
                      <button class="button-invit" @click="groupInvitation(group.backendGroupId, false)">
                        <i class="fa-solid fa-xmark custom-xmark"></i>
                        <span class="ms-1">{{ $t("mapPage.decline") }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="showGroupCreationModal">
            <Transition name="slide-fade">
              <CreateGroup @goBackToGroupDropdown=" showGroupCreationModal = false" class="componentsGroupDropdown" />
            </Transition>
          </div>

          <div v-else-if="groupHasBeenClicked">
            <Transition name="slide-fade">
              <showMembers @change-group-photo="changeGroupPhoto"
                :groups=this.$store.state.groupStore.groups[selectedGroup] :key="keyShowGroup"
                @goBackToGroupDropdown=" groupHasBeenClicked = false; showGroupCreationModal = false; displayItineraryInformation = false"
                class="componentsGroupDropdown" />
            </Transition>
          </div>

        </Transition>
      </div>
    </div>
  </section>
  <div class="fadeshow2">
    <ScreenSizeTooSmall />
  </div>
</template>

<script>
import ScreenSizeTooSmall from '../UI/ScreenSizeTooSmall.vue'
import mapCards from '../UI/mapCards.vue';
import languages from '../UI/languagesModal.vue';
import itineratyExplanation from '../UI/itineraryExplanation.vue';
import mapGroupCardsVue from '../UI/mapGroupCards.vue';
import CreateGroup from '../UI/CreateGroup.vue';
import itineraryModal from '../UI/itineraryModal.vue';
import profileModal from '../UI/profileModal.vue';
import showMembers from '@/components/UI/ShowMembers.vue';

export default {
  name: 'App',
  components: {
    mapCards,
    CreateGroup,
    itineratyExplanation,
    mapGroupCardsVue,
    itineraryModal,
    profileModal,
    showMembers,
    ScreenSizeTooSmall,
    languages,
  },
  data() {
    return {
      displayItineraryInformation: false,
      showItineraryCreationModal: false,
      itineraryDropdown: false,
      groupDropdown: false,
      showGroupCreationModal: false,
      showProfile: false,
      groupHasBeenClicked: false,

      selectedItinerary: 0,
      selectedGroup: "",
      mapZoom: 12,
      openedMarkerID: null,
      waypoints: [],
      currentWaypointIndex: 0,
      createGroup: false,

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
    }
  },
  mounted() {
    this.$store.dispatch("getGroup").then(() => {
      this.$store.dispatch("getItinerary").catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    });
  },
  computed: {
    itineraryCssDropdown() {
      if (this.itineraryDropdown) {
        return ("border-radius: 20px 20px 0px 0px;");
      } else {
        return ("border-radius: 20px;");
      }
    },
    groupCssDropdown() {
      if (this.groupDropdown) {
        return ("border-radius: 20px 20px 0px 0px;");
      } else {
        return ("border-radius: 20px;");
      }
    },
    selectedPath() {
      return (this.$store.state.itineraryStore.waypoints);
    },
    selectedItineraryInfo() {
      return (this.$store.state.itineraryStore.itinerary[this.selectedItinerary - 1])
    },
    getCenterOfMap() {
      if (this.selectedItinerary == 0 || !this.$store.state.itineraryStore.itinerary[this.selectedItinerary - 1])
        return ({
          lat: 49.1172801,
          lng: 6.21190790000003
        });
      else {
        return ({
          lat: this.$store.state.itineraryStore.itinerary[this.selectedItinerary - 1].itineraryPOI[this.currentWaypointIndex].Localisation.latitude,
          lng: this.$store.state.itineraryStore.itinerary[this.selectedItinerary - 1].itineraryPOI[this.currentWaypointIndex].Localisation.longitude,
        });
      }
    },
    itineraryDropdownStatus() {
      if (this.itineraryDropdown) {
        return ("dropdown is-active");
      } else {
        return ("dropdown");
      }
    },
    groupDropdownStatus() {
      if (this.groupDropdown) {
        return ("dropdown is-active");
      } else {
        return ("dropdown");
      }
    },
    markersData() {
      return (this.$store.state.itineraryStore.marker);
    },
  },
  methods: {
    shouldDisplayButton(emails) {
      for (let mail in emails) {
        if (emails[mail].emails == this.$store.state.userStore.mail) {
          if (emails[mail].status == "pending")
            return true;
          else
            return false;
        }
      }
    },
    groupInvitation(backendGroupId, status) {
      this.$store.dispatch("groupInvitation", { backendGroupId: backendGroupId, status: status, email: this.$store.state.userStore.mail }).then(() => {
        this.$store.dispatch("getItinerary").catch((error) => {
          console.log(error);
        })
        this.$store.dispatch("getGroup").catch((error) => {
          console.log(error);
        })
      });
    },
    itineraryCardsHasBeenClicked(itineraryId) {
      this.selectedItinerary = itineraryId + 1;
      this.displayItineraryInformation = true;
      this.mapZoom = 15;
    },
    goBackToItineraryDropdown() {
      this.currentWaypointIndex = 0;
      this.selectedItinerary = 0;
      this.displayItineraryInformation = false;
      this.mapZoom = 12;
      this.$store.commit("CLEAR_PATH");
    },
    groupCardsHasBeenClicked(group, index) {
      if (!this.shouldDisplayButton(group.emails)) {
        this.selectedGroup = index;
        this.groupHasBeenClicked = true;
        this.showItineraryCreationModal = false;
        this.showProfile = false;
      }
    },
    goBackToGroupDropdown() {
      this.displayGroupInformation = true;
      this.groupHasBeenClicked = false;
    },
    checkNextPOI() {
      this.currentWaypointIndex += 1;
    },
    checkPreviousPOI() {
      this.currentWaypointIndex -= 1;
    },
    setItineraryDropdownState() {
      this.$store.dispatch("getItinerary").catch((error) => {
        console.log(error);
      })
      this.itineraryDropdown = !this.itineraryDropdown;
    },
    setGroupDropdownState() {
      this.groupDropdown = !this.groupDropdown;
      if (this.groupDropdown) {
        this.$store.dispatch("getGroup").catch((error) => {
          console.log(error);
        })
      }
    },

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
      // This function is used to get the informations about the path between two points
      // Display informations about the path like the total duration and the total distance
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
        this.$store.dispatch("resetSelectedMarker").catch((error) => {
          console.log(error);
        });
      else if (geolocalisation)
        this.$store.dispatch("markerHasBeenSelected", geolocalisation).catch((error) => {
          console.log(error);
        });
      this.openedMarkerID = label;
    },


    frenchLanguage() {
      this.$i18n.locale = "fr";
    },
    engLanguage() {
      this.$i18n.locale = "en";
    },
    callGroupCreation() {
      this.showGroupCreationModal = true;
      this.showItineraryCreationModal = false;
      this.showProfile = false;
    },

    callItineraryCreationModal() {
      this.showItineraryCreationModal = !this.showItineraryCreationModal;
      this.showGroupCreationModal = false;
      this.showProfile = false;
    },

    update(object) {
      const fileReader = new FileReader();
      fileReader.onload = () => { }
      if (object.photo) {
        fileReader.readAsDataURL(object.photo);
      }
    },
    createGroupe() {
      this.createGroup = true;
    },

  },
}
</script>

<style scoped>
.button-invit {
  background-color: #fff;
  border: solid 1px rgb(192, 150, 40);
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
}

.button-invit:hover {
  background-color: rgb(192, 150, 40);
  color: white;
}

.custom-check {
  color: green;
}

.custom-xmark {
  color: red;
}

.componentsGroupDropdown {
  min-width: 400px;
  max-height: 300px !important;
  margin: 1vh;
  height: 10%;
}

.fa-plus {
  border-radius: 100%;
  padding: 7px 8px;
  border: 1px solid black;
}

.boxPosition {
  position: absolute;
  z-index: 1;
  top: 4vh;
  left: 2vw;
}

.groupDropdownPosition {
  position: absolute;
  top: calc(80px + 4vh);
  left: 2vw;
}

.widgetPanel {
  display: flex;
  max-width: 400px;
  flex-direction: column;
  /* max-height: 70vh; */
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  transform: translate(0, -2vh);
  border-radius: 0px 0px 20px 20px;
  padding-bottom: 20px;
  max-height: 400px;
  overflow: auto;
}

.dropdownArrowPosition {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.dropdownTextPosition {
  margin: auto;
  margin-left: 10px;
  font-size: calc(12px + 0.4vw);
}

.cursorOnButton {
  cursor: pointer;
}

.cursorOnButton:hover {
  background-color: #e7e7e7;
}

.newItineraryButton {
  height: 5vh;
  margin-top: 6px;
  margin-bottom: 6px;
}

.cardOnDropdown {
  cursor: pointer;
  margin: 1vh;
  height: 50px;
}

.cardOnDropdown:hover {
  background-color: #e7e7e7;
}

.topBorder {
  width: 80%;
  height: 1px;
  margin: 0px auto;
  border-bottom: 1px solid rgb(192, 150, 40);
}

.dropdownDesignMapPage {
  display: flex;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border: none;
  height: 6vh;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-right: 1vw;
  margin-top: 5px;
  margin-bottom: 5px;
  min-width: 400px;
  min-height: 60px;
}

.slide-fade-enter-active {
  position: absolute;
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.langButtonPos {
  display: flex;
  position: absolute;
  align-content: right;
  align-items: right;
  margin: 5px;
  right: 0px;
  flex-direction: row;
  top: 15px;
}

.profileIcon {
  border-radius: 6px;
}

.profileModalPosition {
  position: absolute;
  top: 10vh;
  left: calc(98.5vw - 300px);
}

.dropdownPlusPlacement {
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: right;
}

.dropdownCreateTextPosition {
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 767px) {
  .fadeshow1 {
    display: none;
  }
}

@media only screen and (min-width: 767px) {
  .fadeshow2 {
    display: none;
  }
}
</style>
