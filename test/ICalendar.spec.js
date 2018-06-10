import { expect } from 'chai'
import ICalendar from '../src/ICalendar'

const invalidAttributes = { start: [] }
const validAttributes = { start: [2000, 10, 5, 5, 0], duration: { hours: 1 }, title: 'foo', 'description': 'blah' }
const validAttributesWithRule = { rrule: {freq: 1, count: 10, interval: 2}, start: [2000, 10, 5, 5, 0], duration: { hours: 1 }, title: 'foo', 'description': 'blah' }
const validAttributes2 = { start: [2001, 10, 5, 5, 0], duration: { hours: 1 } }

describe('ICalendar', () => {
  describe('create', () => {
    it('returns a calendar', () => {
      const cal = new ICalendar({productId: 'gubar', events: [validAttributesWithRule]});

      expect(cal.error).not.to.exist;
        expect(cal.events.length).to.equal(1);
        const ical = cal.toIcs();
        expect(ical).to.be.a('string');
        expect(ical).to.contain('PRODID:gubar');
        expect(ical).to.contain('UID:');

    })

  })
})