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
                <div class="dropboxText cardBasicContainer" style="display: flex; width: 70%; height: 100%;">
                  <span class="dropboxText cardBasicContainer dropdownCreateTextPosition">{{
                    $t("mapPage.newItinerary") }}</span>
                </div>
                <div class="dropdownPlusPlacement">
                  <img style="max-height: 6vh; float: right"
                    src="data:image/png;base64,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" />
                </div>
              </div>
              <div class="topBorder">&nbsp;</div>
              <div v-for="itineraryDisplay in itinerary" :key="itineraryDisplay.id">
                <Transition name="slide-fade">
                  <mapCards :city="itineraryDisplay.city" :time="itineraryDisplay.time" :groupe="itineraryDisplay.groupe"
                    :image="itineraryDisplay.image" :id="itineraryDisplay.id"
                    @click="itineraryCardsHasBeenClicked(itineraryDisplay.id)" :date="itineraryDisplay.date"
                    class="cardOnDropdown" />
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
    <img src="https://cdn-icons-png.flaticon.com/512/197/197374.png" class="flag-button" @click="(engLanguage)" />
    <img src="https://cdn-icons-png.flaticon.com/512/197/197560.png" class="flag-button" @click="(frenchLanguage)" />
    <img :src="this.$store.state.userStore.userProfileImage" class="flag-button profileIcon"
      @click="showProfile = !showProfile; showGroupCreationModal = false; showItineraryCreationModal = false" />
  </div>

  <Transition name="slide-fade">
    <div class="profileModalPosition fadeshow1" v-if=" showProfile ">
      <profileModal />
    </div>
  </Transition>

  <section name="groupDropdown">
    <div class="groupDropdownPosition fadeshow1">
      <div class="widgetPanel">
        <Transition name="slide-fade">
          <div v-if=" !displayItineraryInformation && !showGroupCreationModal && !groupHasBeenClicked "
            :class=" (groupDropdownStatus) ">
            <div class="dropdown-trigger" @click=" (setGroupDropdownState()) ">
              <button class="dropdownDesignMapPage" :style=" groupCssDropdown " aria-haspopup="true"
                aria-controls="dropdown-menu2">
                <span class="dropdownTextPosition dropboxText">{{ $t("mapPage.group") }}</span>
                <span class="icon is-small dropdownArrowPosition">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>

              <div v-if=" this.groupDropdown && !this.groupHasBeenClicked " style="background-color: white;"
                class="dropdown-content">

                <div style="display: flex; flex-direction: row;" class="cursorOnButton" @click=" callGroupCreation() ">
                  <div class="dropboxText cardBasicContainer" style="display: flex; width: 70%; height: 100%;">
                    <span class="dropboxText cardBasicContainer dropdownCreateTextPosition">{{
                      $t("mapPage.newGroup") }}</span>
                  </div>
                  <div class="dropdownPlusPlacement">
                    <img style="max-height: 6vh; float: right"
                      src="data:image/png;base64,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" />
                  </div>
                </div>

                <div class="cursorOnButton" @click=" groupCardsHasBeenClicked(index) "
                  v-for="(    group, index    ) in     this.$store.state.globalNonPersistantData.groups    "
                  :key=" group.id ">
                  <div class="topBorder mt-2">&nbsp;</div>
                  <i class="fas fa-users ms-2 mt-2"></i>
                  <i class="fas fa-person fa-lg me-2 mt-2" style="float: right"></i>
                  <Transition name="slide-fade">
                    <mapGroupCardsVue :groupName=" group.name " :numberOfMember=" group.emails.length "
                      :index=" index " />
                  </Transition>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if=" showGroupCreationModal ">
            <Transition name="slide-fade">
              <CreateGroup @goBackToGroupDropdown=" showGroupCreationModal = false " class="componentsGroupDropdown" />
            </Transition>
          </div>

          <div v-else-if=" groupHasBeenClicked ">
            <Transition name="slide-fade">
              <showMembers @change-group-photo=" changeGroupPhoto "
                :groups= this.$store.state.globalNonPersistantData.groups[selectedGroup]  :key=" keyShowGroup "
                @goBackToGroupDropdown=" groupHasBeenClicked = false; showGroupCreationModal = false; displayItineraryInformation = false "
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
      itinerary: [
        {
          id: 1,
          city: "Thionville",
          time: "De 8h à 16h",
          date: "30/11/2022",
          groupe: "Vakary",
          path: [{ "lat": 49.3595081, "lng": 6.1658741 }, { "lat": 49.3591967, "lng": 6.1655107 }, { "lat": 49.3589729, "lng": 6.1658066 }, { "lat": 49.359345, "lng": 6.1663524 }, { "lat": 49.3591922, "lng": 6.1670151 }, { "lat": 49.3591922, "lng": 6.1670151 }, { "lat": 49.35897199999999, "lng": 6.167534 }, { "lat": 49.3583571, "lng": 6.168156 }, { "lat": 49.3579716, "lng": 6.1686348 }, { "lat": 49.3578054, "lng": 6.1685653 }, { "lat": 49.3574824, "lng": 6.1680104 }, { "lat": 49.3576006, "lng": 6.1678443 }, { "lat": 49.357343, "lng": 6.16752 }, { "lat": 49.3577014, "lng": 6.1669483 }, { "lat": 49.3575993, "lng": 6.1670826 }, { "lat": 49.3573789, "lng": 6.1668805 }, { "lat": 49.3570885, "lng": 6.1672946 }, { "lat": 49.3570511, "lng": 6.1673514 }, { "lat": 49.3567814, "lng": 6.167666 }, { "lat": 49.3573269, "lng": 6.1685192 }, { "lat": 49.3537183, "lng": 6.1738162 }, { "lat": 49.3532632, "lng": 6.175095000000001 }, { "lat": 49.3533273, "lng": 6.175752999999999 }, { "lat": 49.3535101, "lng": 6.178956299999999 }, { "lat": 49.357935, "lng": 6.188476 }, { "lat": 49.35735140000001, "lng": 6.189680999999999 }, { "lat": 49.3564269, "lng": 6.194566 }, { "lat": 49.3574535, "lng": 6.195831999999999 }, { "lat": 49.355842, "lng": 6.199231 }, { "lat": 49.356029, "lng": 6.199237 }, { "lat": 49.3584501, "lng": 6.202045099999999 }, { "lat": 49.35832430000001, "lng": 6.202713 }, { "lat": 49.3584501, "lng": 6.202045099999999 }, { "lat": 49.35619990000001, "lng": 6.2012002 }, { "lat": 49.356029, "lng": 6.199237 }, { "lat": 49.355842, "lng": 6.199231 }, { "lat": 49.3574535, "lng": 6.195831999999999 }, { "lat": 49.3564269, "lng": 6.194566 }, { "lat": 49.3572894, "lng": 6.1899278 }, { "lat": 49.357935, "lng": 6.188476 }, { "lat": 49.3535101, "lng": 6.178956299999999 }, { "lat": 49.3533273, "lng": 6.175752999999999 }, { "lat": 49.35324379999999, "lng": 6.1754786 }],
          waypoints: [{ "duration": { "text": "1 min", "value": 32 }, "instruction": "Head <b>southwest</b> on <b>Pass. du Temple</b> toward <b>Rue du Manège</b>", "distance": { "text": "44 m", "value": 44 }, "location": { "lat": 49.3595081, "lng": 6.1658741 } }, { "duration": { "text": "1 min", "value": 25 }, "instruction": "Turn <b>left</b> onto <b>Rue du Manège</b>", "distance": { "text": "33 m", "value": 33 }, "location": { "lat": 49.3591967, "lng": 6.1655107 } }, { "duration": { "text": "1 min", "value": 43 }, "instruction": "Turn <b>left</b> onto <b>Pl. Général Hugo</b>", "distance": { "text": "57 m", "value": 57 }, "location": { "lat": 49.3589729, "lng": 6.1658066 } }, { "duration": { "text": "1 min", "value": 35 }, "instruction": "<b>Pl. Général Hugo</b> turns <b>right</b> and becomes <b>Pass. du Dispensaire</b>", "distance": { "text": "52 m", "value": 52 }, "location": { "lat": 49.3591922, "lng": 6.1670151 } }, { "duration": { "text": "1 min", "value": 35 }, "instruction": "<b>Pl. Général Hugo</b> turns <b>right</b> and becomes <b>Pass. du Dispensaire</b>", "distance": { "text": "52 m", "value": 52 }, "location": { "lat": 49.3591922, "lng": 6.1670151 } }, { "duration": { "text": "1 min", "value": 32 }, "instruction": "Continue onto <b>Pl. Claude Arnoult</b>", "distance": { "text": "45 m", "value": 45 }, "location": { "lat": 49.3591922, "lng": 6.1670151 } }, { "duration": { "text": "1 min", "value": 64 }, "instruction": "Continue onto <b>Rue du Mersch</b>", "distance": { "text": "82 m", "value": 82 }, "location": { "lat": 49.35897199999999, "lng": 6.167534 } }, { "duration": { "text": "1 min", "value": 43 }, "instruction": "Continue onto <b>Rue des Clarisses</b>", "distance": { "text": "55 m", "value": 55 }, "location": { "lat": 49.3583571, "lng": 6.168156 } }, { "duration": { "text": "1 min", "value": 17 }, "instruction": "Turn <b>right</b> onto <b>Cr du Château</b>", "distance": { "text": "22 m", "value": 22 }, "location": { "lat": 49.3579716, "lng": 6.1686348 } }, { "duration": { "text": "1 min", "value": 39 }, "instruction": "Turn <b>right</b> onto <b>Sq. de l'Hôtel de ville</b>", "distance": { "text": "54 m", "value": 54 }, "location": { "lat": 49.3578054, "lng": 6.1685653 } }, { "duration": { "text": "1 min", "value": 14 }, "instruction": "Turn <b>right</b> onto <b>Rue Georges Ditsch</b>", "distance": { "text": "18 m", "value": 18 }, "location": { "lat": 49.3574824, "lng": 6.1680104 } }, { "duration": { "text": "1 min", "value": 28 }, "instruction": "Turn <b>left</b> onto <b>Rue Grande Duchesse Charlotte</b>", "distance": { "text": "37 m", "value": 37 }, "location": { "lat": 49.3576006, "lng": 6.1678443 } }, { "duration": { "text": "1 min", "value": 42 }, "instruction": "Turn <b>right</b> onto <b>Rue de l'Ancien Hôtel de ville</b>", "distance": { "text": "58 m", "value": 58 }, "location": { "lat": 49.357343, "lng": 6.16752 } }, { "duration": { "text": "1 min", "value": 10 }, "instruction": "Head <b>southeast</b> on <b>Rue de l'Ancien Hôtel de ville</b> toward <b>Rue de la Tour</b>", "distance": { "text": "15 m", "value": 15 }, "location": { "lat": 49.3577014, "lng": 6.1669483 } }, { "duration": { "text": "1 min", "value": 21 }, "instruction": "Turn <b>right</b> onto <b>Rue de la Tour</b>", "distance": { "text": "29 m", "value": 29 }, "location": { "lat": 49.3575993, "lng": 6.1670826 } }, { "duration": { "text": "1 min", "value": 34 }, "instruction": "Turn <b>left</b> onto <b>Rue Saint-Maximin</b><div style=\"font-size:0.9em\">Destination will be on the right</div>", "distance": { "text": "44 m", "value": 44 }, "location": { "lat": 49.3573789, "lng": 6.1668805 } }, { "duration": { "text": "1 min", "value": 4 }, "instruction": "Head <b>southeast</b> on <b>Rue Saint-Maximin</b> toward <b>Pl. de l'Église</b>", "distance": { "text": "6 m", "value": 6 }, "location": { "lat": 49.3570885, "lng": 6.1672946 } }, { "duration": { "text": "1 min", "value": 27 }, "instruction": "Continue onto <b>Pl. de l'Église</b>", "distance": { "text": "38 m", "value": 38 }, "location": { "lat": 49.3570511, "lng": 6.1673514 } }, { "duration": { "text": "1 min", "value": 64 }, "instruction": "Turn <b>left</b> onto <b>Quai Nicolas Crauser</b>/<wbr/><b>N53</b><div style=\"font-size:0.9em\">Continue to follow N53</div>", "distance": { "text": "87 m", "value": 87 }, "location": { "lat": 49.3567814, "lng": 6.167666 } }, { "duration": { "text": "7 mins", "value": 441 }, "instruction": "Sharp <b>right</b> onto <b>Quai Pierre Marchal</b>/<wbr/><b>N1153</b><div style=\"font-size:0.9em\">Continue to follow N1153</div>", "distance": { "text": "0.6 km", "value": 565 }, "location": { "lat": 49.3573269, "lng": 6.1685192 } }, { "duration": { "text": "1 min", "value": 79 }, "instruction": "Slight <b>left</b> onto <b>Bd Robert Schuman</b>/<wbr/><b>N1153</b>", "distance": { "text": "0.1 km", "value": 106 }, "location": { "lat": 49.3537183, "lng": 6.1738162 } }, { "duration": { "text": "1 min", "value": 47 }, "instruction": "At the roundabout, take the <b>1st</b> exit onto <b>Rue du Couronné</b>", "distance": { "text": "51 m", "value": 51 }, "location": { "lat": 49.3532632, "lng": 6.175095000000001 } }, { "duration": { "text": "3 mins", "value": 184 }, "instruction": "Slight <b>right</b>", "distance": { "text": "0.2 km", "value": 242 }, "location": { "lat": 49.3533273, "lng": 6.175752999999999 } }, { "duration": { "text": "11 mins", "value": 633 }, "instruction": "Turn <b>left</b> onto <b>Bd Robert Schuman</b>/<wbr/><b>D953A</b><div style=\"font-size:0.9em\">Go through 1 roundabout</div>", "distance": { "text": "0.8 km", "value": 850 }, "location": { "lat": 49.3535101, "lng": 6.178956299999999 } }, { "duration": { "text": "1 min", "value": 83 }, "instruction": "Turn <b>right</b> onto <b>Rue des Romains</b>", "distance": { "text": "0.1 km", "value": 109 }, "location": { "lat": 49.357935, "lng": 6.188476 } }, { "duration": { "text": "5 mins", "value": 289 }, "instruction": "At the roundabout, take the <b>2nd</b> exit onto <b>Rue Drogon</b>", "distance": { "text": "0.4 km", "value": 375 }, "location": { "lat": 49.35735140000001, "lng": 6.189680999999999 } }, { "duration": { "text": "2 mins", "value": 108 }, "instruction": "Turn <b>left</b> onto <b>Rue de l'Aviation</b>", "distance": { "text": "0.1 km", "value": 146 }, "location": { "lat": 49.3564269, "lng": 6.194566 } }, { "duration": { "text": "4 mins", "value": 226 }, "instruction": "Turn <b>right</b>", "distance": { "text": "0.3 km", "value": 312 }, "location": { "lat": 49.3574535, "lng": 6.195831999999999 } }, { "duration": { "text": "1 min", "value": 16 }, "instruction": "Turn <b>left</b> toward <b>Av. du Général de Gaulle</b>", "distance": { "text": "21 m", "value": 21 }, "location": { "lat": 49.355842, "lng": 6.199231 } }, { "duration": { "text": "5 mins", "value": 297 }, "instruction": "Turn <b>right</b> onto <b>Av. du Général de Gaulle</b>", "distance": { "text": "0.4 km", "value": 401 }, "location": { "lat": 49.356029, "lng": 6.199237 } }, { "duration": { "text": "1 min", "value": 37 }, "instruction": "Turn <b>right</b> onto <b>Rue de Jérusalem</b>", "distance": { "text": "50 m", "value": 50 }, "location": { "lat": 49.3584501, "lng": 6.202045099999999 } }, { "duration": { "text": "1 min", "value": 36 }, "instruction": "Head <b>west</b> on <b>Rue de Jérusalem</b> toward <b>Av. du Général de Gaulle</b>", "distance": { "text": "50 m", "value": 50 }, "location": { "lat": 49.35832430000001, "lng": 6.202713 } }, { "duration": { "text": "3 mins", "value": 195 }, "instruction": "Turn <b>left</b> onto <b>Av. du Général de Gaulle</b>", "distance": { "text": "0.3 km", "value": 258 }, "location": { "lat": 49.3584501, "lng": 6.202045099999999 } }, { "duration": { "text": "2 mins", "value": 104 }, "instruction": "Turn <b>right</b> to stay on <b>Av. du Général de Gaulle</b>", "distance": { "text": "0.1 km", "value": 144 }, "location": { "lat": 49.35619990000001, "lng": 6.2012002 } }, { "duration": { "text": "1 min", "value": 16 }, "instruction": "Turn <b>left</b>", "distance": { "text": "21 m", "value": 21 }, "location": { "lat": 49.356029, "lng": 6.199237 } }, { "duration": { "text": "4 mins", "value": 226 }, "instruction": "Turn <b>right</b>", "distance": { "text": "0.3 km", "value": 312 }, "location": { "lat": 49.355842, "lng": 6.199231 } }, { "duration": { "text": "2 mins", "value": 105 }, "instruction": "Turn <b>left</b> onto <b>Rue de l'Aviation</b>", "distance": { "text": "0.1 km", "value": 146 }, "location": { "lat": 49.3574535, "lng": 6.195831999999999 } }, { "duration": { "text": "4 mins", "value": 259 }, "instruction": "Turn <b>right</b> onto <b>Rue Drogon</b>", "distance": { "text": "0.4 km", "value": 352 }, "location": { "lat": 49.3564269, "lng": 6.194566 } }, { "duration": { "text": "2 mins", "value": 107 }, "instruction": "At the roundabout, take the <b>2nd</b> exit onto <b>Rue des Romains</b>", "distance": { "text": "0.1 km", "value": 132 }, "location": { "lat": 49.3572894, "lng": 6.1899278 } }, { "duration": { "text": "11 mins", "value": 653 }, "instruction": "Turn <b>left</b> onto <b>Av. des Nations</b>/<wbr/><b>D953A</b><div style=\"font-size:0.9em\">Go through 1 roundabout</div>", "distance": { "text": "0.8 km", "value": 850 }, "location": { "lat": 49.357935, "lng": 6.188476 } }, { "duration": { "text": "3 mins", "value": 172 }, "instruction": "Turn <b>right</b>", "distance": { "text": "0.2 km", "value": 242 }, "location": { "lat": 49.3535101, "lng": 6.178956299999999 } }, { "duration": { "text": "1 min", "value": 18 }, "instruction": "Turn <b>left</b> onto <b>Rue du Couronné</b>", "distance": { "text": "22 m", "value": 22 }, "location": { "lat": 49.3533273, "lng": 6.175752999999999 } }, { "duration": { "text": "7 mins", "value": 433 }, "instruction": "At the roundabout, take the <b>1st</b> exit onto <b>Bd Robert Schuman</b>/<wbr/><b>N1153</b> heading to <b>Thionville-Centre</b>/<wbr/><b>Hettange-Grande</b>/<wbr/><b>Mondorf les Bains</b><div style=\"font-size:0.9em\">Continue to follow N1153</div>", "distance": { "text": "0.6 km", "value": 572 }, "location": { "lat": 49.35324379999999, "lng": 6.1754786 } }],
          POIInfo: [
            { "name": "TEMPLE PROTESTANT", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Temple_Thionville.jpg/800px-Temple_Thionville.jpg", "geolocalisation": { "lat": 49.3596656611796, "lng": 6.16554702009888 }, "description": "800 Protestants allemands demandent en 1876 la construction d'un lieu de culte qui leur soit dédié. Caractéristique de l'architecture protestante de la fin du XIXème siècle, le temple étonne par ses similitudes avec les églises catholiques. De style néo-gothique, très prisé par les Allemands, il présente un plan allongé, une tour, un chevet polygonal et surtout l'utilisation de la célèbre pierre de Jaumont. C'est surtout la grande rose de la façade qui rappellent les styles architecturaux des églises catholiques. La décoration intérieure et les vitraux colorés, là encore, s'intègrent dans le style néo-gothique. La sobriété des lieux rappellent les préceptes religieux valorisés par les Protestants." },
            { "name": "AUTEL DE LA PATRIE", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "image": "https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy84NDUvODQ1MTQ1ODkwXzQuanBn.jpg", "geolocalisation": { "lat": 49.3589350848185, "lng": 6.16736534543838 }, "description": "Et si vous découvriez un obélisque vieux de plusieurs siècles ?\nÉrigé en 1797, le monolithe est démantelé sur ordre du Premier consul en 1799. Devenu simple monument aux morts au cimetière de Thionville, il retrouve sa place au centre de la cité en 1948.\nIl porte fièrement la Légion d'honneur et la croix de Guerre, deux décorations données à Thionville en 1920 et 1948 pour sa résistance et sa bravoure que l'on retrouve dans la citation de 1792 \"Thionville et sa garnison ont bien mérité de la Patrie\"." },
            { "name": "BEFFROI", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/33/99/d9/vue-du-beffroi.jpg?w=1100&h=-1&s=1", "geolocalisation": { "lat": 49.35770209228785, "lng": 6.16694946032715 }, "description": "Planté au milieu du centre ville de Thionville, sa girouette dorée étincelle. On ne peut pas le manquer. On ne voit que lui. Triomphal, il rappelle les libertés communales octroyées par le Comte Henri de Luxembourg au XIIIème siècle. Tour de de guet, bâtiment annexe de l'hôtel de ville, hôpital pour les pauvres, ce géant tout de jaune vêtu, est l'un des symboles de la ville. Construit au XIVème siècle, il abrite en son sein la Grosse Suzanne, cloche de 2 tonnes dont les plus chanceux seulement peuvent en apercevoir les formes généreuses. \nLes salles du beffroi sont ouvertes dans le cadres de manifestations." },
            { "name": "ÉGLISE SAINT-MAXIMIN", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "image": "https://www.tourism-lorraine.com/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy84NDUvODQ1MTQ1ODg3XzQuanBn.jpg", "geolocalisation": { "lat": 49.3570691, "lng": 6.1672644 }, "description": "Place de l'Eglise. On entend les cloches sonner. Cette silhouette rappelle vaguement Notre-Dame-de-Paris et ses deux tours. En a-t-elle également le bossu ? On dit pourtant qu'Hugo Père a défendu la cité de Thionville en 1814 et 1815. Qui a inspiré quoi ? Toute vêtue de pierre jaune de Jaumont, elle titille notre curiosité par sa sobriété extérieure. Une croix, un fronton d'où ressortent des angelots bien ronds, deux drapées, deux médaillons de Saint Pierre et Saint Paul. Voilà. Sa description pour les spécialistes peut s'enrichir de ses pilastres aux chapiteaux ioniques. Vaste vocabulaire. Ses deux impressionnantes tours d'où guettaient les soldats, ponctuent la majesté de sa simplicité.  \nIl ne vous reste qu'à pousser la porte." },
            { "name": "AÉROPARC YUSSOIS", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "image": "https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy84NDUvODQ1MTUzMTkxXzUuanBn.jpg", "geolocalisation": { "lat": 49.3583233, "lng": 6.202935 }, "description": "Vendredi, c'est apéro-pétanque avec les amis ! Pas besoin d'aller bien loin, l'aéroparc nous accueille à bras ouverts. Finis les avions, l'ancien aérodrome s'est transformé en théâtre de verdure. En avance, je longe tranquillement les grandes allées, observe le paysage, les fleurs et le plan d'eau. Vu le nombre d'oiseaux, je ne suis pas seule à profiter de la quiétude des lieux. A rêvasser je me retarde, vite, la bande m'attend sur le terrain de pétanque. Entouré de buissons et équipé de son barbecue, on se croirait dans le jardin ! Le weekend commence bien !" }]
        },
        {
          id: 2,
          city: "Paris",
          time: "De 10h à 14h",
          date: "1/12/2022",
          groupe: "Null",
          path: [{ "lat": 48.8608146, "lng": 2.3360691 }, { "lat": 48.8609032, "lng": 2.3363513 }, { "lat": 48.8604084, "lng": 2.3383879 }, { "lat": 48.8604851, "lng": 2.3386109 }, { "lat": 48.8620424, "lng": 2.3395262 }, { "lat": 48.8610324, "lng": 2.3450374 }, { "lat": 48.8610324, "lng": 2.3450374 }, { "lat": 48.8614061, "lng": 2.345086 }, { "lat": 48.86156750000001, "lng": 2.3453646 }, { "lat": 48.8610148, "lng": 2.3477693 }, { "lat": 48.84271709999999, "lng": 2.3245058 }, { "lat": 48.8431079, "lng": 2.3243924 }, { "lat": 48.8438416, "lng": 2.3244332 }, { "lat": 48.844196, "lng": 2.3243114 }, { "lat": 48.8476983, "lng": 2.3277073 }, { "lat": 48.8512282, "lng": 2.3267548 }, { "lat": 48.8511849, "lng": 2.3266704 }, { "lat": 48.85142889999999, "lng": 2.3266852 }, { "lat": 48.8559649, "lng": 2.3255138 }, { "lat": 48.8563382, "lng": 2.3253426 }, { "lat": 48.859023, "lng": 2.322509 }, { "lat": 48.8611179, "lng": 2.3240788 }, { "lat": 48.8611356, "lng": 2.3239571 }, { "lat": 48.8624041, "lng": 2.3251411 }, { "lat": 48.8623637, "lng": 2.3252278 }, { "lat": 48.8627311, "lng": 2.3252496 }, { "lat": 48.8626958, "lng": 2.3253584 }, { "lat": 48.86556969999999, "lng": 2.327343 }, { "lat": 48.8667041, "lng": 2.3285306 }, { "lat": 48.8684234, "lng": 2.3302379 }, { "lat": 48.8686905, "lng": 2.3305026 }, { "lat": 48.8684484, "lng": 2.3302964 }, { "lat": 48.8676117, "lng": 2.3334384 }, { "lat": 48.8630962, "lng": 2.3353672 }, { "lat": 48.8627773, "lng": 2.3354454 }, { "lat": 48.86236780000001, "lng": 2.3366417 }, { "lat": 48.8609032, "lng": 2.3363513 }, { "lat": 48.8608146, "lng": 2.3360691 }],
          waypoints: [{ "duration": { "text": "1 min", "value": 16 }, "instruction": "Head <b>northeast</b> toward <b>Pass. de Richelieu</b>", "distance": { "text": "23 m", "value": 23 }, "location": { "lat": 48.8608146, "lng": 2.3360691 } }, { "duration": { "text": "2 mins", "value": 121 }, "instruction": "Turn <b>right</b> at <b>Pass. de Richelieu</b><div style=\"font-size:0.9em\">Take the stairs</div>", "distance": { "text": "0.2 km", "value": 159 }, "location": { "lat": 48.8609032, "lng": 2.3363513 } }, { "duration": { "text": "1 min", "value": 14 }, "instruction": "Turn <b>left</b> toward <b>Rue de Marengo</b>", "distance": { "text": "20 m", "value": 20 }, "location": { "lat": 48.8604084, "lng": 2.3383879 } }, { "duration": { "text": "3 mins", "value": 150 }, "instruction": "Turn <b>left</b> onto <b>Rue de Marengo</b>", "distance": { "text": "0.2 km", "value": 195 }, "location": { "lat": 48.8604851, "lng": 2.3386109 } }, { "duration": { "text": "5 mins", "value": 319 }, "instruction": "Turn <b>right</b> onto <b>Rue Saint-Honoré</b>", "distance": { "text": "0.4 km", "value": 417 }, "location": { "lat": 48.8610324, "lng": 2.3450374 } }, { "duration": { "text": "5 mins", "value": 319 }, "instruction": "Turn <b>right</b> onto <b>Rue Saint-Honoré</b>", "distance": { "text": "0.4 km", "value": 417 }, "location": { "lat": 48.8610324, "lng": 2.3450374 } }, { "duration": { "text": "1 min", "value": 34 }, "instruction": "Turn <b>left</b> onto <b>Rue du Pont Neuf</b>", "distance": { "text": "32 m", "value": 32 }, "location": { "lat": 48.8610324, "lng": 2.3450374 } }, { "duration": { "text": "1 min", "value": 28 }, "instruction": "Continue onto <b>Pl. Maurice Quentin</b>", "distance": { "text": "36 m", "value": 36 }, "location": { "lat": 48.8614061, "lng": 2.345086 } }, { "duration": { "text": "2 mins", "value": 140 }, "instruction": "Turn <b>right</b> onto <b>Rue Berger</b>", "distance": { "text": "0.2 km", "value": 186 }, "location": { "lat": 48.86156750000001, "lng": 2.3453646 } }, { "duration": { "text": "1 min", "value": 37 }, "instruction": "Turn <b>left</b> onto <b>Rue Pierre Lescot</b><div style=\"font-size:0.9em\">Destination will be on the left</div>", "distance": { "text": "53 m", "value": 53 }, "location": { "lat": 48.8610148, "lng": 2.3477693 } }, { "duration": { "text": "1 min", "value": 41 }, "instruction": "Head <b>north</b> on <b>Rue d'Odessa</b> toward <b>Rue du Départ</b>", "distance": { "text": "62 m", "value": 62 }, "location": { "lat": 48.84271709999999, "lng": 2.3245058 } }, { "duration": { "text": "1 min", "value": 67 }, "instruction": "Continue onto <b>Rue du Départ</b>", "distance": { "text": "63 m", "value": 63 }, "location": { "lat": 48.8431079, "lng": 2.3243924 } }, { "duration": { "text": "1 min", "value": 39 }, "instruction": "Continue onto <b>Pl. du 18 Juin 1940</b>", "distance": { "text": "44 m", "value": 44 }, "location": { "lat": 48.8438416, "lng": 2.3244332 } }, { "duration": { "text": "6 mins", "value": 341 }, "instruction": "<b>Pl. du 18 Juin 1940</b> turns slightly <b>right</b> and becomes <b>Rue de Rennes</b>", "distance": { "text": "0.5 km", "value": 492 }, "location": { "lat": 48.844196, "lng": 2.3243114 } }, { "duration": { "text": "5 mins", "value": 285 }, "instruction": "Slight <b>left</b> onto <b>Bd Raspail</b>", "distance": { "text": "0.4 km", "value": 389 }, "location": { "lat": 48.8476983, "lng": 2.3277073 } }, { "duration": { "text": "1 min", "value": 11 }, "instruction": "Turn <b>left</b> onto <b>Rue de Sèvres</b>", "distance": { "text": "15 m", "value": 15 }, "location": { "lat": 48.8512282, "lng": 2.3267548 } }, { "duration": { "text": "1 min", "value": 21 }, "instruction": "Cross the road", "distance": { "text": "15 m", "value": 15 }, "location": { "lat": 48.8511849, "lng": 2.3266704 } }, { "duration": { "text": "7 mins", "value": 396 }, "instruction": "Turn <b>left</b> onto <b>Pl. le Corbusier</b>/<wbr/><b>Bd Raspail</b><div style=\"font-size:0.9em\">Continue to follow Bd Raspail</div>", "distance": { "text": "0.5 km", "value": 519 }, "location": { "lat": 48.85142889999999, "lng": 2.3266852 } }, { "duration": { "text": "1 min", "value": 33 }, "instruction": "Slight <b>left</b> to stay on <b>Bd Raspail</b>", "distance": { "text": "46 m", "value": 46 }, "location": { "lat": 48.8559649, "lng": 2.3255138 } }, { "duration": { "text": "5 mins", "value": 270 }, "instruction": "Slight <b>left</b> onto <b>Bd Saint-Germain</b>", "distance": { "text": "0.4 km", "value": 362 }, "location": { "lat": 48.8563382, "lng": 2.3253426 } }, { "duration": { "text": "3 mins", "value": 208 }, "instruction": "Turn <b>right</b> onto <b>Rue de Solferino</b>", "distance": { "text": "0.3 km", "value": 258 }, "location": { "lat": 48.859023, "lng": 2.322509 } }, { "duration": { "text": "1 min", "value": 3 }, "instruction": "Turn <b>left</b> onto <b>Quai Anatole France</b>", "distance": { "text": "4 m", "value": 4 }, "location": { "lat": 48.8611179, "lng": 2.3240788 } }, { "duration": { "text": "2 mins", "value": 131 }, "instruction": "Turn <b>right</b> onto <b>Léopold Sedar Senghor</b><div style=\"font-size:0.9em\">Take the stairs</div>", "distance": { "text": "0.2 km", "value": 161 }, "location": { "lat": 48.8611356, "lng": 2.3239571 } }, { "duration": { "text": "1 min", "value": 7 }, "instruction": "Turn <b>left</b> toward <b>Terr. du Bord de l'Eau</b>", "distance": { "text": "10 m", "value": 10 }, "location": { "lat": 48.8624041, "lng": 2.3251411 } }, { "duration": { "text": "1 min", "value": 24 }, "instruction": "Turn <b>right</b> at <b>Quai Aimé Cesaire</b>/<wbr/><b>Quai des Tuileries</b>", "distance": { "text": "30 m", "value": 30 }, "location": { "lat": 48.8623637, "lng": 2.3252278 } }, { "duration": { "text": "1 min", "value": 6 }, "instruction": "Turn <b>right</b> onto <b>Terr. du Bord de l'Eau</b>", "distance": { "text": "9 m", "value": 9 }, "location": { "lat": 48.8627311, "lng": 2.3252496 } }, { "duration": { "text": "5 mins", "value": 277 }, "instruction": "Turn <b>left</b> onto <b>All. de Castiglione</b><div style=\"font-size:0.9em\">Take the stairs</div>", "distance": { "text": "0.3 km", "value": 349 }, "location": { "lat": 48.8626958, "lng": 2.3253584 } }, { "duration": { "text": "2 mins", "value": 107 }, "instruction": "Head <b>northeast</b> on <b>Rue de Castiglione</b> toward <b>Rue du Mont Thabor</b>", "distance": { "text": "0.1 km", "value": 148 }, "location": { "lat": 48.86556969999999, "lng": 2.327343 } }, { "duration": { "text": "3 mins", "value": 191 }, "instruction": "Continue onto <b>Pl. Vendôme</b>", "distance": { "text": "0.2 km", "value": 235 }, "location": { "lat": 48.8667041, "lng": 2.3285306 } }, { "duration": { "text": "1 min", "value": 40 }, "instruction": "Continue onto <b>Rue de la Paix</b>", "distance": { "text": "41 m", "value": 41 }, "location": { "lat": 48.8684234, "lng": 2.3302379 } }, { "duration": { "text": "1 min", "value": 29 }, "instruction": "Head <b>southwest</b> on <b>Rue de la Paix</b> toward <b>Rue Danielle Casanova</b>", "distance": { "text": "41 m", "value": 41 }, "location": { "lat": 48.8686905, "lng": 2.3305026 } }, { "duration": { "text": "3 mins", "value": 199 }, "instruction": "Turn <b>left</b> onto <b>Rue Danielle Casanova</b>", "distance": { "text": "0.3 km", "value": 256 }, "location": { "lat": 48.8684484, "lng": 2.3302964 } }, { "duration": { "text": "7 mins", "value": 399 }, "instruction": "Turn <b>right</b> onto <b>Av. de l'Opéra</b>", "distance": { "text": "0.5 km", "value": 509 }, "location": { "lat": 48.8676117, "lng": 2.3334384 } }, { "duration": { "text": "1 min", "value": 48 }, "instruction": "Continue onto <b>Rue de Rohan</b>", "distance": { "text": "52 m", "value": 52 }, "location": { "lat": 48.8630962, "lng": 2.3353672 } }, { "duration": { "text": "1 min", "value": 79 }, "instruction": "Turn <b>left</b> onto <b>Rue de Rivoli</b>", "distance": { "text": "0.1 km", "value": 106 }, "location": { "lat": 48.8627773, "lng": 2.3354454 } }, { "duration": { "text": "2 mins", "value": 131 }, "instruction": "Turn <b>right</b> onto <b>Pass. de Richelieu</b>", "distance": { "text": "0.2 km", "value": 168 }, "location": { "lat": 48.86236780000001, "lng": 2.3366417 } }, { "duration": { "text": "1 min", "value": 16 }, "instruction": "Turn <b>right</b><div style=\"font-size:0.9em\">Destination will be on the right</div>", "distance": { "text": "23 m", "value": 23 }, "location": { "lat": 48.8609032, "lng": 2.3363513 } }, { "duration": { "text": "1 min", "value": 0 }, "instruction": "Head", "distance": { "text": "1 m", "value": 0 }, "location": { "lat": 48.8608146, "lng": 2.3360691 } }],
          POIInfo: [
            { "name": "Auditorium du Louvre", "image": "https://www.cnap.fr/sites/default/files/styles/mobile/public/import_destination/image/50910_3850_imginstitutionmodif_image14112v2m56577569830537520.jpg?itok=nfs4k-qb", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "geolocalisation": { "lat": 48.8608146, "lng": 2.3360691 }, "description": "800 Protestants allemands demandent en 1876 la construction d'un lieu de culte qui leur soit dédié. Caractéristique de l'architecture protestante de la fin du XIXème siècle, le temple étonne par ses similitudes avec les églises catholiques. De style néo-gothique, très prisé par les Allemands, il présente un plan allongé, une tour, un chevet polygonal et surtout l'utilisation de la célèbre pierre de Jaumont. C'est surtout la grande rose de la façade qui rappellent les styles architecturaux des églises catholiques. La décoration intérieure et les vitraux colorés, là encore, s'intègrent dans le style néo-gothique. La sobriété des lieux rappellent les préceptes religieux valorisés par les Protestants." },
            { "name": "Forum des images", "image": "https://www.1001salles.com/images/provider/311/1655991408_62b46c70c0fa2.jpg", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "geolocalisation": { "lat": 48.8615056, "lng": 2.3478222999999616 }, "description": "Installé au cœur du Forum des Halles, le Forum des images est créé en 1988 dans le but de constituer la mémoire audiovisuelle de Paris. Riche de plusieurs milliers d’heures d’images, il archive le patrimoine audiovisuel dans toute sa diversité : fictions, documentaires, publicités, animation, courts et longs métrages, séries télévisées ou encore films amateurs… L'institution organise également des événements, des rencontres, des festivals ou encore des débats thématiques." },
            { "name": "Timhotel Odessa Montparnasse", "image": "https://media-cdn.tripadvisor.com/media/photo-s/0a/a8/57/01/facade.jpg", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "geolocalisation": { "lat": 48.8427079, "lng": 2.3244333000000097 }, "description": "800 Protestants allemands demandent en 1876 la construction d'un lieu de culte qui leur soit dédié. Caractéristique de l'architecture protestante de la fin du XIXème siècle, le temple étonne par ses similitudes avec les églises catholiques. De style néo-gothique, très prisé par les Allemands, il présente un plan allongé, une tour, un chevet polygonal et surtout l'utilisation de la célèbre pierre de Jaumont. C'est surtout la grande rose de la façade qui rappellent les styles architecturaux des églises catholiques. La décoration intérieure et les vitraux colorés, là encore, s'intègrent dans le style néo-gothique. La sobriété des lieux rappellent les préceptes religieux valorisés par les Protestants." },
            { "name": "Jovoy Paris", "image": "https://www.jovoyparis.com/img/st/4.jpg", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "geolocalisation": { "lat": 48.865514, "lng": 2.327490600000033 }, "description": "800 Protestants allemands demandent en 1876 la construction d'un lieu de culte qui leur soit dédié. Caractéristique de l'architecture protestante de la fin du XIXème siècle, le temple étonne par ses similitudes avec les églises catholiques. De style néo-gothique, très prisé par les Allemands, il présente un plan allongé, une tour, un chevet polygonal et surtout l'utilisation de la célèbre pierre de Jaumont. C'est surtout la grande rose de la façade qui rappellent les styles architecturaux des églises catholiques. La décoration intérieure et les vitraux colorés, là encore, s'intègrent dans le style néo-gothique. La sobriété des lieux rappellent les préceptes religieux valorisés par les Protestants." },
            { "name": "Park Hyatt Paris-Vendôme", "image": "https://media-cdn.tripadvisor.com/media/photo-s/23/6f/ef/ac/exterior.jpg", "openHours": "Lundi: 8:00 - 16:00   Mardi: 8:00 - 16:00\nMercredi: 8:00 - 16:00   Jeudi: 8:00 - 16:00\nVendredi: 8:00 - 16:00   Samedi: 8:00 - 18:00\nDimanche: 8:00 - 18:00\n", "geolocalisation": { "lat": 48.8686535, "lng": 2.330588900000066 }, "description": "800 Protestants allemands demandent en 1876 la construction d'un lieu de culte qui leur soit dédié. Caractéristique de l'architecture protestante de la fin du XIXème siècle, le temple étonne par ses similitudes avec les églises catholiques. De style néo-gothique, très prisé par les Allemands, il présente un plan allongé, une tour, un chevet polygonal et surtout l'utilisation de la célèbre pierre de Jaumont. C'est surtout la grande rose de la façade qui rappellent les styles architecturaux des églises catholiques. La décoration intérieure et les vitraux colorés, là encore, s'intègrent dans le style néo-gothique. La sobriété des lieux rappellent les préceptes religieux valorisés par les Protestants." }]
        },
      ],
    }
  },
  mounted() {
    if (this.$store.state.userId) {
      try {
        this.$store.dispatch("retrieveUserInformation");
        if (this.$store.state.globalNonPersistantData.groups.length == 0)
          this.$store.dispatch("getGroup");
      } catch (error) {
        console.log(error);
      }
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
        return (this.itinerary[this.selectedItinerary - 1].POIInfo[this.currentWaypointIndex].geolocalisation);
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
    itineraryCardsHasBeenClicked(itineraryId) {
      this.selectedItinerary = itineraryId;
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
}

.dropdownArrowPosition {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
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
  height: 10%;
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
