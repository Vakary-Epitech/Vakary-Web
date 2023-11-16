<!-- This component is used for the map page of the website
     It is not using the i18n system yet for a translation system => only available in english atm -->

<template>
  <div class="fadeshow1">
    <GMapMap :center="getCenterOfMap" :options="options" :zoom="mapZoom" style="width: 100vw; height: 100vh"
      ref="myMapRef">

      <GMapMarker :key="marker.label" v-for="marker in unselectedWaypoint" :position="marker.geolocalisation"
        :title="marker.label" :clickable="false" />
      <GMapMarker v-if="!this.markersData.length == 0" :key="this.markersData[this.currentWaypointIndex].label"
        :position="this.markersData[this.currentWaypointIndex].geolocalisation"
        :title="this.markersData[this.currentWaypointIndex].label" :clickable="false"
        :icon='{ url: "https://cdn-icons-png.flaticon.com/512/7310/7310018.png", scaledSize: { width: 44, height: 44 } }' />

      <map-info></map-info>
      <GMapPolyline :options="{ strokeColor: '#000642' }" :path="selectedPath" ref="polyline" />
    </GMapMap>
  </div>

  <div class="boxPosition fadeshow1">
    <Transition name="slide-fade">

      <div v-if="!displayItineraryInformation && !showItineraryCreationModal" :class="(itineraryDropdownStatus)">
        <div class="dropdown-trigger" @click="setItineraryDropdownState()">
          <button class="dropdownDesignMapPage" :style="itineraryCssDropdown" aria-haspopup="true"
            aria-controls="dropdown-menu2">
            <span class="dropdownTextPosition">{{ $t("mapPage.itinerary") }}</span>
            <span v-if="!itineraryDropdown" class="icon is-small dropdownArrowPosition">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            <span v-if="itineraryDropdown" class="icon is-small dropdownArrowPosition">
              <i class="fas fa-angle-up" aria-hidden="true"></i>
            </span>
          </button>
          <div v-if="this.itineraryDropdown" class="dropdown-content">
            <div class="card cardOnDropdown" style="display: flex; flex-direction: row;"
              @click="callItineraryCreationModal()">
              <div class="cardBasicContainer" style="display: flex; width: 70%">
                <span class="col-12">{{
                  $t("mapPage.newItinerary") }}</span>
              </div>
              <div class="dropdownPlusPlacement">
                <i class="fas fa-plus plus-custom float-right" aria-hidden="true"></i>
              </div>
            </div>
            <div v-for="(itineraryDisplay, index) of this.$store.state.itineraryStore.itinerary"
              :key="itineraryDisplay.id">
              <Transition name="slide-fade">
                <mapCards @click="itineraryCardsHasBeenClicked(index)" class="card cardOnDropdown mt-2"
                  :itinerary="itineraryDisplay" :index="index" />
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="showItineraryCreationModal">
        <profileTrip @goBackToItineraryDropdown="showItineraryCreationModal = false" />
      </div>

      <div v-else>
        <itineratyExplanation @goBackToItineraryDropdown="goBackToItineraryDropdown" @checkNextPOI="checkNextPOI"
          @checkPreviousPOI="checkPreviousPOI" :selectedItineraryInfo="selectedItineraryInfo" />
      </div>
    </Transition>
  </div>

  <div class="langButtonPos fadeshow1">
    <img :src="this.$store.state.userStore.userProfileImage" class="flag-button profileIcon"
      @click="showProfile = !showProfile; showGroupCreationModal = false; showItineraryCreationModal = false" />
    <languages></languages>
  </div>

  <Transition name="slide-fade">
    <div class="profileModalPosition fadeshow1" v-if="showProfile">
      <profileModal />
    </div>
  </Transition>

  <section name="groupDropdown">
    <div class="groupDropdownPosition fadeshow1">
      <Transition name="slide-fade">
        <div v-if="!displayItineraryInformation && !showGroupCreationModal && !groupHasBeenClicked"
          :class="(groupDropdownStatus)">
          <div class="dropdown-trigger" @click=" (setGroupDropdownState())">
            <button class="dropdownDesignMapPage" :style="groupCssDropdown" aria-haspopup="true"
              aria-controls="dropdown-menu2">
              <span class="dropdownTextPosition dropboxText">{{ $t("mapPage.group") }}</span>
              <span v-if="!groupDropdown" class="icon is-small dropdownArrowPosition">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
              <span v-if="groupDropdown" class="icon is-small dropdownArrowPosition">
                <i class="fas fa-angle-up" aria-hidden="true"></i>
              </span>
            </button>

            <div v-if="this.groupDropdown && !this.groupHasBeenClicked" class="dropdown-content">
              <div class="card cardOnDropdown mt-2" style="display: flex; flex-direction: row;"
                @click="callGroupCreation()">
                <div class="cardBasicContainer" style="display: flex; width: 70%">
                  <span class="col-12">{{
                    $t("mapPage.newGroup") }}</span>
                </div>
                <div class="dropdownPlusPlacement">
                  <i class="fas fa-plus plus-custom float-right" aria-hidden="true"></i>
                </div>
              </div>

              <div class="cursorOnButton card cardOnDropdown"
                v-for="(group, index) in this.$store.state.groupStore.groups" :key="group.id">
                <div class="row my-auto" @click="groupCardsHasBeenClicked(group, index)">
                  <div class="col-2 my-auto text-center">
                    <img class="ms-2" :src="group.photo" style="max-width: 40px">
                  </div>
                  <div class="col-6 my-auto">
                    <span>{{ group.name }}</span>
                  </div>
                  <div class="col-4 my-auto text-end">
                    {{ group.emails.length }}
                    <i class="fa-solid fa-user me-4"></i>
                  </div>
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
            <CreateGroup @goBackToGroupDropdown=" showGroupCreationModal = false" />
          </Transition>
        </div>

        <div v-else-if="groupHasBeenClicked">
          <Transition name="slide-fade">
            <showMembers @change-group-photo="changeGroupPhoto" :groups=this.$store.state.groupStore.groups[selectedGroup]
              :key="keyShowGroup"
              @goBackToGroupDropdown=" groupHasBeenClicked = false; showGroupCreationModal = false; displayItineraryInformation = false" />
          </Transition>
        </div>

      </Transition>
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
import CreateGroup from '../UI/CreateGroup.vue';
import itineraryModal from '../UI/itineraryModal.vue';
import profileModal from '../UI/profileModal.vue';
import showMembers from '@/components/UI/ShowMembers.vue';
import profileTrip from '@/components/UI/ProfileTrip.vue'

export default {
  name: 'App',
  components: {
    profileTrip,
    mapCards,
    CreateGroup,
    itineratyExplanation,
    // eslint-disable-next-line
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
      mapZoom: 6.3,
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
    unselectedWaypoint() {
      let unselectedWaypointData = this.$store.state.itineraryStore.marker.slice();
      unselectedWaypointData.splice(this.currentWaypointIndex, 1);
      return unselectedWaypointData;
    },
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
          lat: 46.7172801,
          lng: 1.21190790000003,
          zoom: 6.3
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
      this.mapZoom = 14;
    },
    goBackToItineraryDropdown() {
      this.currentWaypointIndex = 0;
      this.selectedItinerary = 0;
      this.displayItineraryInformation = false;
      this.mapZoom = 6.3;
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
      this.groupDropdown = false;
    },
    setGroupDropdownState() {
      this.groupDropdown = !this.groupDropdown;
      if (this.groupDropdown) {
        this.$store.dispatch("getGroup").catch((error) => {
          console.log(error);
        })
      }
    },
    callGroupCreation() {
      this.showGroupCreationModal = true;
      this.showItineraryCreationModal = false;
      this.itineraryDropdown = false;
      this.showProfile = false;
    },

    callItineraryCreationModal() {
      this.showItineraryCreationModal = !this.showItineraryCreationModal;
      this.showGroupCreationModal = false;
      this.groupDropdown = !this.groupDropdown;
      this.showProfile = false;
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

.plus-custom {
  border: 1px solid rgb(192, 150, 40);
  border-radius: 100%;
  padding: 7px 8px;
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

.dropdown-content {
  display: flex;
  flex-direction: column;
  transform: translate(0, -2vh);
  border-radius: 0px 0px 10px 10px;
  padding-bottom: 7px;
  max-height: 400px;
  overflow: auto;
  max-width: 30vw;
  background-color: var(--background-color-primary) !important;
  color: var(--text-primary-color);
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
  color: black;
}

.cardOnDropdown {
  cursor: pointer;
  margin: 1vh;
  height: 50px;
}

.card {
  background-color: var(--background-cards-color);
}

.cardOnDropdown:hover {
  background-color: #e7e7e7;
  color: black;
}

.topBorder {
  width: 80%;
  height: 1px;
  margin: 0px auto;
  border-bottom: 1px solid rgb(192, 150, 40);
}

.dropdownDesignMapPage {
  display: flex;
  background-color: var(--background-cards-color);
  color: var(--text-primary-color);
  border: none;
  height: 6vh;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-right: 1vw;
  margin-top: 5px;
  margin-bottom: 5px;
  min-width: 30vw;
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
  right: 20px;
  top: 10vh;
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

@media only screen and (max-width: 1055px) {
  .fadeshow1 {
    display: none;
  }
}

@media only screen and (min-width: 1056px) {
  .fadeshow2 {
    display: none;
  }
}
</style>
