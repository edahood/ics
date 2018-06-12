import {
    setAlarm,
    setContact,
    setOrganizer,
    setDate,
    setDescription,
    setSummary,
    setGeolocation,
    formatDuration,
    foldLine,
    formatText,
    setCategories
} from '../utils'
import {RRule} from 'rrule';

const formatSingleEvent = function(attributes = {} ) {
  let icsFormat = '';
    const {
        title,
        uid,
        timestamp,
        start,
        startType,
        duration,
        end,
        description,
        url,
        geo,
        location,
        status,
        categories,
        organizer,
        attendees,
        alarms,
        rrule,
        htmlDescription,
        relatedTo
    } = attributes
    let RuleString;
    if (rrule){
        let r;
        if (!(rrule instanceof RRule)) {
            r = new RRule(rrule);
        }
        else {
            r = rrule;
        }
        RuleString = r.toString();
    }
    icsFormat += 'BEGIN:VEVENT\r\n'
    icsFormat += `UID:${uid}\r\n`
    icsFormat +=  foldLine(`SUMMARY:${title ? setSummary(title) : title}`) + '\r\n'
    icsFormat += `DTSTAMP:${timestamp}\r\n`
    icsFormat += `DTSTART:${setDate(start, startType)}\r\n`
    icsFormat += end ? `DTEND:${setDate(end, startType)}\r\n` : ''
    icsFormat += description ? (foldLine(`DESCRIPTION:${setDescription(description)}`) + '\r\n') : '';
    icsFormat += RuleString ? `RRULE:${RuleString}\r\n` : '';
    icsFormat += url ? (foldLine(`URL:${url}`) + '\r\n') : ''
    icsFormat += geo ? (foldLine(`GEO:${setGeolocation(geo)}`) + '\r\n') : ''
    icsFormat += location ? (foldLine(`LOCATION:${formatText(location)}`) + '\r\n') : ''
    icsFormat += status ? (foldLine(`STATUS:${status}`) + '\r\n') : ''
    icsFormat += categories ? (foldLine(`CATEGORIES:${categories}`) + '\r\n') : ''
    icsFormat += organizer ? (foldLine(`ORGANIZER;${setOrganizer(organizer)}`) + '\r\n') : '';
    icsFormat += htmlDescription ? (foldLine(`X-ALT-DESC;FMTTYPE=text/html:${htmlDescription}`) + '\r\n') : '';
    if (attendees) {
        attendees.map(function (attendee) {
            icsFormat += foldLine(`ATTENDEE;${setContact(attendee)}`) + '\r\n'
        })
    }
    if (alarms) {
        alarms.map(function (alarm) {
            icsFormat += setAlarm(alarm)
        })
    }
    if (relatedTo) {
        relatedTo.map((related) => {
            icsFormat += foldLine(`RELATED-TO;RELTYPE=${related.relType || 'PARENT'}:${related.uid}`) + '\r\n';
        })
    }
    icsFormat += duration ? `DURATION:${formatDuration(duration)}\r\n` : ''
    icsFormat += `END:VEVENT\r\n`;
    return icsFormat;
}
const formatCalendar = function({productId, events: []}) {
    let formattedEvents = events.map(formatSingleEvent);
    let icsFormat = ''
    icsFormat += 'BEGIN:VCALENDAR\r\n'
    icsFormat += 'VERSION:2.0\r\n'
    icsFormat += 'CALSCALE:GREGORIAN\r\n'
    icsFormat += foldLine(`PRODID:${productId}`) + '\r\n'
    icsFormat += `METHOD:PUBLISH\r\n`
    icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`

    icsFormat += formattedEvents.join("");

    icsFormat += `END:VCALENDAR\r\n`

    return icsFormat;
};


export default function formatEvent (attributes = {}) {
  const {
    title,
    productId,
    uid,
    timestamp,
    start,
    startType,
    duration,
    end,
    description,
    url,
    geo,
    location,
    status,
    categories,
    organizer,
    attendees,
    alarms,
    rrule,
      relatedTo,
      htmlDescription
  } = attributes
    let RuleString;
    if (rrule){
      let r;
      if (!(rrule instanceof RRule)) {
         r = new RRule(rrule);
      }
      else {
        r = rrule;
      }
      RuleString = r.toString();
    }
    let icsFormat = ''
    icsFormat += 'BEGIN:VCALENDAR\r\n'
    icsFormat += 'VERSION:2.0\r\n'
    icsFormat += 'CALSCALE:GREGORIAN\r\n'
    icsFormat += foldLine(`PRODID:${productId}`) + '\r\n'
    icsFormat += `METHOD:PUBLISH\r\n`
    icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`
    icsFormat += formatSingleEvent(attributes);

    icsFormat += `END:VCALENDAR\r\n`

    return icsFormat
}
export {
    formatCalendar,
    formatSingleEvent
}