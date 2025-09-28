import nats from 'node-nats-streaming';

const stan = nats.connect(
    'ticketing', 'abc', {
        url: 'http://localhost:4222'
    }
);

var logPublishData = () =>{
    console.log('publish data')
}
stan.on('connect', ()=>{
    console.log("Publisher connected to nats");

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    stan.publish(
        "ticket:created ", data, logPublishData                      // name of channel, data, otional(callback function)
    )
});
