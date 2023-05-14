<!-- This component is used for the map page of the website
     It is not using the i18n system yet for a translation system => only available in english atm -->

<template>
  <div class="fadeshow1">
    <GMapMap :center="getCenterOfMap" :options="options" :zoom="mapZoom" style="width: 100vw; height: 100vh"
      ref="myMapRef">
      <GMapMarker :position="userPosition" />
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
                  <img style="max-height: 6vh; float: right"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8jHyAAAAAeGhvOzs4+OzwIAAAXEhMRCgz5+fkcFxgeGRoUDhAZFBUfGhsLAAPa2tr09PS7urpzcXLu7u4oJCXU1NTp6em1tLSbmppraWqop6fh4eE4NTaRj5CKiYlNSksvKyyjoqJ6eHlbWVo8OTpSUFCCgYGUk5PEw8O3trdjYWJFQkOmpaYtKSpsa2u7LUvQAAAL5UlEQVR4nO1d2ZaiMBCVoGyCgKi4L63t0trO///dKEkAbbAlVUH7nNx5mpkj5JLaUqmkGg0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFhT+J3jQYXBBM4/DVQ8FF3JzMo+WZ3MBpHXejQ2C/enBQTLvzpUuIYZmOrt1C91z/8j+r6HvwV2c0HkYrQixHewjd9Im+HQ3+3GQG+yUh5v28lcGxSD/q/iGS0/mMWO0n2aVzSci4++qRP4Vw8kmsTgkNXW9f/uglc3shuQtePf7fEKxd8mP2dOdqVIihrz5bp9OpNeu7179a3s95dsnprSeyeSTu3ZA9n1ir7W7SHcRhyDTNDsNecBjuxy2NEPduQh2y+nhX43rYEu9W6gzijD+acflPwulw8XlheSPVuuHs39HqDJYk7xg6F0EcT6bP/DI8LGbEz/9Y940P2eOtiunxhp9Jzrtmld/H31vi59XS6AxljVUE9sIws8G1iRNVokcRj1ok9xSdnAb4IxXEoe/nTAv5nIhaikHk557kkN17qGM4Jpk5NMlGYPoy9PaGkZkdq3PAGiUA3ZyDMEn0lG15iIlGUo46+ffqabQjkpPPf3B+V3z3jWwazyCZACOYWal7IFs0y2DvDTebxj3WYwUwzCI0v4MabcXjTFTJ5mWSuksl1CEL7IcfzqlZdfs40l8V4TbVFqMlY0mwSCVEJ68Ix+OZm74ffQIpmisrfUX9UVzQ9lIZkmbtcpaazGW9pASD1MuTjcy1zjB7z1ria37ikL1Ysi0P+lwZyD+5b7pBSlD3pZuAzKAZY9nvStHkBL1+HWmVNVdGI6rhbVcEnKA569XywjmnSHa1vC/2GUG3VVes8ZFSrMOi9vrMD1vb6j8OJ0fNXK0rr4mGKcVJ9ZdWxckUJzgxiadfk7+VY6CMovQV45hFi+6yuojuUh/jVA7DJoRHNw9SdxgYsRd5s+oE99lS8jIXVWeRv7m9kqr9TfYap189kAnyBLX2rOrvuUV1j5Vf/Tx6bBdQNwWWM//MPEOt+nIhYq6fjKq//Fls2CCJSKx9M4UXZ1o9Qtny10tLM3JVEDLZwR1DfVX5EWFbF/3pc+BjtISi/OYdw45W9wh+x4y6eqeyjUhwz1ATYJj6DCE1+RVcRg2xpAkKw8aYrqU6MlxGDFHCBhbDsE9V0ZeQODlSQybsjXAYpo8h6Om3A31yxxRdMCExbOxodsoTCIsfY0algwjv6mExbLCoAzvB+E2gXw6NYZc+SO8LD6UINttpB0g/GsPGxgOZvGKM6JrJAmQR8BhOmUkQfkABbCYYDiA1isewsaDGhnyLj+YebApBBRKIDEPquHQ8t29rifnSz5AnIjLkX1zcsN+DRYMwqcBkyLSm3YIMKI9WEnLrMM3GZJhOIlJaio3Nh21woTIMmXvegIaUYkwVm8D0GpUhj91wEm89mh5xgRl1XIbMJ1ooKZtvyhAazOMyZIENjtenMbcDjeWRGbK1DsZin8kDOJRHZmivdAzduWKU6HSnA93LRmbIQjeMFcYp+VYmeHMSm2GAJaYsPQP3rdgMmX1wwQmbCbWkDjjIRWc4p2IKjtyOHo6Q4jMcMOkCejG2rCBfwOFIYMg2QgzgAoN/KHhJAj7DKIkmTWCZzYePI+wyGNKdb6i/oGoIN1gyGE6pERTcZeCgkQNGbhKfYaOPMLgYJ+q+QgJDKmAWqMaGxbceeDBSGFIjAVsT0GegLKUlMGSPJJBnrJPtOgujwlICQx5RQhYFpyQHBXWqCSQwtFfJXgOocIHuuFau7imCBIaNrQM1pixFY2Hke2QwpFENJFlD12CwXDfHQAJDujqHrPPpd38Ys9lB8zlM/HuGT/6wWe6Mh4mMeYDIlG5GPnA4hyN5Fj8Iak//1NyVqAl1185SnOF3Mqzy6P14d7RZFtySAyVU8nWxAp8EeyrnJXG3fbIeDwwRxcdymEN0xBnSfFaZrYp+Cp5EikUuIQQHNbvEH/rFG+Y/zb9MFO582UgMjWKGY/PhkLBRNIk2258RD9vWDxiyDE5tKEqG2R4Sw8KwNDYeDggdRT7BptWSgCzSI4bTWtXwooinAob0HgfAHD7Sw7g+V5HAKVik2i4OwxJbOqtXD60Cj2izJIt43LygC+DigGJepzssXgXC/SHdGij6ehf0yu5KkgKzKJPSowxdcYY0TWOW1I0Pa7Q1eqG95Ks7cYZsdVKWiBqRumbRLM5U0LVFkZV9Fs1fnnBYEfN6dddT+DHszpM/dFyyKV4+fSXj8wDHhKgUdB4c4OhGp9Zz+Gl6n/xha7soSzVRLXIBpy/Y6sTDOAwrI09DvRko6c3KxzDq4mUw3CQxDSjZyTZmMArkZDD8pPlSSLHCOAnegTV7FBIY9ljQBkl20jQGwi6+FIYBwr5FF+xSU0hgSOtEYHW0U4S9DwYJDKkphRV+2WybFaE+TgJD6mJLkizPgu59YJRx4jPssSwNbN+Impqi1WdV4DNkG9Rt2K7KAcFcUeAzpKtXaOFryFbRcJ+Pz7Cf+HsfqkFUEREKatAZ8j1u6NF1qoj6J/AxEhjS7Tr45iYvbANvdKMzpGE3tKztAprahpXlXIHNsIdUf84Dhw5gj44Cm+E3O08HD7d4WQ40rMFmuEyEFJLBSEG/FSRVkACZIV9XwEt70xObFlAckBnu2NoQo0yEfS0DeCYVl2Ho4UgWBS39gh4xwmXIjhAg3VQzRDlygcvwTM/tgi08RdihZ7uWoKegMmS3DqAdyeenw0EOA5XhJz23C1w4ZeBlK6B1CiZDNoXwQCvF2oVrIiZDevRa8/EupmQJqTZgkweTITN9GGcPU7C71iBH/PEY2n12DQnm/YL8CiVLXLXxGC7g15AUgGki4KloDHmZC0YSNwdeWyK+EkZjuKUBm499RfOenbQUNjZYDIcSbqehWDH1Fv10SAx7/HpI/EuoD1z8BeUUiSG7nLKw+AQKdt1d9YtHKXAY8juT8a9ra6QFSJoltpuIwpAfaZB0hSmvEBLz+xgMbXYPtYN29c4dji5AFTEYbvgAZN2WHLJwST8LhLz3DAWuLFpwIZJ3qTcfpbms/tv4jmH1zWmuJa7MDgL8wmpf4CV3vVZLKh7LwT9v+yy1eWCqCdWTXKPbwvCqypz2K0A5K1gOe8Va5FW/w58bQiYFFT/RlNdBouSAH77J5G+qHL4Ncv3ZqvZVmHbY55HVtScHHr0JUGy6aUeVUzVdmvYdcQNQGVmbgsqfsxcRYlk+qVpGNnUYQXdZ9ZVCyPppVDc34WE0/6ialRxwHTTr6hmSdUWppbdNN21rs6qtySwPLjRrKb/TDL9HXHP69bS1SZBSNDXZ3YLStl3eWXLvjlukgqrL7fwSpw0W62pMlCI1N5rMRprdtAevVdG/ICDriGatJPWbsNNeVpohI2vxG5quk0qqlDZMWXPAutvKccSrtFmoMUOfRjvrLPSK7ocMx1SK2iTC1ZMvN51Az3phO9lR1mrVtRCv1w6WWZRu1OBzH6B5zo6SkhlSlnYaZW3MpbUAfRp2rme1TloIHON1rku01Xltw+ME3UxjLhxnwPuIgijHTyfRq5tWJwjXmTZeBmXuxaOr7jLfQN5YvUPj8QTNWW75rlnG8SDy6afzc6Z/11OV87eYQIYPL3943SPauqL+xB9LYuU+k0OOr2nkXIpwkdOfi7C6xIy+njXzzfmJ+Pk8VZuc3sDC3KO3I7eXEJiEnHdfv8xErznakJvZu87f6W0U8BbxwvVv076XqSTacjFpxr17nQrj4Gt0XFnEcm5+cvkw2zfld0U4WpG7AWsdxzUI8WbLzXi9W8zn88U6Oi5b/cs/Wt794WDdN8bSOuMh4bC5kzk+dt3xTNe6wHVNzyk4232dPg3gaupDPJoVk3yMi9pGb2heShDsT8T4IYLlaFvEibrv5P6eQDw59olv/s7SsYi/nDf/GD0KO5j8uxhLw3WKeequRUhnuT+8dHkERjyYLDb0fj3DtygMepfeaT06vFngAkAvaB6GH6P9xVvsR5NuczD9k2KpoKCgoKCgoKCgoKCgoKCgoKCgoKCg8Cr8B0Kvm2P3QZnEAAAAAElFTkSuQmCC" />
                </div>
              </div>
              <div class="topBorder">&nbsp;</div>
              <div v-for="(itineraryDisplay, index) of itinerary" :key="itineraryDisplay.id">
                <Transition name="slide-fade">
                  <mapCards @click="itineraryCardsHasBeenClicked(index)" class="cardOnDropdown mt-2"
                    :itinerary="itineraryDisplay" />
                </Transition>
                <div class="topBorder">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="showItineraryCreationModal">
          <itineraryModal
            @goBackToItineraryDropdown="showItineraryCreationModal = false; this.itinerary = this.$store.state.globalNonPersistantData.itinerary;"
            style="min-width: 400px" />
        </div>

        <div v-else>
          <itineratyExplanation @goBackToItineraryDropdown="goBackToItineraryDropdown" @checkNextPOI="checkNextPOI"
            @checkPreviousPOI="checkPreviousPOI" :selectedItineraryInfo="selectedItineraryInfo" />
        </div>
      </Transition>
    </div>
  </div>

  <div class="langButtonPos fadeshow1">
    <img src="https://cdn-icons-png.flaticon.com/512/197/197374.png" class="flag-button" @click="(engLanguage)" />
    <img src="https://cdn-icons-png.flaticon.com/512/197/197560.png" class="flag-button" @click="(frenchLanguage)" />
    <img :src="this.$store.state.userStore.userProfileImage" class="flag-button profileIcon"
      @click="showProfile = !showProfile; showGroupCreationModal = false; showItineraryCreationModal = false" />
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
                    <img style="max-height: 6vh; float: right"
                      src="data:image/png;base64,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" />
                  </div>
                </div>

                <div class="cursorOnButton" @click=" groupCardsHasBeenClicked(index)"
                  v-for="(     group, index     ) in      this.$store.state.globalNonPersistantData.groups     "
                  :key="group.id">
                  <div class="topBorder mt-2">&nbsp;</div>
                  <i class="fas fa-users ms-2 mt-2"></i>
                  <i class="fas fa-person fa-lg me-2 mt-2" style="float: right"></i>
                  <Transition name="slide-fade">
                    <mapGroupCardsVue :groupName="group.name" :numberOfMember="group.emails.length" :index="index" />
                  </Transition>
                  <button @click="acceptGroupInvitation(group.backendGroupId)">Accept</button>
                  <button @click="refuseGroupInvitation(group.backendGroupId)">Refuse</button>
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
                :groups=this.$store.state.globalNonPersistantData.groups[selectedGroup] :key="keyShowGroup"
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

      keyCreateGroup: 0,
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
      locomotionMethod: [
        { id: 1, locomotionType: "walking" },
        { id: 2, locomotionType: "driving" },
        { id: 3, locomotionType: "bicycling" },
        { id: 4, locomotionType: "transit" },
      ],
      selectedLocomotionType: "walking",
      possibleType: [
        { id: 1, POIType: "CulturalSite" },
        { id: 2, POIType: "PointOfInterest" },
        { id: 3, POIType: "RemarkableBuilding" },
        { id: 4, POIType: "ReligiousSite" },
        { id: 5, POIType: "PlaceOfInterest" },
        { id: 6, POIType: "ParkAndGarden" },
        { id: 7, POIType: "RemembranceSite" },
        { id: 8, POIType: "MilitaryCemetery" },
        { id: 9, POIType: "ArcheologicalSite" },
        { id: 10, POIType: "SportsEvent" },
        { id: 11, POIType: "EntertainmentAndEvent" }
      ],
      itinerary: this.$store.state.globalNonPersistantData.itinerary,
    }
  },
  created() {
    this.itinerary = this.$store.state.globalNonPersistantData.itinerary;
  },
  mounted() {
    try {
      this.$store.dispatch("getItinerary");
      this.$store.dispatch("getGroup").then((groups) => {
        // eslint-disable-next-line
        for (let groupsId in groups["groups"]) {
          this.$store.dispatch("getGroupStatus", groups["groups"][groupsId]);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      if (this.selectedItinerary == 0)
        return ([]);
      return (this.itinerary[this.selectedItinerary - 1].path);
    },
    selectedItineraryInfo() {
      return (this.itinerary[this.selectedItinerary - 1])
    },
    userPosition() {
      return ({
        lat: this.$store.state.userStore.currentUserLocation.latitude,
        lng: this.$store.state.userStore.currentUserLocation.longitude
      });
    },
    getCenterOfMap() {
      if (this.selectedItinerary == 0)
        return ({
          lat: this.$store.state.userStore.currentUserLocation.latitude,
          lng: this.$store.state.userStore.currentUserLocation.longitude
        });
      else {
        return (this.itinerary[this.selectedItinerary - 1].itineraryPOI[this.currentWaypointIndex].Localisation);
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
      return (this.$store.state.mapStore.marker);
    },
  },
  methods: {
    acceptGroupInvitation(backendGroupId) {
      console.log("accept", backendGroupId);
      this.$store.dispatch("acceptGroupInvitation", backendGroupId);
    },
    refuseGroupInvitation(backendGroupId) {
      console.log("refuse", backendGroupId);
      this.$store.dispatch("refuseGroupInvitation", backendGroupId);
    },
    itineraryCardsHasBeenClicked(itineraryId) {
      this.selectedItinerary = itineraryId + 1;
      this.displayItineraryInformation = true;
      this.mapZoom = 15;
    },
    goBackToItineraryDropdown() {
      this.currentWaypointIndex = 0;
      this.displayItineraryInformation = false;
      this.mapZoom = 12;
    },
    groupCardsHasBeenClicked(index) {
      this.selectedGroup = index;
      this.groupHasBeenClicked = true;
      this.showItineraryCreationModal = false;
      this.showProfile = false;
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
      this.itineraryDropdown = !this.itineraryDropdown;
    },
    setGroupDropdownState() {
      this.groupDropdown = !this.groupDropdown;
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
        this.$store.dispatch("resetSelectedMarker");
      else if (geolocalisation)
        this.$store.dispatch("markerHasBeenSelected", geolocalisation);
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
      this.keyCreateGroup++
      this.createGroup = true;
    },

    drawPathBetweenSelectedPoint() {
      this.$store.dispatch("calculatePath").then((steps) => {
        this.waypoints = [];
        this.path = [];
        let index = 0;
        steps.data.forEach(waypoint => {
          waypoint.steps.forEach(element => {
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
          })
        });
      });
    },
  },
}
</script>

<style scoped>
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
  flex-direction: column;
  max-height: 70vh;
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
  left: calc(100vw - 200px);
  flex-direction: row;
  top: 5vh;
}

.profileIcon {
  border-radius: 50px;
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
