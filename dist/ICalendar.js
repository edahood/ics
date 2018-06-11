'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _format = require('./pipeline/format');

var _ICalendarEvent = require('./ICalendarEvent');

var _ICalendarEvent2 = _interopRequireDefault(_ICalendarEvent);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ICalendar = function () {
    function ICalendar() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            productId = _ref.productId,
            _ref$events = _ref.events,
            events = _ref$events === undefined ? [] : _ref$events;

        _classCallCheck(this, ICalendar);

        this.productId = productId;
        this.events = [];
        this.addEvents(events);
    }

    _createClass(ICalendar, [{
        key: 'addEvents',
        value: function addEvents() {
            var _this = this;

            var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            _lodash2.default.each(events, function (e) {
                _this.addEvent(e, false);
            });
            this.events = this.sortedEvents();
            return this;
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var sortEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var e = new _ICalendarEvent2.default(attributes);
            this.events.push(e);
            if (sortEvents) {
                this.events = this.sortedEvents();
            }
            return this;
        }
    }, {
        key: 'toIcs',
        value: function toIcs() {
            var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var ok = true;
            if (validate) {
                ok = this.validate();
            }
            if (!ok) {
                throw new Error('Invalid calendar ');
            }
            var fmat = this.formatCalendar();
            var output = fmat.prefix + this.formatEvents() + fmat.postfix;
            return output;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.toIcs();
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _this2 = this;

            var ok = true;
            _lodash2.default.each(this.events, function (item, idx) {
                if (!item.validate()) {
                    if (!Array.isArray(_this2.error)) {
                        _this2.error = [];
                    }
                    _this2.error[idx] = item.error;
                    ok = false;
                }
            });

            return ok;
        }
    }, {
        key: 'sortedEvents',
        value: function sortedEvents() {
            return _lodash2.default.sortBy(this.events, function (item) {
                return item.getStartTime();
            });
        }
    }, {
        key: 'formatCalendar',
        value: function formatCalendar() {
            var icsFormat = '';
            icsFormat += 'BEGIN:VCALENDAR\r\n';
            icsFormat += 'VERSION:2.0\r\n';
            icsFormat += 'CALSCALE:GREGORIAN\r\n';
            icsFormat += (0, _utils.foldLine)('PRODID:' + this.productId) + '\r\n';
            icsFormat += 'METHOD:PUBLISH\r\n';
            icsFormat += 'X-PUBLISHED-TTL:PT1H\r\n';

            var postFix = 'END:VCALENDAR\r\n';

            return { prefix: icsFormat, postfix: postFix };
        }
    }, {
        key: 'formatEvents',
        value: function formatEvents() {
            var results = [];
            results = this.events.map(function (item) {
                return item.format();
            });
            return results.join("");
        }
    }]);

    return ICalendar;
}();

exports.default = ICalendar;