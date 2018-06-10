import { expect } from 'chai'
import ICalendarEvent from '../src/ICalendarEvent'

const invalidAttributes = { start: [] }
const validAttributes = { start: [2000, 10, 5, 5, 0], duration: { hours: 1 }, title: 'foo', 'description': 'blah' }
const validAttributesWithRule = { rrule: {freq: 1, count: 10, interval: 2}, start: [2000, 10, 5, 5, 0], duration: { hours: 1 }, title: 'foo', 'description': 'blah' }
const validAttributes2 = { start: [2001, 10, 5, 5, 0], duration: { hours: 1 } }

describe('ICalendarEvent', () => {
  describe('create', () => {
    it('returns an error or value', () => {
      const event1 = new ICalendarEvent(validAttributes)
      const event2 = new ICalendarEvent(invalidAttributes)

      expect(event1.error).not.to.exist;
        expect(event1.format()).to.be.a('string')

        expect(event2.error).to.exist
    })
    it('returns an error when passed an empty object', () => {
        const event4 = new ICalendarEvent({})
      expect(event4.error.name).to.equal('ValidationError');

    })

    it('handles rrule properly', () => {
        const event6 = new ICalendarEvent(validAttributesWithRule);
        expect(event6.error).not.to.exist;
        const fmat = event6.format();
        expect(fmat).to.be.a('string')
        expect(fmat).to.contain('RRULE:FREQ=MONTHLY;');

    })
  })
})