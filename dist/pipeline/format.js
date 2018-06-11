'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatSingleEvent = exports.formatCalendar = undefined;
exports.default = formatEvent;

var _utils = require('../utils');

var _rrule = require('rrule');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var formatSingleEvent = function formatSingleEvent() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var icsFormat = '';
    var title = attributes.title,
        uid = attributes.uid,
        timestamp = attributes.timestamp,
        start = attributes.start,
        startType = attributes.startType,
        duration = attributes.duration,
        end = attributes.end,
        description = attributes.description,
        url = attributes.url,
        geo = attributes.geo,
        location = attributes.location,
        status = attributes.status,
        categories = attributes.categories,
        organizer = attributes.organizer,
        attendees = attributes.attendees,
        alarms = attributes.alarms,
        rrule = attributes.rrule,
        htmlDescription = attributes.htmlDescription;

    var RuleString = void 0;
    if (rrule) {
        var r = void 0;
        if (!(rrule instanceof _rrule.RRule)) {
            r = new _rrule.RRule(rrule);
        } else {
            r = rrule;
        }
        RuleString = r.toString();
    }
    icsFormat += 'BEGIN:VEVENT\r\n';
    icsFormat += 'UID:' + uid + '\r\n';
    icsFormat += (0, _utils.foldLine)('SUMMARY:' + (title ? (0, _utils.setSummary)(title) : title)) + '\r\n';
    icsFormat += 'DTSTAMP:' + timestamp + '\r\n';
    icsFormat += 'DTSTART:' + (0, _utils.setDate)(start, startType) + '\r\n';
    icsFormat += end ? 'DTEND:' + (0, _utils.setDate)(end, startType) + '\r\n' : '';
    icsFormat += description ? (0, _utils.foldLine)('DESCRIPTION:' + (0, _utils.setDescription)(description)) + '\r\n' : '';
    icsFormat += RuleString ? 'RRULE:' + RuleString + '\r\n' : '';
    icsFormat += url ? (0, _utils.foldLine)('URL:' + url) + '\r\n' : '';
    icsFormat += geo ? (0, _utils.foldLine)('GEO:' + (0, _utils.setGeolocation)(geo)) + '\r\n' : '';
    icsFormat += location ? (0, _utils.foldLine)('LOCATION:' + (0, _utils.formatText)(location)) + '\r\n' : '';
    icsFormat += status ? (0, _utils.foldLine)('STATUS:' + status) + '\r\n' : '';
    icsFormat += categories ? (0, _utils.foldLine)('CATEGORIES:' + categories) + '\r\n' : '';
    icsFormat += organizer ? (0, _utils.foldLine)('ORGANIZER;' + (0, _utils.setOrganizer)(organizer)) + '\r\n' : '';
    icsFormat += htmlDescription ? (0, _utils.foldLine)('X-ALT-DESC;FMTTYPE=text/html:' + htmlDescription) + '\r\n' : '';
    if (attendees) {
        attendees.map(function (attendee) {
            icsFormat += (0, _utils.foldLine)('ATTENDEE;' + (0, _utils.setContact)(attendee)) + '\r\n';
        });
    }
    if (alarms) {
        alarms.map(function (alarm) {
            icsFormat += (0, _utils.setAlarm)(alarm);
        });
    }
    icsFormat += duration ? 'DURATION:' + (0, _utils.formatDuration)(duration) + '\r\n' : '';
    icsFormat += 'END:VEVENT\r\n';
    return icsFormat;
};
var formatCalendar = function formatCalendar(_ref) {
    var productId = _ref.productId,
        _ref$events = _toArray(_ref.events);

    var formattedEvents = events.map(formatSingleEvent);
    var icsFormat = '';
    icsFormat += 'BEGIN:VCALENDAR\r\n';
    icsFormat += 'VERSION:2.0\r\n';
    icsFormat += 'CALSCALE:GREGORIAN\r\n';
    icsFormat += (0, _utils.foldLine)('PRODID:' + productId) + '\r\n';
    icsFormat += 'METHOD:PUBLISH\r\n';
    icsFormat += 'X-PUBLISHED-TTL:PT1H\r\n';

    icsFormat += formattedEvents.join("");

    icsFormat += 'END:VCALENDAR\r\n';

    return icsFormat;
};

function formatEvent() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var title = attributes.title,
        productId = attributes.productId,
        uid = attributes.uid,
        timestamp = attributes.timestamp,
        start = attributes.start,
        startType = attributes.startType,
        duration = attributes.duration,
        end = attributes.end,
        description = attributes.description,
        url = attributes.url,
        geo = attributes.geo,
        location = attributes.location,
        status = attributes.status,
        categories = attributes.categories,
        organizer = attributes.organizer,
        attendees = attributes.attendees,
        alarms = attributes.alarms,
        rrule = attributes.rrule,
        htmlDescription = attributes.htmlDescription;

    var RuleString = void 0;
    if (rrule) {
        var r = void 0;
        if (!(rrule instanceof _rrule.RRule)) {
            r = new _rrule.RRule(rrule);
        } else {
            r = rrule;
        }
        RuleString = r.toString();
    }
    var icsFormat = '';
    icsFormat += 'BEGIN:VCALENDAR\r\n';
    icsFormat += 'VERSION:2.0\r\n';
    icsFormat += 'CALSCALE:GREGORIAN\r\n';
    icsFormat += (0, _utils.foldLine)('PRODID:' + productId) + '\r\n';
    icsFormat += 'METHOD:PUBLISH\r\n';
    icsFormat += 'X-PUBLISHED-TTL:PT1H\r\n';
    icsFormat += formatSingleEvent(attributes);

    icsFormat += 'END:VCALENDAR\r\n';

    return icsFormat;
}
exports.formatCalendar = formatCalendar;
exports.formatSingleEvent = formatSingleEvent;