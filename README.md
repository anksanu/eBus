# Under Development

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

let EBusInstance = new eBus();

## API
```javascript
eBusInstance.addListener(<Array>[Listener Config]);
```

#### Listener Config
```javascript
- @name : [Optional] Unique name to reference the listener
- @event :[Array][Required] List of events on which this listener will be attached
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