
import uuid from 'uuid/v4';
import _ from 'lodash';
import {buildEvent, validateEvent} from './pipeline';
import {formatSingleEvent} from './pipeline/format';
import moment from 'moment';
import {RRule} from 'rrule';
class ICalendarEvent {
    constructor(attributes={}){
      this._data = {};
      this.setAttributes(attributes);
    }
    setAttributes(attributes={}) {
        let data = Object.assign({}, {uid: uuid()}, _.omit(attributes,['productId']));
        this._data = buildEvent(data);
        this.validate();
        return this;
    }
    validate(){
        const { error, value } = validateEvent(this._data);
        if (error){
            this.error = error;
            return false;
        }
        else {
            return true;
        }
    }
    isValid(){
        return this.validate();
    }
    toJSON(){
        return this._data;
    }
    format() {
        return formatSingleEvent(this.toJSON());
    }
    getStartTime(){
        let dt = moment(this._data.start).toDate();
        return dt.getTime();
    }
}


export default ICalendarEvent;