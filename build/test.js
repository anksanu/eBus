/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _listner_target_suite = __webpack_require__(1);
	
	var _listner_target_suite2 = _interopRequireDefault(_listner_target_suite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _eBus = __webpack_require__(2);
	
	var _eBus2 = _interopRequireDefault(_eBus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EBusInstance = new _eBus2.default(); /**
	                                          * Created by ankit.agrawal on 27/08/16.
	                                          */
	
	EBusInstance.addListener([{
	    name: '1',
	    event: ['First_Event', 'Second_Event'],
	    routine: function routine(payload) {
	        console.log('Listener 1');
	        payload.value += '1';
	    },
	    options: {
	        target: 'First_Publisher',
	        once: false
	    }
	}, {
	    name: '2',
	    event: 'First_Event',
	    routine: function routine(payload) {
	        console.log('Listener 2');
	        payload.value += '2';
	    },
	    options: {
	        target: 'Second_Publisher'
	    }
	}, {
	    name: '3',
	    event: 'Second_Event',
	    routine: function routine(payload) {
	        console.log('Listener 3');
	        payload.value += '3';
	    },
	    options: {
	        target: 'Second_Publisher'
	    }
	}, {
	    name: '2',
	    event: ['First_Event', 'Second_Event'],
	    routine: function routine(payload) {
	        console.log('Listener 4', payload.name);
	        payload.value += '4';
	    },
	    options: {}
	}]);
	
	var TestCaseSuite = [
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
	}];
	
	console.group('Listener Target Suite');
	var count = 0;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
	    for (var _iterator = TestCaseSuite[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var testCase = _step.value;
	
	        var payload = testCase.query[2],
	            result = testCase.result;
	
	        payload.value = '';
	        console.group('Test', ++count);
	        EBusInstance.trigger.apply(EBusInstance, testCase.query);
	        if (payload.value === result) {
	            console.info("Test Passed");
	        } else {
	            console.info("Test Failed");
	        }
	        console.groupEnd();
	    }
	} catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	} finally {
	    try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	        }
	    } finally {
	        if (_didIteratorError) {
	            throw _iteratorError;
	        }
	    }
	}
	
	console.groupEnd();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * eBus is a JavaScript Event Pub Sub Bus
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * - Entities can attach a listener to an event
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * - Entities can publish events
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * - Entities can listen to events that happened in the past
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _event = __webpack_require__(3);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _listener = __webpack_require__(4);
	
	var _listener2 = _interopRequireDefault(_listener);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var eBus = function () {
	    function eBus(options) {
	        _classCallCheck(this, eBus);
	
	        this._eventListenerMap = new Map();
	        this._eventTriggeredFlag = new Map();
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
	     *      rememberPast: <boolean>, [ Pending ]
	     *      throttle : <timestamp>, [ Pending ]
	     *      target : <string>
	     * }
	     *
	     * @return <Array> Returns an array of listenerId's
	     */
	
	
	    _createClass(eBus, [{
	        key: 'addListener',
	        value: function addListener(listenerPayload) {
	            var listenerIdsList = [];
	            if (!(listenerPayload instanceof Array)) {
	                listenerPayload = [listenerPayload];
	            }
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = listenerPayload[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var payloadObj = _step.value;
	
	                    var eventList = payloadObj.event instanceof Array ? payloadObj.event : [payloadObj.event];
	                    var listenerObj = new _listener2.default(payloadObj.name, payloadObj.routine, payloadObj.context, payloadObj.options);
	                    listenerIdsList.push(payloadObj.name);
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;
	
	                    try {
	                        for (var _iterator2 = eventList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var event = _step2.value;
	
	                            this._eventListenerMap.has(event) ? this._eventListenerMap.get(event).push(listenerObj) : this._eventListenerMap.set(event, [listenerObj]);
	                            _logger2.default.log(payloadObj.name, 'listener is attached with', event);
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return listenerIdsList;
	        }
	
	        /**
	         * Removes a listeners from the eBus
	         *
	         * @param listenerName {string}[Required] Uuid of the listner attaching context who want's to remove this listener.
	         * @param eventName {string}[Required] Name of the event that need not to be listened any more.
	         */
	
	    }, {
	        key: 'removeListener',
	        value: function removeListener(listenerName, eventName) {
	            var listenersList = this._eventListenerMap.get(eventName);
	            var updatedListnersList = [];
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = listenersList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var listener = _step3.value;
	
	                    if (listener.listenerUid != listenerName) {
	                        updatedListnersList.push(listener);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            this._eventListenerMap.set(eventName, updatedListnersList);
	        }
	
	        /**
	         * Triggers an event on the eBus making all the sideEffects to be executed for such event
	         *
	         * @param event {string} [Required] Name of the event that is published
	         * @param target {string} [Optional] The Uuid of the publisher who is publishing the event.
	         * @param payload {Array} [Optional] The payload that the event publisher would want to be passed to all the side effects.
	         */
	
	    }, {
	        key: 'trigger',
	        value: function trigger(event, target) {
	            for (var _len = arguments.length, payload = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                payload[_key - 2] = arguments[_key];
	            }
	
	            var listenersList = this._eventListenerMap.get(event);
	            this._eventTriggeredFlag.set(event, { executed: true, payload: payload });
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = listenersList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var listener = _step4.value;
	
	                    listener.execute.apply(listener, [target, payload]);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }]);
	
	    return eBus;
	}();
	
	exports.default = eBus;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Event = function Event() {
	    _classCallCheck(this, Event);
	};
	
	exports.default = Event;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _utils = __webpack_require__(6);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function validateConstructorParams(objUnderValidation) {
	    var listenerUid = objUnderValidation[0],
	        listenerSideEffectsRoutine = objUnderValidation[1],
	        validationVerdict = true;
	
	    if (!listenerUid) {
	        _logger2.default.error('listenerUid is not found');
	        validationVerdict = false;
	    }
	
	    return validationVerdict;
	}
	
	var Listener = function () {
	
	    /**
	     *
	     * @param listenerUid
	     * @param listenerSideEffectRoutine
	     */
	    function Listener(listenerUid, listenerSideEffectRoutine, context) {
	        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	        _classCallCheck(this, Listener);
	
	        if (!validateConstructorParams(arguments)) {
	            return;
	        }
	
	        this._listenerUid = listenerUid;
	        this._listenerSideEffectRoutine = listenerSideEffectRoutine;
	        this._context = context;
	        this._executionCount = 0;
	        this._executeOnce = options.once ? true : false;
	        this._creationTimestamp = _utils2.default.getCurrentTime();
	        this._target = options.target || void 0;
	        this._lastExecutionTimestamp = void 0;
	    }
	
	    /**
	     * Executes the listener side effect routine.
	     *
	     * @param target {string} represents the uuid of the entity publishing this event
	     * @param payload {object} The payload passed by the target which will be forwared to side effect routine
	     * as param
	     */
	
	
	    _createClass(Listener, [{
	        key: 'execute',
	        value: function execute(target, payload) {
	            _logger2.default.log(this._listenerUid + ' listener execution begins');
	            if (this._executeOnce && this._executionCount > 0) {
	                _logger2.default.log(this._listenerUid, ' listener execution skipped..');
	                return void 0;
	            }
	
	            if (this._target != void 0 && target != this._target) {
	                _logger2.default.log(this._listenerUid, ' listener execution skipped due to unmatching target');
	                return void 0;
	            }
	
	            this._lastExecutionTimestamp = _utils2.default.getCurrentTime();
	            this._listenerSideEffectRoutine.apply(this._context, payload);
	            this._executionCount += 1;
	        }
	
	        /**
	         * Getter Function to retrieve UUid of the context which added the listener
	         *
	         * @returns {string} The UUid of the listener adding context
	         */
	
	    }, {
	        key: 'listenerUid',
	        get: function get() {
	            return this._listenerUid;
	        }
	
	        /**
	         * Getter Function to retrieve the sideEffect routine attached by the context during listener creation.
	         *
	         * @returns {Function} Retruns the sideEffect routine attached by the context
	         */
	
	    }, {
	        key: 'listenerSideEffectRoutine',
	        get: function get() {
	            return this._listenerSideEffectRoutine;
	        }
	    }]);
	
	    return Listener;
	}();
	
	exports.default = Listener;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ErrorDisplay = function () {
	    function ErrorDisplay() {
	        _classCallCheck(this, ErrorDisplay);
	    }
	
	    _createClass(ErrorDisplay, [{
	        key: "error",
	        value: function error(message) {
	            throw new Error(message);
	        }
	    }, {
	        key: "info",
	        value: function info(message) {
	            console.info(message);
	        }
	    }, {
	        key: "log",
	        value: function log() {
	            console.log.apply(console.log, arguments);
	        }
	    }]);
	
	    return ErrorDisplay;
	}();
	
	exports.default = function () {
	    return new ErrorDisplay();
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    getCurrentTime: function getCurrentTime() {
	        return new Date().getTime();
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=test.js.map