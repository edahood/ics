'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pipeline = require('./pipeline');

var _format = require('./pipeline/format');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _rrule = require('rrule');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ICalendarEvent = function () {
    function ICalendarEvent() {
        var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ICalendarEvent);

        this._data = {};
        this.setAttributes(attributes);
    }

    _createClass(ICalendarEvent, [{
        key: 'setAttributes',
        value: function setAttributes() {
            var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var data = Object.assign({}, { uid: (0, _v2.default)() }, _lodash2.default.omit(attributes, ['productId']));
            this._data = (0, _pipeline.buildEvent)(data);
            this.validate();
            return this;
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _validateEvent = (0, _pipeline.validateEvent)(this._data),
                error = _validateEvent.error,
                value = _validateEvent.value;

            if (error) {
                this.error = error;
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return this.validate();
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            return this._data;
        }
    }, {
        key: 'format',
        value: function format() {
            return (0, _format.formatSingleEvent)(this.toJSON());
        }
    }, {
        key: 'getStartTime',
        value: function getStartTime() {
            var dt = (0, _moment2.default)(this._data.start).toDate();
            return dt.getTime();
        }
    }]);

    return ICalendarEvent;
}();

exports.default = ICalendarEvent;