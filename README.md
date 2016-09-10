# eBus : A JavaScript Event Bus

eBus is an implementation of an Event Bus, it's open-source under MIT license

## Features
    - Entities can attach a listener to an event
    - Entites can remove an attached listener for an event
    - Entities can trigger and event
    - You can also:
        - Attach a target to a listener
        - Pass explicit context to the listener routine
        - Attach a listener to multiple events


## Adding eBus in your project
Add [ebus.min.js](https://raw.githubusercontent.com/anksanu/eBus/master/release/eBus.min.js "Ebus") in you web page
```javascript
let(var) eBusInstance = new eBus();
```

## API
### Add Listener
```javascript
- @returns : [Array] List of listener names
eBusInstance.addListener(<Array>[Listener Config]);
```

#### Listener Config
```javascript
- @name : [Optional] Unique name to reference the listener ( It should be a continuous string )
- @event :[Array] List of events on which this listener will be attached
- @routine : [Function] Routine which will be executed upon event trigger
- @context : [Object][Optional] External Context which will be passed to the routine upon execution
- @options : [Object][Optional]
--   @once : [Boolean][Default = false] Will execute the listener only once
--   @rememberPast : [Boolean] [Default = false] Will execute the listener routine upon registration in case the attached even was triggered in the past, the context and payload will be past of the most recend past event trigger
--   @target : [String] Represents the publisher who is triggering the event
--   @throttle :[Timestamp] The event execution will be throttled for the specified time period

{
	name : <string>,
    event : <Array>,
    routine : <function>,
    context : <object>,
    options : {
    	once : <boolean>,
        rememberPast : <boolean>,
        target: <string>,
        throttle: <timestamp>
    }
 }
```

### Remove Listener
```javascript
- @listenerName : [String] Listener id of the listener that need to be removed from the bus.
- @eventName : [String] Event Name for which this listener needs to be removed.

eBusInstance.removeListener(<listenerName>, <eventName>)
```

### Trigger Event
```javascript
- @eventName : [String] Name of the event which needs to be triggered
- @targetName : [String][Default = null] Name of the publisher who is publishing the event, this will only trigger the listeners with this publisher as target
- @payload : [Object] Payload which will passes as parameter while executing the listener routine

eBusInstance.trigger(<eventName>, <targetName>, <payload>);
```

### Get Events
```javascript
- @return : [Array] Return an array of [Event Object]
-
- Event Object
-- @event : [String] Name of the Event
-- @listener : [Array] List of listener names attached with this event

eBusInstance.getEventsList()
```
