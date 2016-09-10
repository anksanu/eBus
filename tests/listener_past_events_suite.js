/**
 * Created by ankit.agrawal on 27/08/16.
 */

import EBus from '../src/eBus';

const EBusInstance = new EBus();
console.group('Listener Past Events Suite');


let matchString = '';
let result = '11';

EBusInstance.trigger('First_Event', 'First_Publisher', {name : 'eBus', value : 1});
EBusInstance.trigger('Second_Event', 'First_Publisher', {name : 'eBus', value : 1});

EBusInstance.addListener([{
    name: '1',
    event: ['First_Event', 'Second_Event'],
    routine: function (payload) {
        console.log('Raised Condition');
        matchString += '1'
    },
    options: {
        target: 'First_Publisher',
        once: false,
        rememberPast : true
    }
}]);

setTimeout(()=> {
    if(matchString == result){
        console.info('Test Passed');
    } else {
        console.error('Test Failed');
    }
    console.groupEnd();
},2000);
