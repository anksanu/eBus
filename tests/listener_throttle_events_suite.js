/**
 * Created by ankit.agrawal on 10/09/16.
 */


import EBus from '../src/eBus';

const EBusInstance = new EBus();
console.group('Listener Throttle Events Suite');

let matchString = '';
let result = '11';
EBusInstance.addListener([{
    name: '1',
    event: ['First_Event', 'Second_Event'],
    routine: function (payload) {
        console.log('Listener Executed');
        matchString +=  payload.value;
    },
    options: {
        throttle: 5000
    }
}]);

EBusInstance.trigger('First_Event', 'First_Publisher', {name : 'eBus', value : 1});
EBusInstance.trigger('Second_Event', 'First_Publisher', {name : 'eBus', value : 1});

setTimeout(()=> {
    EBusInstance.trigger('First_Event', 'First_Publisher', {name : 'eBus', value : 1});
},3000);


setTimeout(()=> {
    EBusInstance.trigger('First_Event', 'First_Publisher', {name : 'eBus', value : 1});
    if(matchString == result){
        console.info('Test Suite Passed');
    } else {
        console.error('Test Suite Failed');
    }
    console.groupEnd();
},6000);
