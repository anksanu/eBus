# Under Development

# eBus : A JavaScript Event Bus

eBus is an implementation of an Event Bus, it's open-source under MIT license

# Features
    - Entities can attach a listener to an event
    - Entites can remove an attached listener for an event
    - Entities can trigger and event
    - You can also:
        - Attach a target to a listener
        - Pass explicit context to the listener routine
        - Attach a listener to multiple events

#Examples

let EBusInstance = new eBus();

EBusInstance.addListener([{
    name: <Listener Unique Id>,
    event: [<, seperated events for which the listener need to be attached>],
    routine: <listener routine which will be executed on event trigger>,
    options: {
        throttle - <timestamp> timestamp representing the duration for which the attached listener on the events will be throttled>,
        target - <string> Restricting the execution of binded routine based on the publisher of the event,
        once - <boolean> default false, true mean the listener will be executed only once,
        rememberPast - <boolean> triggers the routine upon listener registration if the event has occued in the past with the paylod of the most latest past triggered event
    }
}]);


EBusInstance.trigger(<string>[Event Name], <string>[Publisher], <object>[Payload]);