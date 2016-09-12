/**
 * eBus is a JavaScript Event Pub Sub Bus
 * - Entities can attach a listener to an event ( Complete )
 * - Entities can publish events ( Complete )
 * - Entities can listen to events that happened in the past ( Complete )
 * - Entities can add throttling to listeners execution ( Complete )
 * -- Throtlling also throttles in case the events are pushed in a list during add listener
 * -- In such case throttling effect both the events
 * - Supports Grouping of events ( ?? )
 */

import Utils from './libs/utils';
import ListenerClass from './models/listener';
import Logger from './logger';

function executeListenerRoutine(listener, target, payload) {
    listener.execute.apply(listener, [target, payload]);
}

class eBus {
    constructor() {
        this._eventListenerMap = new Map();
        this._eventTriggeredMap = new Map();
    }

    /**
     * Attaches a listener to the eBus
     *
     * @param listenerPayload {object} Payload which will be needed to attach a listener to the eBus
     * listenerPayload : {
     *      name : <string>[Required] Uniquely Identify's a listener, which could be used while removing the listener,
     *      event : <Array>[Required] List of events which needs to be listened to,
     *      routine : <function> [Required] Routine that needs to be executing on event trigger,
     *      context : <object> [Optional] Context which can be passed on to the routine at the time of execution,
     *      options : <object> [Optional]
     * }
     * options : {
     *      once : <boolean> Makes the function to get executed only once on trigger,
     *      rememberPast: <boolean>,
     *      throttle : <timestamp>,
     *      target : <string>
     * }
     *
     * @return [Array] Returns an array of listenerId's
     */
    addListener(listenerPayload) {
        let listenerIdsList = [];
        if (!(listenerPayload instanceof Array)) {
            listenerPayload = [listenerPayload];
        }

        for (let payloadObj of listenerPayload) {
            payloadObj.name = payloadObj.name || Utils.guid();
            let eventList = (payloadObj.event instanceof Array) ? payloadObj.event : [payloadObj.event],
                listenerObj = new ListenerClass(payloadObj.name, payloadObj.routine, payloadObj.context, payloadObj.options),
                isListenToPastEvents = (payloadObj.options && payloadObj.options.rememberPast) || false;

            listenerIdsList.push(payloadObj.name);

            for (let event of eventList) {
                this._eventListenerMap.has(event) ? this._eventListenerMap.get(event).push(listenerObj) : this._eventListenerMap.set(event, [listenerObj]);
                Logger.log(payloadObj.name, 'listener is attached with', event);

                /**
                 * Executing the listener routine in case the listener wants to listen to events that happened in the past
                 */
                if (isListenToPastEvents) {
                    let isEventTriggeredInPast = !!this._eventTriggeredMap.has(event),
                        lastEventPayload = isEventTriggeredInPast ? this._eventTriggeredMap.get(event) : void 0;

                    isEventTriggeredInPast ? executeListenerRoutine(listenerObj, lastEventPayload.target, lastEventPayload.payload) : void 0;
                }
            }
        }
        return listenerIdsList;
    }

    /**
     * Removes a listeners from the eBus
     *
     * @param listenerName {string}[Required] Uuid of the listner attaching context who want's to remove this listener.
     * if listenerName is null|false|undefined, it will remove all the the listeners attached to the passed event
     * @param eventName {string}[Required] Name of the event that need not to be listened any more.
     * @param callbackRoutine {function} [Optional] Callback Routine to be called post removing of event listeners
     */
    removeListener(listenerName, eventName, callbackRoutine) {
        let listenersList = this._eventListenerMap.get(eventName) || [],
            removedListenersList,
            updatedListnersList;

        updatedListnersList = listenersList.filter((listener)=> {
            return listenerName ? listener.listenerUid != listenerName : false;
        });

        this._eventListenerMap.set(eventName, updatedListnersList);

        removedListenersList = listenersList.filter((listener)=> {
            return listenerName ? (listener.listenerUid == listenerName) : true;
        });

        removedListenersList = removedListenersList.map((listener)=> {
            return listener.listenerUid;
        });

        (removedListenersList.length && callbackRoutine) ? callbackRoutine(removedListenersList) : void 0;

        return removedListenersList;
    }

    /**
     * Triggers an event on the eBus making all the sideEffects to be executed for such event
     *
     * @param event {string} [Required] Name of the event that is published
     * @param target {string} [Optional] The Uuid of the publisher who is publishing the event.
     * @param payload {Array} [Optional] The payload that the event publisher would want to be passed to all the side effects.
     */
    trigger(event, target, ...payload) {
        let listenersList = this._eventListenerMap.get(event) || [];
        this._eventTriggeredMap.set(event, {executed: true, payload: payload, target: target});
        for (let listener of listenersList) {
            // listener.execute.apply(listener, [target, payload]);
            executeListenerRoutine(listener, target, payload);
        }
    }

    /**
     * @return [Array] returns the list of the Events and mapped listeners name
     */
    getEvents() {
        let eventList = [],
            eventKeys = this._eventListenerMap.keys();

        for (let event of eventKeys) {
            let listeners = this._eventListenerMap.get(event),
                tempObj = {
                    event: event,
                    listener: []
                };
            for (let listener of listeners) {
                tempObj.listener.push(listener.listenerUid);
            }

            eventList.push(tempObj);
        }

        return eventList;
    }
}

export default eBus;