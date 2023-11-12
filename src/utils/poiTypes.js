function createIPTObject(key, value) {
  return { key, value };
}

export const IPTTour = {
  CYCLING_TOUR: createIPTObject("POI.interestPointTypeTour.cyclingTour", "CyclingTour"),
  ROAD_TOUR: createIPTObject("POI.interestPointTypeTour.roadTour", "RoadTour"),
  WALKING_TOUR: createIPTObject("POI.interestPointTypeTour.walkingTour", "WalkingTour"),
  TOUR: createIPTObject("POI.interestPointTypeTour.tour", "Tour"),
  TOURIST_TRAIN: createIPTObject("POI.interestPointTypeTour.touristTrain", "TouristTrain"),
};

export const IPTEvent = {
  SHOW_EVENT: createIPTObject("POI.interestPointTypeEvent.showEvent", "ShowEvent"),
  SOCIAL_EVENT: createIPTObject("POI.interestPointTypeEvent.socialEvent", "SocialEvent"),
  SPORTS_EVENT: createIPTObject("POI.interestPointTypeEvent.sportsEvent", "SportsEvent"),
  ENTERTAINMENT_EVENT: createIPTObject("POI.interestPointTypeEvent.entertainmentAndEvent", "EntertainmentAndEvent"),
  EXHIBITION_EVENT: createIPTObject("POI.interestPointTypeEvent.exhibitionEvent", "ExhibitionEvent"),
  CULTURAL_EVENT: createIPTObject("POI.interestPointTypeEvent.culturalEvent", "CulturalEvent"),
};

export const IPTNatural = {
  LANDFORM: createIPTObject("POI.interestPointTypeNatural.landform", "Landform"),
  PARK: createIPTObject("POI.interestPointTypeNatural.park", "Park"),
  PARK_GARDEN: createIPTObject("POI.interestPointTypeNatural.parkAndGarden", "ParkAndGarden"),
  RIVER: createIPTObject("POI.interestPointTypeNatural.river", "River"),
  RIVER_PORT: createIPTObject("POI.interestPointTypeNatural.riverPort", "RiverPort"),
};

export const IPTActivity = {
  BOWLING: createIPTObject("POI.interestPointTypeActivity.bowling", "BowlingAlley"),
  CINEMA: createIPTObject("POI.interestPointTypeActivity.cinema", "Cinema"),
  GAME: createIPTObject("POI.interestPointTypeActivity.game", "Game"),
  MINIGOLF: createIPTObject("POI.interestPointTypeActivity.minigolf", "Minigolf"),
  MOVIE_THEATER: createIPTObject("POI.interestPointTypeActivity.movieTheater", "MovieTheater"),
  THEATER: createIPTObject("POI.interestPointTypeActivity.theater", "Theater"),
  AMUSEMENT_PARK: createIPTObject("POI.interestPointTypeActivity.amusementPark", "AmusementPark"),
  THEME_PARK: createIPTObject("POI.interestPointTypeActivity.themePark", "ThemePark"),
  EXHIBITION: createIPTObject("POI.interestPointTypeActivity.exhibition", "Exhibition"),
  LEISURE_COMPLEX: createIPTObject("POI.interestPointTypeActivity.leisureComplex", "LeisureComplex"),
  MARINE: createIPTObject("POI.interestPointTypeActivity.marine", "Marine"),
};

export const IPTDrinking = {
  BAR_PUB: createIPTObject("POI.interestPointTypeDrinking.barOrPub", "BarOrPub"),
  BISTRO_WINE_BAR: createIPTObject("POI.interestPointTypeDrinking.bistroOrWineBar", "BistroOrWineBar"),
  NIGHT_CLUB: createIPTObject("POI.interestPointTypeDrinking.nightclub", "NightClub"),
  WINERY: createIPTObject("POI.interestPointTypeDrinking.winery", "Winery"),
  TASTING_PROVIDER: createIPTObject("POI.interestPointTypeDrinking.tastingProvider", "TastingProvider"),
};

export const IPTCultural = {
  CASTLE: createIPTObject("POI.interestPointTypeCultural.castle", "Castle"),
  CHURCH: createIPTObject("POI.interestPointTypeCultural.church", "Church"),
  CITY_HERITAGE: createIPTObject("POI.interestPointTypeCultural.cityHeritage", "CityHeritage"),
  MILITARY_CEMETERY: createIPTObject("POI.interestPointTypeCultural.militaryCemetery", "MilitaryCemetery"),
  MUSEUM: createIPTObject("POI.interestPointTypeCultural.museum", "Museum"),
  NATURAL_HERITAGE: createIPTObject("POI.interestPointTypeCultural.naturalHeritage", "NaturalHeritage"),
  RELIGIOUS_SITE: createIPTObject("POI.interestPointTypeCultural.religiousSite", "ReligiousSite"),
  REMEMBRANCE_SITE: createIPTObject("POI.interestPointTypeCultural.remembranceSite", "RemembranceSite"),
  REMARKABLE_BUILDING: createIPTObject("POI.interestPointTypeCultural.remarkableBuilding", "RemarkableBuilding"),
  CULTURAL_SITE: createIPTObject("POI.interestPointTypeCultural.culturalSite", "CulturalSite"),
};

export const IPTEating = {
  FAST_FOOD: createIPTObject("POI.interestPointTypeEating.fastFoodRestaurant", "FastFoodRestaurant"),
  FOOD_ESTABLISHMENT: createIPTObject("POI.interestPointTypeEating.foodEstablishment", "FoodEstablishment"),
  RESTAURANT: createIPTObject("POI.interestPointTypeEating.restaurant", "Restaurant"),
  SELF_CATERING: createIPTObject("POI.interestPointTypeEating.selfCateringAccomodation", "SelfCateringAccommodation"),
  SELF_SERVICE: createIPTObject("POI.interestPointTypeEating.selfServiceCafetaria", "SelfServiceCafeteria"),
  CAFE_COFFE_SHOP: createIPTObject("POI.interestPointTypeEating.cafeOrCoffeeShop", "CafeOrCoffeeShop"),
  CAFE_TEAHOUSE: createIPTObject("POI.interestPointTypeEating.cafeOrTeahouse", "CafeOrTeahouse"),
};

export const IPTTypeGroup = {
  TOUR: createIPTObject("POI.interestPointTypeGroup.tour", "Tour"),
  EVENT: createIPTObject("POI.interestPointTypeGroup.event", "Event"),
  NATURAL: createIPTObject("POI.interestPointTypeGroup.natural", "Natural"),
  ACTIVITY: createIPTObject("POI.interestPointTypeGroup.activity", "Activity"),
  DRINKING: createIPTObject("POI.interestPointTypeGroup.drinking", "Drinking"),
  CULTURAL: createIPTObject("POI.interestPointTypeGroup.cultural", "Cultural"),
  EATING: createIPTObject("POI.interestPointTypeGroup.eating", "Eating"),
};