export function getRandomUUID() {
    var timestamp = new Date().toJSON().slice(0,19).replace(/-/g,'').replace("T","").replace(":","").replace(":","");  
    return Number(timestamp);
    }