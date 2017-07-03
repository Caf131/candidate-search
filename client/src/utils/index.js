import get from 'lodash/get';

export function capitalizeFirst (word) {
  const end = word.slice(1, word.length);
  const firstLetter = word.charAt(0).toUpperCase();
  console.log('word => ', `${firstLetter}${end}`);
  return `${firstLetter}${end}`;
}

function getLocationFromLinkedIn(profile) {
  const { profile: { location: { name }} } = profile.social.linkedIn;
  return name;
}

export function getLocationFromProfile(profile) {
  // check location
  const isCityObject = profile.location.city !== null && typeof profile.location.city === 'object';
  const hasAllCityInfo = isCityObject && typeof profile.location.city.city === 'string'
    && typeof profile.location.city.state === 'string';
  const hasCityInCityObject = typeof profile.location.city.city === 'string';
  const hasStateInCityObject = typeof profile.location.city.state === 'string';
  const shouldGetLocationFromCityObject = isCityObject && hasAllCityInfo;

  const hasTopLevelCity = typeof profile.location.city === 'string';
  const hasTopLevelState = typeof profile.location.state === 'string';

  // check social
  const hasSocial = profile.social !== null;
  const hasLinkedIn = hasSocial && get(profile, 'profile.social.linkedIn', false);

  let city = '-';
  let state = '-';
  let formattedLocation = null;

  if(shouldGetLocationFromCityObject) {
    const { city, state } = profile.location.city;
    formattedLocation = `${capitalizeFirst(city)}, ${state.toUpperCase()}`;
  }

  if (hasTopLevelCity) {
    city = profile.location.city;
  }

  if (hasTopLevelState) {
    state = profile.location.state;
    // return getLocationFromLinkedIn(profile);
  }

  if (hasCityInCityObject){
    city = profile.location.city.city;
  }

  if (hasStateInCityObject) {
    state = profile.location.city.state;
  }

  if (hasLinkedIn) {
    formattedLocation = getLocationFromLinkedIn(profile);
  }

  if(formattedLocation) {
    return formattedLocation;
  } else {
    formattedLocation = `${city.toUpperCase()}, ${state.toUpperCase()}`;
  }

  return formattedLocation;
}

export function getImageUrl(profile) {
  const hasSocial = profile.social;

  const imageUrl = hasSocial ? profile.social.facebook ?
  profile.social.facebook.profile.picture.data.url : profile.social.linkedin ?
  profile.social.linkedin.profile.pictureUrl : "" : "";

  return imageUrl;
}
