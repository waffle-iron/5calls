const townHall = require('./townHall.js');
const chai = require('chai');
const expect = chai.expect;
const localEvents = [{
        City:"Bridgewater",
        Date:"Tue, Apr 4, 2017",
        District:"VA-06",
        Location:"Municipal Building",
        Member:"Bob Goodlatte",
        Notes:"<p>Notes",
        Party:"Republican",
        State:"Virginia",
        StateAb:"VA",
        Time:"11:30 AM",
        Zip:"22812",
        address:"201 Green St, Bridgewater, VA 22812",
        dateObj:1491319800000,
        dateString:"Tue Apr 04 2017",
        dateValid:true,
        eventId:"100092",
        lat:38.385476,
        lng:-78.97470059999999,
        meetingType:"Office Hours",
        streetAddress:"201 Green St.",
        timeStart24:"11:30:00",
        timeZone:"EDT",
        yearMonthDay:"2017-04-04"
      },
      {
        City:"Amherst",
        Date:"Tue, Apr 4, 2017",
        District:"VA-06",
        Location:"Amherst Co. Administration Building, Board of Supervisor's Room",
        Member:"Bob Goodlatte",
        Notes:"Notes",
        Party:"Republican",
        State:"Virginia",
        StateAb:"VA",
        Time:"9:00 AM",
        Zip:"24521",
        address:"153 Washington St, Amherst, VA 24521",
        dateObj:1491310800000,
        dateString:"Tue Apr 04 2017",
        dateValid:true,
        eventId:"100093",
        eventName:"",
        lastUpdated:1489792080000,
        lastUpdatedHuman:"2017-03-17T23:08:00.000Z",
        lat:37.581837,
        lng:-79.0491892,
        meetingType:"Office Hours",
        streetAddress:"153 Washington St.",
        timeZone:"EDT",
        yearMonthDay:"2017-04-04"
      }];
describe('townHall component', () => {
  describe('eventList include', () => {
    it('should display a list of events when found', () => {
      let state = {localEvents: localEvents};
      let result = townHall(state);
      let ul = result.querySelector('.town-hall ul');
      expect(ul).to.be.defined;
    })
    it('should display nothing when no events are found', () => {
      let state = {localEvents: []}
      let result = townHall(state);
      let ul = result.querySelector('.town-hall ul');
      expect(ul).to.not.be.defined;
    })
  })
})