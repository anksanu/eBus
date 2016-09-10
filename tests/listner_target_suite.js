/**
 * Created by ankit.agrawal on 27/08/16.
 */

import EBus from '../src/eBus';

const EBusInstance = new EBus();

EBusInstance.addListener([{
    name: void 0,
    event: ['First_Event', 'Second_Event'],
    routine: function (payload) {
        console.log('Listener 1');
        payload.value += '1'
    },
    options: {
        target: 'First_Publisher',
        once: false
    }
}, {
    name: void 0,
    event: 'First_Event',
    routine: function (payload) {
        console.log('Listener 2');
        payload.value += '2'
    },
    options: {
        target: 'Second_Publisher'
    }
}, {
    name: '3',
    event: 'Second_Event',
    routine: function (payload) {
        console.log('Listener 3');
        payload.value += '3'
    },
    options: {
        target: 'Second_Publisher'
    }
}, {
    name: '2',
    event: ['First_Event', 'Second_Event'],
    routine: function (payload) {
        console.log('Listener 4', payload.name);
        payload.value += '4'
    },
    options: {}
}]);


let TestCaseSuite = [
    /**
     * Expected Output
     * Listener 1
     * Listener 4 eBus
     */
    {
        query: ['First_Event', 'First_Publisher', {
            name: 'eBus',
            value: ''
        }],
        result: '14'
    },
    /**
     * Expected Output
     * Listener 2
     * Listener 4 eBus
     */
    {
        query: ['First_Event', 'Second_Publisher', {
            name: 'eBus',
            value: ''
        }],
        result: '24'
    },
    /**
     * Expected Output
     * Listener 1
     * Listener 4 eBus
     */
    {
        query: ['Second_Event', 'First_Publisher', {
            name: 'eBus',
            value: ''
        }],
        result: '14'
    },
    /**
     * Expected Output
     * Listener 3
     * Listener 4 eBus
     */
    {
        query: ['Second_Event', 'Second_Publisher', {
            name: 'eBus',
            value: ''
        }],
        result: '34'
    },
    /**
     * Expected Output
     * Listener 4 eBus
     */
    {
        query: ['First_Event', void 0, {
            name: 'eBus',
            value: ''
        }],
        result: '4'
    },
    /**
     * Expected Output
     * Listener 4 eBus
     */
    {
        query: ['Second_Event', void 0, {
            name: 'eBus',
            value: ''
        }],
        result: '4'
    }

];

console.group('Listener Target Suite');
let count = 0;
for (let testCase of TestCaseSuite) {
    let payload = testCase.query[2],
        result = testCase.result;

    payload.value = '';
    console.group('Test', ++count);
    EBusInstance.trigger.apply(EBusInstance, testCase.query);
    if (payload.value === result) {
        console.info("Test Passed");
    } else {
        console.error("Test Failed")
    }
    console.groupEnd();
}
console.groupEnd();

window.eBus = EBusInstance;
