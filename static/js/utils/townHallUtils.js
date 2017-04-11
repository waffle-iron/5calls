let stateAbbrs = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming",
}
let calculateDistance = (lat1, lon1, lat2, lon2) => {
  let radlat1 = Math.PI * lat1/180
  let radlat2 = Math.PI * lat2/180
  let theta = lon1-lon2
  let radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  return dist
};
// calculate the distance between two lat/long points
module.exports = {
  calculateDistance: calculateDistance,
  parseCivicData: (divisions) => {
    let ret = {
        'congressional_district': false,
        'country': false,
        'state': false,
        'stateAbbr': false,
    };
    
    for(let i in divisions){
      let parts = divisions[i].split('/');
      if (parts.length > 0){
        let key = parts[parts.length - 1].split(':')[0];
        let val = parts[parts.length - 1].split(':')[1];
        switch (key){
          case 'cd':
            ret.congressional_district = parts[parts.length - 2].split(':')[1].toUpperCase() + "-00".substring(0, 3 - val.length) + val;
            break;
          case 'country':
            ret.country = val.toUpperCase();
            break;
          case 'state':
            ret.stateAbbr = val.toUpperCase();
            ret.state = stateAbbrs[val.toUpperCase()];
            break;
        }
      }
    }
    return ret;
  },
  stateAbbrs: stateAbbrs,
  mapDistance: (lat, lng) => {
    return (e) => {
      e.distance = calculateDistance(lat, lng, parseFloat(e.lat), parseFloat(e.lng));
      return e;
    };
  },
  filterEvents: (state, maxTownHallDistance) => {
    return (e) => {
      return e.dateObj > (new Date()).getTime() // The event is in the future
            && ((!!state.divisions.congressional_district 
                && state.divisions.congressional_district == e.District) // The event is for the user's District
              || (!!state.divisions.state 
                && state.divisions.state == e.State 
                && e.District == "Senate" 
                && e.distance < maxTownHallDistance)) // The event is for a Senator in the user's state, less than maxTownHallDistance away
    };
  },
  sortEvents: () => {
    return (a, b) => {
      return a.distance < b.distance ? 1 : -1;
    };
  }
} 