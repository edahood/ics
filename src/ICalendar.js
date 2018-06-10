import moment from 'moment';
import _ from 'lodash';
import {formatCalendar, formatSingleEvent} from './pipeline/format';
import ICalendarEvent from './ICalendarEvent';
import {
    foldLine
} from './utils'
class ICalendar {
    constructor({productId, events=[]} = {}){
        this.productId = productId;
        this.events = [];
        this.addEvents(events);
    }
    addEvents(events=[]) {
        _.each(events, (e) => {
            this.addEvent(e, false);
        });
        this.events = this.sortedEvents();
        return this;
    }
    addEvent(attributes={}, sortEvents=true){
        let e = new ICalendarEvent(attributes);
        this.events.push(e);
        if (sortEvents){
            this.events = this.sortedEvents();
        }
        return this;
    }
    toIcs(validate=true){
        let ok = true;
        if (validate){
            ok = this.validate();
        }
        if (!ok){
            throw new Error('Invalid calendar ');
        }
        let fmat = this.formatCalendar();
        let output = fmat.prefix + this.formatEvents() + fmat.postfix;
        return output;
    }
    toString(){
        return this.toIcs();
    }
    validate(){
       let ok = true;
       _.each(this.events, (item, idx) => {
           if (!item.validate()){
               if (!Array.isArray(this.error)){
                   this.error = [];
               }
               this.error[idx] = item.error;
               ok = false;
           }
       })

       return ok;
    }
    sortedEvents(){
       return _.sortBy(this.events, (item) => {
           return item.getStartTime();
        });
    }

    formatCalendar(){
        let icsFormat = ''
        icsFormat += 'BEGIN:VCALENDAR\r\n'
        icsFormat += 'VERSION:2.0\r\n'
        icsFormat += 'CALSCALE:GREGORIAN\r\n'
        icsFormat += foldLine(`PRODID:${this.productId}`) + '\r\n'
        icsFormat += `METHOD:PUBLISH\r\n`
        icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`

        let postFix = `END:VCALENDAR\r\n`

        return {prefix: icsFormat, postfix: postFix};
    }
    formatEvents() {
        let results = [];
        results = this.events.map((item) => {
            return item.format();
        });
        return results.join("");
    }
}

export default ICalendar;