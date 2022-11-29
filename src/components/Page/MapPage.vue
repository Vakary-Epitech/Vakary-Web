<!-- This component is used for the map page of the website
     It is not using the i18n system yet for a translation system => only available in english atm -->

<template>
  <div>
    <top-bar class="col-12" />
    <div>
      <GMapMap :center="userPosition" :options="options" :zoom="12" style="width: 100%; height: 89.5vh" ref="myMapRef">
        <GMapMarker :key="marker.label" v-for="marker in markersData" :position="marker.geolocalisation"
          :title="marker.label" :clickable="true" @click="openInfoWindow(marker.label, marker.geolocalisation)">
          <GMapInfoWindow :closeclick="true" @closeclick="openInfoWindow(null)"
            :opened="openedMarkerID === marker.label">
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
        <GMapPolyline :options="{ strokeColor: '#000642' }" :path="selectedPath" ref="polyline" />
      </GMapMap>
      <div>
        Map Page</div>
      <div>
        {{ this.path }}
        <br /><br />
        {{ this.waypoints }}
      </div>
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
          <input type="radio" :value=locomotionType.locomotionType
            v-model="$store.state.mapStore.selectedMethodOfLocomotion" />
        </div>
      </div>
      <div>
        <h2>FAKE PROFILE</h2>
        <input v-model="$store.state.mapStore.tripTime" placeholder="Number of hour of the trip">
        <p>Duration of the trip: {{ $store.state.mapStore.tripTime }}h</p>
        <div v-for="POI in possibleType" :key="POI.id">
          <span>{{ POI.POIType }}</span>
          <input type="checkbox" :value=POI.POIType v-model="$store.state.mapStore.selectedTypeOfInterest" />
        </div>
        {{ $store.state.mapStore.selectedTypeOfInterest }}
      </div>
    </div>
    <div class="boxPosition">
      <div class="widgetPanel">
        <div v-if="!displayItineraryInformation" :class="(itineraryDropdownStatus)">
          <div class="dropdown-trigger" @click="(setItineraryDropdownState())">
            <button class="dropdownDesignMapPage" :style="itineraryCssDropdown" aria-haspopup="true" aria-controls="dropdown-menu2">
              <span class="dropdownTextPosition">Itinéraires</span>
              <span class="icon is-small dropdownArrowPosition">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu2" role="menu">
            <div class="dropdown-content" v-for="itineraryDisplay in itinerary" :key="itineraryDisplay.id">
              <div class="dropdown-item">
                <mapCards :city="itineraryDisplay.city" :time="itineraryDisplay.time" :groupe="itineraryDisplay.groupe" :id="itineraryDisplay.id"
                  @click="itineraryCardsHasBeenClicked(itineraryDisplay.id)" />
                </div>
                <div class="topBorder">&nbsp;</div>
            </div>
          </div>
        </div>
        <div v-else>
          <itineratyExplanation @goBackToItineraryDropdown="goBackToItineraryDropdown" :selectedItineraryInfo="selectedItineraryInfo" />
        </div>
      </div>
    </div>
    {{ $store.state.userStore.currentUserLocation }}
  </div>
</template>

<script>
import topBar from '../UI/TopBar.vue';
import mapCards from '../UI/mapCards.vue';
import itineratyExplanation from '../UI/itineraryExplanation.vue';

export default {
  name: 'App',
  components: {
    topBar,
    mapCards,
    itineratyExplanation,
  },
  data() {
    return {
      selectedItinerary: 0,
      displayItineraryInformation: false,
      itineraryDropdown: false,
      groupDropdown: false,
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
          groupe: "Vakary",
          path: [{ "lat": 49.3595081, "lng": 6.1658741 }, { "lat": 49.3591967, "lng": 6.1655107 }, { "lat": 49.3589729, "lng": 6.1658066 }, { "lat": 49.359345, "lng": 6.1663524 }, { "lat": 49.3591922, "lng": 6.1670151 }, { "lat": 49.3591922, "lng": 6.1670151 }, { "lat": 49.35897199999999, "lng": 6.167534 }, { "lat": 49.3583571, "lng": 6.168156 }, { "lat": 49.3579716, "lng": 6.1686348 }, { "lat": 49.3578054, "lng": 6.1685653 }, { "lat": 49.3574824, "lng": 6.1680104 }, { "lat": 49.3576006, "lng": 6.1678443 }, { "lat": 49.357343, "lng": 6.16752 }, { "lat": 49.3577014, "lng": 6.1669483 }, { "lat": 49.3575993, "lng": 6.1670826 }, { "lat": 49.3573789, "lng": 6.1668805 }, { "lat": 49.3570885, "lng": 6.1672946 }, { "lat": 49.3570511, "lng": 6.1673514 }, { "lat": 49.3567814, "lng": 6.167666 }, { "lat": 49.3573269, "lng": 6.1685192 }, { "lat": 49.3537183, "lng": 6.1738162 }, { "lat": 49.3532632, "lng": 6.175095000000001 }, { "lat": 49.3533273, "lng": 6.175752999999999 }, { "lat": 49.3535101, "lng": 6.178956299999999 }, { "lat": 49.357935, "lng": 6.188476 }, { "lat": 49.35735140000001, "lng": 6.189680999999999 }, { "lat": 49.3564269, "lng": 6.194566 }, { "lat": 49.3574535, "lng": 6.195831999999999 }, { "lat": 49.355842, "lng": 6.199231 }, { "lat": 49.356029, "lng": 6.199237 }, { "lat": 49.3584501, "lng": 6.202045099999999 }, { "lat": 49.35832430000001, "lng": 6.202713 }, { "lat": 49.3584501, "lng": 6.202045099999999 }, { "lat": 49.35619990000001, "lng": 6.2012002 }, { "lat": 49.356029, "lng": 6.199237 }, { "lat": 49.355842, "lng": 6.199231 }, { "lat": 49.3574535, "lng": 6.195831999999999 }, { "lat": 49.3564269, "lng": 6.194566 }, { "lat": 49.3572894, "lng": 6.1899278 }, { "lat": 49.357935, "lng": 6.188476 }, { "lat": 49.3535101, "lng": 6.178956299999999 }, { "lat": 49.3533273, "lng": 6.175752999999999 }, { "lat": 49.35324379999999, "lng": 6.1754786 }],
          waypoints: [{ "duration": { "text": "1 min", "value": 32 }, "instruction": "Head <b>southwest</b> on <b>Pass. du Temple</b> toward <b>Rue du Manège</b>", "distance": { "text": "44 m", "value": 44 }, "location": { "lat": 49.3595081, "lng": 6.1658741 } }, { "duration": { "text": "1 min", "value": 25 }, "instruction": "Turn <b>left</b> onto <b>Rue du Manège</b>", "distance": { "text": "33 m", "value": 33 }, "location": { "lat": 49.3591967, "lng": 6.1655107 } }, { "duration": { "text": "1 min", "value": 43 }, "instruction": "Turn <b>left</b> onto <b>Pl. Général Hugo</b>", "distance": { "text": "57 m", "value": 57 }, "location": { "lat": 49.3589729, "lng": 6.1658066 } }, { "duration": { "text": "1 min", "value": 35 }, "instruction": "<b>Pl. Général Hugo</b> turns <b>right</b> and becomes <b>Pass. du Dispensaire</b>", "distance": { "text": "52 m", "value": 52 }, "location": { "lat": 49.3591922, "lng": 6.1670151 } }, { "duration": { "text": "1 min", "value": 35 }, "instruction": "<b>Pl. Général Hugo</b> turns <b>right</b> and becomes <b>Pass. du Dispensaire</b>", "distance": { "text": "52 m", "value": 52 }, "location": { "lat": 49.3591922, "lng": 6.1670151 } }, { "duration": { "text": "1 min", "value": 32 }, "instruction": "Continue onto <b>Pl. Claude Arnoult</b>", "distance": { "text": "45 m", "value": 45 }, "location": { "lat": 49.3591922, "lng": 6.1670151 } }, { "duration": { "text": "1 min", "value": 64 }, "instruction": "Continue onto <b>Rue du Mersch</b>", "distance": { "text": "82 m", "value": 82 }, "location": { "lat": 49.35897199999999, "lng": 6.167534 } }, { "duration": { "text": "1 min", "value": 43 }, "instruction": "Continue onto <b>Rue des Clarisses</b>", "distance": { "text": "55 m", "value": 55 }, "location": { "lat": 49.3583571, "lng": 6.168156 } }, { "duration": { "text": "1 min", "value": 17 }, "instruction": "Turn <b>right</b> onto <b>Cr du Château</b>", "distance": { "text": "22 m", "value": 22 }, "location": { "lat": 49.3579716, "lng": 6.1686348 } }, { "duration": { "text": "1 min", "value": 39 }, "instruction": "Turn <b>right</b> onto <b>Sq. de l'Hôtel de ville</b>", "distance": { "text": "54 m", "value": 54 }, "location": { "lat": 49.3578054, "lng": 6.1685653 } }, { "duration": { "text": "1 min", "value": 14 }, "instruction": "Turn <b>right</b> onto <b>Rue Georges Ditsch</b>", "distance": { "text": "18 m", "value": 18 }, "location": { "lat": 49.3574824, "lng": 6.1680104 } }, { "duration": { "text": "1 min", "value": 28 }, "instruction": "Turn <b>left</b> onto <b>Rue Grande Duchesse Charlotte</b>", "distance": { "text": "37 m", "value": 37 }, "location": { "lat": 49.3576006, "lng": 6.1678443 } }, { "duration": { "text": "1 min", "value": 42 }, "instruction": "Turn <b>right</b> onto <b>Rue de l'Ancien Hôtel de ville</b>", "distance": { "text": "58 m", "value": 58 }, "location": { "lat": 49.357343, "lng": 6.16752 } }, { "duration": { "text": "1 min", "value": 10 }, "instruction": "Head <b>southeast</b> on <b>Rue de l'Ancien Hôtel de ville</b> toward <b>Rue de la Tour</b>", "distance": { "text": "15 m", "value": 15 }, "location": { "lat": 49.3577014, "lng": 6.1669483 } }, { "duration": { "text": "1 min", "value": 21 }, "instruction": "Turn <b>right</b> onto <b>Rue de la Tour</b>", "distance": { "text": "29 m", "value": 29 }, "location": { "lat": 49.3575993, "lng": 6.1670826 } }, { "duration": { "text": "1 min", "value": 34 }, "instruction": "Turn <b>left</b> onto <b>Rue Saint-Maximin</b><div style=\"font-size:0.9em\">Destination will be on the right</div>", "distance": { "text": "44 m", "value": 44 }, "location": { "lat": 49.3573789, "lng": 6.1668805 } }, { "duration": { "text": "1 min", "value": 4 }, "instruction": "Head <b>southeast</b> on <b>Rue Saint-Maximin</b> toward <b>Pl. de l'Église</b>", "distance": { "text": "6 m", "value": 6 }, "location": { "lat": 49.3570885, "lng": 6.1672946 } }, { "duration": { "text": "1 min", "value": 27 }, "instruction": "Continue onto <b>Pl. de l'Église</b>", "distance": { "text": "38 m", "value": 38 }, "location": { "lat": 49.3570511, "lng": 6.1673514 } }, { "duration": { "text": "1 min", "value": 64 }, "instruction": "Turn <b>left</b> onto <b>Quai Nicolas Crauser</b>/<wbr/><b>N53</b><div style=\"font-size:0.9em\">Continue to follow N53</div>", "distance": { "text": "87 m", "value": 87 }, "location": { "lat": 49.3567814, "lng": 6.167666 } }, { "duration": { "text": "7 mins", "value": 441 }, "instruction": "Sharp <b>right</b> onto <b>Quai Pierre Marchal</b>/<wbr/><b>N1153</b><div style=\"font-size:0.9em\">Continue to follow N1153</div>", "distance": { "text": "0.6 km", "value": 565 }, "location": { "lat": 49.3573269, "lng": 6.1685192 } }, { "duration": { "text": "1 min", "value": 79 }, "instruction": "Slight <b>left</b> onto <b>Bd Robert Schuman</b>/<wbr/><b>N1153</b>", "distance": { "text": "0.1 km", "value": 106 }, "location": { "lat": 49.3537183, "lng": 6.1738162 } }, { "duration": { "text": "1 min", "value": 47 }, "instruction": "At the roundabout, take the <b>1st</b> exit onto <b>Rue du Couronné</b>", "distance": { "text": "51 m", "value": 51 }, "location": { "lat": 49.3532632, "lng": 6.175095000000001 } }, { "duration": { "text": "3 mins", "value": 184 }, "instruction": "Slight <b>right</b>", "distance": { "text": "0.2 km", "value": 242 }, "location": { "lat": 49.3533273, "lng": 6.175752999999999 } }, { "duration": { "text": "11 mins", "value": 633 }, "instruction": "Turn <b>left</b> onto <b>Bd Robert Schuman</b>/<wbr/><b>D953A</b><div style=\"font-size:0.9em\">Go through 1 roundabout</div>", "distance": { "text": "0.8 km", "value": 850 }, "location": { "lat": 49.3535101, "lng": 6.178956299999999 } }, { "duration": { "text": "1 min", "value": 83 }, "instruction": "Turn <b>right</b> onto <b>Rue des Romains</b>", "distance": { "text": "0.1 km", "value": 109 }, "location": { "lat": 49.357935, "lng": 6.188476 } }, { "duration": { "text": "5 mins", "value": 289 }, "instruction": "At the roundabout, take the <b>2nd</b> exit onto <b>Rue Drogon</b>", "distance": { "text": "0.4 km", "value": 375 }, "location": { "lat": 49.35735140000001, "lng": 6.189680999999999 } }, { "duration": { "text": "2 mins", "value": 108 }, "instruction": "Turn <b>left</b> onto <b>Rue de l'Aviation</b>", "distance": { "text": "0.1 km", "value": 146 }, "location": { "lat": 49.3564269, "lng": 6.194566 } }, { "duration": { "text": "4 mins", "value": 226 }, "instruction": "Turn <b>right</b>", "distance": { "text": "0.3 km", "value": 312 }, "location": { "lat": 49.3574535, "lng": 6.195831999999999 } }, { "duration": { "text": "1 min", "value": 16 }, "instruction": "Turn <b>left</b> toward <b>Av. du Général de Gaulle</b>", "distance": { "text": "21 m", "value": 21 }, "location": { "lat": 49.355842, "lng": 6.199231 } }, { "duration": { "text": "5 mins", "value": 297 }, "instruction": "Turn <b>right</b> onto <b>Av. du Général de Gaulle</b>", "distance": { "text": "0.4 km", "value": 401 }, "location": { "lat": 49.356029, "lng": 6.199237 } }, { "duration": { "text": "1 min", "value": 37 }, "instruction": "Turn <b>right</b> onto <b>Rue de Jérusalem</b>", "distance": { "text": "50 m", "value": 50 }, "location": { "lat": 49.3584501, "lng": 6.202045099999999 } }, { "duration": { "text": "1 min", "value": 36 }, "instruction": "Head <b>west</b> on <b>Rue de Jérusalem</b> toward <b>Av. du Général de Gaulle</b>", "distance": { "text": "50 m", "value": 50 }, "location": { "lat": 49.35832430000001, "lng": 6.202713 } }, { "duration": { "text": "3 mins", "value": 195 }, "instruction": "Turn <b>left</b> onto <b>Av. du Général de Gaulle</b>", "distance": { "text": "0.3 km", "value": 258 }, "location": { "lat": 49.3584501, "lng": 6.202045099999999 } }, { "duration": { "text": "2 mins", "value": 104 }, "instruction": "Turn <b>right</b> to stay on <b>Av. du Général de Gaulle</b>", "distance": { "text": "0.1 km", "value": 144 }, "location": { "lat": 49.35619990000001, "lng": 6.2012002 } }, { "duration": { "text": "1 min", "value": 16 }, "instruction": "Turn <b>left</b>", "distance": { "text": "21 m", "value": 21 }, "location": { "lat": 49.356029, "lng": 6.199237 } }, { "duration": { "text": "4 mins", "value": 226 }, "instruction": "Turn <b>right</b>", "distance": { "text": "0.3 km", "value": 312 }, "location": { "lat": 49.355842, "lng": 6.199231 } }, { "duration": { "text": "2 mins", "value": 105 }, "instruction": "Turn <b>left</b> onto <b>Rue de l'Aviation</b>", "distance": { "text": "0.1 km", "value": 146 }, "location": { "lat": 49.3574535, "lng": 6.195831999999999 } }, { "duration": { "text": "4 mins", "value": 259 }, "instruction": "Turn <b>right</b> onto <b>Rue Drogon</b>", "distance": { "text": "0.4 km", "value": 352 }, "location": { "lat": 49.3564269, "lng": 6.194566 } }, { "duration": { "text": "2 mins", "value": 107 }, "instruction": "At the roundabout, take the <b>2nd</b> exit onto <b>Rue des Romains</b>", "distance": { "text": "0.1 km", "value": 132 }, "location": { "lat": 49.3572894, "lng": 6.1899278 } }, { "duration": { "text": "11 mins", "value": 653 }, "instruction": "Turn <b>left</b> onto <b>Av. des Nations</b>/<wbr/><b>D953A</b><div style=\"font-size:0.9em\">Go through 1 roundabout</div>", "distance": { "text": "0.8 km", "value": 850 }, "location": { "lat": 49.357935, "lng": 6.188476 } }, { "duration": { "text": "3 mins", "value": 172 }, "instruction": "Turn <b>right</b>", "distance": { "text": "0.2 km", "value": 242 }, "location": { "lat": 49.3535101, "lng": 6.178956299999999 } }, { "duration": { "text": "1 min", "value": 18 }, "instruction": "Turn <b>left</b> onto <b>Rue du Couronné</b>", "distance": { "text": "22 m", "value": 22 }, "location": { "lat": 49.3533273, "lng": 6.175752999999999 } }, { "duration": { "text": "7 mins", "value": 433 }, "instruction": "At the roundabout, take the <b>1st</b> exit onto <b>Bd Robert Schuman</b>/<wbr/><b>N1153</b> heading to <b>Thionville-Centre</b>/<wbr/><b>Hettange-Grande</b>/<wbr/><b>Mondorf les Bains</b><div style=\"font-size:0.9em\">Continue to follow N1153</div>", "distance": { "text": "0.6 km", "value": 572 }, "location": { "lat": 49.35324379999999, "lng": 6.1754786 } }],
          POIInfo: [{ "name": "TEMPLE PROTESTANT", "geolocalisation": { "lat": 49.3596656611796, "lng": 6.16554702009888 }, "description": "800 Protestants allemands demandent en 1876 la construction d'un lieu de culte qui leur soit dédié. Caractéristique de l'architecture protestante de la fin du XIXème siècle, le temple étonne par ses similitudes avec les églises catholiques. De style néo-gothique, très prisé par les Allemands, il présente un plan allongé, une tour, un chevet polygonal et surtout l'utilisation de la célèbre pierre de Jaumont. C'est surtout la grande rose de la façade qui rappellent les styles architecturaux des églises catholiques. La décoration intérieure et les vitraux colorés, là encore, s'intègrent dans le style néo-gothique. La sobriété des lieux rappellent les préceptes religieux valorisés par les Protestants."},
                    { "name": "AUTEL DE LA PATRIE", "geolocalisation": { "lat": 49.3589350848185, "lng": 6.16736534543838 }, "description": "Et si vous découvriez un obélisque vieux de plusieurs siècles ?\nÉrigé en 1797, le monolithe est démantelé sur ordre du Premier consul en 1799. Devenu simple monument aux morts au cimetière de Thionville, il retrouve sa place au centre de la cité en 1948.\nIl porte fièrement la Légion d'honneur et la croix de Guerre, deux décorations données à Thionville en 1920 et 1948 pour sa résistance et sa bravoure que l'on retrouve dans la citation de 1792 \"Thionville et sa garnison ont bien mérité de la Patrie\"."},
                    { "name": "BEFFROI", "geolocalisation": { "lat": 49.35770209228785, "lng": 6.16694946032715 }, "description": "Planté au milieu du centre ville de Thionville, sa girouette dorée étincelle. On ne peut pas le manquer. On ne voit que lui. Triomphal, il rappelle les libertés communales octroyées par le Comte Henri de Luxembourg au XIIIème siècle. Tour de de guet, bâtiment annexe de l'hôtel de ville, hôpital pour les pauvres, ce géant tout de jaune vêtu, est l'un des symboles de la ville. Construit au XIVème siècle, il abrite en son sein la Grosse Suzanne, cloche de 2 tonnes dont les plus chanceux seulement peuvent en apercevoir les formes généreuses. \nLes salles du beffroi sont ouvertes dans le cadres de manifestations."},
                    { "name": "ÉGLISE SAINT-MAXIMIN", "geolocalisation": { "lat": 49.3570691, "lng": 6.1672644 }, "description": "Place de l'Eglise. On entend les cloches sonner. Cette silhouette rappelle vaguement Notre-Dame-de-Paris et ses deux tours. En a-t-elle également le bossu ? On dit pourtant qu'Hugo Père a défendu la cité de Thionville en 1814 et 1815. Qui a inspiré quoi ? Toute vêtue de pierre jaune de Jaumont, elle titille notre curiosité par sa sobriété extérieure. Une croix, un fronton d'où ressortent des angelots bien ronds, deux drapées, deux médaillons de Saint Pierre et Saint Paul. Voilà. Sa description pour les spécialistes peut s'enrichir de ses pilastres aux chapiteaux ioniques. Vaste vocabulaire. Ses deux impressionnantes tours d'où guettaient les soldats, ponctuent la majesté de sa simplicité.  \nIl ne vous reste qu'à pousser la porte."},
                    { "name": "AÉROPARC YUSSOIS", "geolocalisation": { "lat": 49.3583233, "lng": 6.202935 }, "description": "Vendredi, c'est apéro-pétanque avec les amis ! Pas besoin d'aller bien loin, l'aéroparc nous accueille à bras ouverts. Finis les avions, l'ancien aérodrome s'est transformé en théâtre de verdure. En avance, je longe tranquillement les grandes allées, observe le paysage, les fleurs et le plan d'eau. Vu le nombre d'oiseaux, je ne suis pas seule à profiter de la quiétude des lieux. A rêvasser je me retarde, vite, la bande m'attend sur le terrain de pétanque. Entouré de buissons et équipé de son barbecue, on se croirait dans le jardin ! Le weekend commence bien !"}]

        },
        {
          id: 2,
          city: "Paris",
          time: "De 10h à 14h",
          groupe: "Null",
          path: [{ "lat": 48.8608146, "lng": 2.3360691 }, { "lat": 48.8609032, "lng": 2.3363513 }, { "lat": 48.8604084, "lng": 2.3383879 }, { "lat": 48.8604851, "lng": 2.3386109 }, { "lat": 48.8620424, "lng": 2.3395262 }, { "lat": 48.8610324, "lng": 2.3450374 }, { "lat": 48.8610324, "lng": 2.3450374 }, { "lat": 48.8614061, "lng": 2.345086 }, { "lat": 48.86156750000001, "lng": 2.3453646 }, { "lat": 48.8610148, "lng": 2.3477693 }, { "lat": 48.84271709999999, "lng": 2.3245058 }, { "lat": 48.8431079, "lng": 2.3243924 }, { "lat": 48.8438416, "lng": 2.3244332 }, { "lat": 48.844196, "lng": 2.3243114 }, { "lat": 48.8476983, "lng": 2.3277073 }, { "lat": 48.8512282, "lng": 2.3267548 }, { "lat": 48.8511849, "lng": 2.3266704 }, { "lat": 48.85142889999999, "lng": 2.3266852 }, { "lat": 48.8559649, "lng": 2.3255138 }, { "lat": 48.8563382, "lng": 2.3253426 }, { "lat": 48.859023, "lng": 2.322509 }, { "lat": 48.8611179, "lng": 2.3240788 }, { "lat": 48.8611356, "lng": 2.3239571 }, { "lat": 48.8624041, "lng": 2.3251411 }, { "lat": 48.8623637, "lng": 2.3252278 }, { "lat": 48.8627311, "lng": 2.3252496 }, { "lat": 48.8626958, "lng": 2.3253584 }, { "lat": 48.86556969999999, "lng": 2.327343 }, { "lat": 48.8667041, "lng": 2.3285306 }, { "lat": 48.8684234, "lng": 2.3302379 }, { "lat": 48.8686905, "lng": 2.3305026 }, { "lat": 48.8684484, "lng": 2.3302964 }, { "lat": 48.8676117, "lng": 2.3334384 }, { "lat": 48.8630962, "lng": 2.3353672 }, { "lat": 48.8627773, "lng": 2.3354454 }, { "lat": 48.86236780000001, "lng": 2.3366417 }, { "lat": 48.8609032, "lng": 2.3363513 }, { "lat": 48.8608146, "lng": 2.3360691 }],
          waypoints: [{ "duration": { "text": "1 min", "value": 16 }, "instruction": "Head <b>northeast</b> toward <b>Pass. de Richelieu</b>", "distance": { "text": "23 m", "value": 23 }, "location": { "lat": 48.8608146, "lng": 2.3360691 } }, { "duration": { "text": "2 mins", "value": 121 }, "instruction": "Turn <b>right</b> at <b>Pass. de Richelieu</b><div style=\"font-size:0.9em\">Take the stairs</div>", "distance": { "text": "0.2 km", "value": 159 }, "location": { "lat": 48.8609032, "lng": 2.3363513 } }, { "duration": { "text": "1 min", "value": 14 }, "instruction": "Turn <b>left</b> toward <b>Rue de Marengo</b>", "distance": { "text": "20 m", "value": 20 }, "location": { "lat": 48.8604084, "lng": 2.3383879 } }, { "duration": { "text": "3 mins", "value": 150 }, "instruction": "Turn <b>left</b> onto <b>Rue de Marengo</b>", "distance": { "text": "0.2 km", "value": 195 }, "location": { "lat": 48.8604851, "lng": 2.3386109 } }, { "duration": { "text": "5 mins", "value": 319 }, "instruction": "Turn <b>right</b> onto <b>Rue Saint-Honoré</b>", "distance": { "text": "0.4 km", "value": 417 }, "location": { "lat": 48.8610324, "lng": 2.3450374 } }, { "duration": { "text": "5 mins", "value": 319 }, "instruction": "Turn <b>right</b> onto <b>Rue Saint-Honoré</b>", "distance": { "text": "0.4 km", "value": 417 }, "location": { "lat": 48.8610324, "lng": 2.3450374 } }, { "duration": { "text": "1 min", "value": 34 }, "instruction": "Turn <b>left</b> onto <b>Rue du Pont Neuf</b>", "distance": { "text": "32 m", "value": 32 }, "location": { "lat": 48.8610324, "lng": 2.3450374 } }, { "duration": { "text": "1 min", "value": 28 }, "instruction": "Continue onto <b>Pl. Maurice Quentin</b>", "distance": { "text": "36 m", "value": 36 }, "location": { "lat": 48.8614061, "lng": 2.345086 } }, { "duration": { "text": "2 mins", "value": 140 }, "instruction": "Turn <b>right</b> onto <b>Rue Berger</b>", "distance": { "text": "0.2 km", "value": 186 }, "location": { "lat": 48.86156750000001, "lng": 2.3453646 } }, { "duration": { "text": "1 min", "value": 37 }, "instruction": "Turn <b>left</b> onto <b>Rue Pierre Lescot</b><div style=\"font-size:0.9em\">Destination will be on the left</div>", "distance": { "text": "53 m", "value": 53 }, "location": { "lat": 48.8610148, "lng": 2.3477693 } }, { "duration": { "text": "1 min", "value": 41 }, "instruction": "Head <b>north</b> on <b>Rue d'Odessa</b> toward <b>Rue du Départ</b>", "distance": { "text": "62 m", "value": 62 }, "location": { "lat": 48.84271709999999, "lng": 2.3245058 } }, { "duration": { "text": "1 min", "value": 67 }, "instruction": "Continue onto <b>Rue du Départ</b>", "distance": { "text": "63 m", "value": 63 }, "location": { "lat": 48.8431079, "lng": 2.3243924 } }, { "duration": { "text": "1 min", "value": 39 }, "instruction": "Continue onto <b>Pl. du 18 Juin 1940</b>", "distance": { "text": "44 m", "value": 44 }, "location": { "lat": 48.8438416, "lng": 2.3244332 } }, { "duration": { "text": "6 mins", "value": 341 }, "instruction": "<b>Pl. du 18 Juin 1940</b> turns slightly <b>right</b> and becomes <b>Rue de Rennes</b>", "distance": { "text": "0.5 km", "value": 492 }, "location": { "lat": 48.844196, "lng": 2.3243114 } }, { "duration": { "text": "5 mins", "value": 285 }, "instruction": "Slight <b>left</b> onto <b>Bd Raspail</b>", "distance": { "text": "0.4 km", "value": 389 }, "location": { "lat": 48.8476983, "lng": 2.3277073 } }, { "duration": { "text": "1 min", "value": 11 }, "instruction": "Turn <b>left</b> onto <b>Rue de Sèvres</b>", "distance": { "text": "15 m", "value": 15 }, "location": { "lat": 48.8512282, "lng": 2.3267548 } }, { "duration": { "text": "1 min", "value": 21 }, "instruction": "Cross the road", "distance": { "text": "15 m", "value": 15 }, "location": { "lat": 48.8511849, "lng": 2.3266704 } }, { "duration": { "text": "7 mins", "value": 396 }, "instruction": "Turn <b>left</b> onto <b>Pl. le Corbusier</b>/<wbr/><b>Bd Raspail</b><div style=\"font-size:0.9em\">Continue to follow Bd Raspail</div>", "distance": { "text": "0.5 km", "value": 519 }, "location": { "lat": 48.85142889999999, "lng": 2.3266852 } }, { "duration": { "text": "1 min", "value": 33 }, "instruction": "Slight <b>left</b> to stay on <b>Bd Raspail</b>", "distance": { "text": "46 m", "value": 46 }, "location": { "lat": 48.8559649, "lng": 2.3255138 } }, { "duration": { "text": "5 mins", "value": 270 }, "instruction": "Slight <b>left</b> onto <b>Bd Saint-Germain</b>", "distance": { "text": "0.4 km", "value": 362 }, "location": { "lat": 48.8563382, "lng": 2.3253426 } }, { "duration": { "text": "3 mins", "value": 208 }, "instruction": "Turn <b>right</b> onto <b>Rue de Solferino</b>", "distance": { "text": "0.3 km", "value": 258 }, "location": { "lat": 48.859023, "lng": 2.322509 } }, { "duration": { "text": "1 min", "value": 3 }, "instruction": "Turn <b>left</b> onto <b>Quai Anatole France</b>", "distance": { "text": "4 m", "value": 4 }, "location": { "lat": 48.8611179, "lng": 2.3240788 } }, { "duration": { "text": "2 mins", "value": 131 }, "instruction": "Turn <b>right</b> onto <b>Léopold Sedar Senghor</b><div style=\"font-size:0.9em\">Take the stairs</div>", "distance": { "text": "0.2 km", "value": 161 }, "location": { "lat": 48.8611356, "lng": 2.3239571 } }, { "duration": { "text": "1 min", "value": 7 }, "instruction": "Turn <b>left</b> toward <b>Terr. du Bord de l'Eau</b>", "distance": { "text": "10 m", "value": 10 }, "location": { "lat": 48.8624041, "lng": 2.3251411 } }, { "duration": { "text": "1 min", "value": 24 }, "instruction": "Turn <b>right</b> at <b>Quai Aimé Cesaire</b>/<wbr/><b>Quai des Tuileries</b>", "distance": { "text": "30 m", "value": 30 }, "location": { "lat": 48.8623637, "lng": 2.3252278 } }, { "duration": { "text": "1 min", "value": 6 }, "instruction": "Turn <b>right</b> onto <b>Terr. du Bord de l'Eau</b>", "distance": { "text": "9 m", "value": 9 }, "location": { "lat": 48.8627311, "lng": 2.3252496 } }, { "duration": { "text": "5 mins", "value": 277 }, "instruction": "Turn <b>left</b> onto <b>All. de Castiglione</b><div style=\"font-size:0.9em\">Take the stairs</div>", "distance": { "text": "0.3 km", "value": 349 }, "location": { "lat": 48.8626958, "lng": 2.3253584 } }, { "duration": { "text": "2 mins", "value": 107 }, "instruction": "Head <b>northeast</b> on <b>Rue de Castiglione</b> toward <b>Rue du Mont Thabor</b>", "distance": { "text": "0.1 km", "value": 148 }, "location": { "lat": 48.86556969999999, "lng": 2.327343 } }, { "duration": { "text": "3 mins", "value": 191 }, "instruction": "Continue onto <b>Pl. Vendôme</b>", "distance": { "text": "0.2 km", "value": 235 }, "location": { "lat": 48.8667041, "lng": 2.3285306 } }, { "duration": { "text": "1 min", "value": 40 }, "instruction": "Continue onto <b>Rue de la Paix</b>", "distance": { "text": "41 m", "value": 41 }, "location": { "lat": 48.8684234, "lng": 2.3302379 } }, { "duration": { "text": "1 min", "value": 29 }, "instruction": "Head <b>southwest</b> on <b>Rue de la Paix</b> toward <b>Rue Danielle Casanova</b>", "distance": { "text": "41 m", "value": 41 }, "location": { "lat": 48.8686905, "lng": 2.3305026 } }, { "duration": { "text": "3 mins", "value": 199 }, "instruction": "Turn <b>left</b> onto <b>Rue Danielle Casanova</b>", "distance": { "text": "0.3 km", "value": 256 }, "location": { "lat": 48.8684484, "lng": 2.3302964 } }, { "duration": { "text": "7 mins", "value": 399 }, "instruction": "Turn <b>right</b> onto <b>Av. de l'Opéra</b>", "distance": { "text": "0.5 km", "value": 509 }, "location": { "lat": 48.8676117, "lng": 2.3334384 } }, { "duration": { "text": "1 min", "value": 48 }, "instruction": "Continue onto <b>Rue de Rohan</b>", "distance": { "text": "52 m", "value": 52 }, "location": { "lat": 48.8630962, "lng": 2.3353672 } }, { "duration": { "text": "1 min", "value": 79 }, "instruction": "Turn <b>left</b> onto <b>Rue de Rivoli</b>", "distance": { "text": "0.1 km", "value": 106 }, "location": { "lat": 48.8627773, "lng": 2.3354454 } }, { "duration": { "text": "2 mins", "value": 131 }, "instruction": "Turn <b>right</b> onto <b>Pass. de Richelieu</b>", "distance": { "text": "0.2 km", "value": 168 }, "location": { "lat": 48.86236780000001, "lng": 2.3366417 } }, { "duration": { "text": "1 min", "value": 16 }, "instruction": "Turn <b>right</b><div style=\"font-size:0.9em\">Destination will be on the right</div>", "distance": { "text": "23 m", "value": 23 }, "location": { "lat": 48.8609032, "lng": 2.3363513 } }, { "duration": { "text": "1 min", "value": 0 }, "instruction": "Head", "distance": { "text": "1 m", "value": 0 }, "location": { "lat": 48.8608146, "lng": 2.3360691 } }],
          POIInfo: [{ "name": "Auditorium du Louvre", "geolocalisation": { "lat": 48.8608146, "lng": 2.3360691 }, "description": ""},
                    { "name": "Forum des images", "geolocalisation": { "lat": 48.8615056, "lng": 2.3478222999999616 }, "description": "Installé au cœur du Forum des Halles, le Forum des images est créé en 1988 dans le but de constituer la mémoire audiovisuelle de Paris. Riche de plusieurs milliers d’heures d’images, il archive le patrimoine audiovisuel dans toute sa diversité : fictions, documentaires, publicités, animation, courts et longs métrages, séries télévisées ou encore films amateurs… L'institution organise également des événements, des rencontres, des festivals ou encore des débats thématiques."},
                    { "name": "Timhotel Odessa Montparnasse", "geolocalisation": { "lat": 48.8427079, "lng": 2.3244333000000097 }, "description": "Timhotel Odessa Montparnasse"},
                    { "name": "Jovoy Paris", "geolocalisation": { "lat": 48.865514, "lng": 2.327490600000033 }, "description": "Jovoy Paris"},
                    { "name": "Park Hyatt Paris-Vendôme", "geolocalisation": { "lat": 48.8686535, "lng": 2.330588900000066 }, "description": "Park Hyatt Paris-Vendôme"}]
        },
      ],
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
    itineraryDropdownStatus() {
      if (this.itineraryDropdown) {
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
    },
    goBackToItineraryDropdown() {
      this.displayItineraryInformation = false;
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
        /*this.$refs.myMapRef.$mapPromise.then((map) => {
          const centerControlDiv = document.createElement('div');
          this.addCenterControl(centerControlDiv, map);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push( // eslint-disable-line no-undef
            centerControlDiv
          );
        });*/
      });
    },
  },
}
</script>

<style scoped>
@import "@/components/Style/Main.scss";

.boxPosition {
  position: absolute;
  z-index: 1;
  top: 11vh;
  left: 2vw;
}

.widgetPanel {
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  max-width: 40vw;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  max-height: 8em;
  width: 20vw;
  transform: translate(-2px, -2vh);
}
.dropdownArrowPosition {
  margin: auto;
  margin-right: 10px;
}

.dropdownTextPosition {
  margin: auto;
  margin-left: 10px;
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
  font-size: calc(12px + 0.4vw);
  width: 20vw;
  height: 6vh;
  min-width: 300px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}
</style>
