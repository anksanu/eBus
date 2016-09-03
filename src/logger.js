class ErrorDisplay {
    constructor() {};

    error(message) {
        throw(new Error(message));
    }

    info(message) {
        console.info(message);
    }

    log() {
        console.log.apply(console.log, arguments);
    }
}

export default (function(){
    return new ErrorDisplay;
})();