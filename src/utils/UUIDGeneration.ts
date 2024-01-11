export function getRandomUUID() {
    var timestamp = Date.now().toString(10).substring(0, 10);  
    return Number(timestamp);
    }