export class PubSub {
    private static message = {};
    
    constructor() { }

    subscribe(messageName, fn) {
        PubSub.message[messageName] = PubSub.message[messageName] || [];
        PubSub.message[messageName].push(fn);
    }
    unSubscribe(messageName, fn) {
        if (PubSub.message[messageName]) {
            PubSub.message[messageName].forEach((el, i) => {
                if (PubSub.message[messageName][i] === fn) {
                    PubSub.message[messageName].splice(i, 1);
                    
                }
            });
        }
    }
    publish(messageName, data) {
        if (PubSub.message[messageName]) {
            PubSub.message[messageName].forEach(fn => {
                fn(data);
            });
        }
    }
}
