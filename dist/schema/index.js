'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateEvent;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateTimeSchema = _joi2.default.array().min(3).max(7).ordered(_joi2.default.number().integer(), _joi2.default.number().integer().min(1).max(12), _joi2.default.number().integer().min(1).max(31), _joi2.default.number().integer().min(0).max(23), _joi2.default.number().integer().min(0).max(60), _joi2.default.number().integer().min(0).max(60));

var durationSchema = _joi2.default.object().keys({
  before: _joi2.default.boolean(), //option to set before alaram
  weeks: _joi2.default.number(),
  days: _joi2.default.number(),
  hours: _joi2.default.number(),
  minutes: _joi2.default.number(),
  seconds: _joi2.default.number()
});

var contactSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  email: _joi2.default.string().email(),
  rsvp: _joi2.default.boolean()
});

var organizerSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  email: _joi2.default.string().email()
});

var alarmSchema = _joi2.default.object().keys({
  action: _joi2.default.string().regex(/audio|display|email/).required(),
  trigger: _joi2.default.any().required(),
  description: _joi2.default.string(),
  duration: durationSchema,
  repeat: _joi2.default.number(),
  attach: _joi2.default.string(),
  attachType: _joi2.default.string(),
  summary: _joi2.default.string(),
  attendee: contactSchema,
  'x-prop': _joi2.default.any(),
  'iana-prop': _joi2.default.any()
});
var ruleSchema = _joi2.default.object().keys({
  freq: _joi2.default.number(),
  dtstart: dateTimeSchema,
  interval: _joi2.default.number(),
  wkst: _joi2.default.number().min(0).max(6),
  count: _joi2.default.number().min(0),
  until: dateTimeSchema,
  bysetpos: _joi2.default.number(),
  bymonth: _joi2.default.number(),
  bymonthday: _joi2.default.number(),
  byyearday: _joi2.default.number(),
  byweekno: _joi2.default.number(),
  byweekday: _joi2.default.number(),
  byhour: _joi2.default.number(),
  byminute: _joi2.default.number(),
  bysecond: _joi2.default.number()
});
var schema = _joi2.default.object().keys({
  timestamp: _joi2.default.any(),
  title: _joi2.default.string(),
  productId: _joi2.default.string(),
  uid: _joi2.default.string().required(),
  start: dateTimeSchema.required(),
  duration: durationSchema,
  startType: _joi2.default.string(),
  end: dateTimeSchema,
  description: _joi2.default.string(),
  url: _joi2.default.string().uri(),
  geo: _joi2.default.object().keys({ lat: _joi2.default.number(), lon: _joi2.default.number() }),
  location: _joi2.default.string(),
  status: _joi2.default.string().regex(/TENTATIVE|CANCELLED|CONFIRMED/),
  categories: _joi2.default.array().items(_joi2.default.string()),
  rrule: ruleSchema,
  organizer: organizerSchema,
  attendees: _joi2.default.array().items(contactSchema),
  alarms: _joi2.default.array().items(alarmSchema)
}).xor('end', 'duration');

function validateEvent(candidate) {
  var _Joi$validate = _joi2.default.validate(candidate, schema),
      error = _Joi$validate.error,
      value = _Joi$validate.value;

  return { error: error, value: value };
}