import nats from 'node-nats-streaming'
console.clear()

const stan = nats.connect(
    'ticketing', '123', {
        url: 'http://localhost:4222'
    }
);

stan.on('connect', ()=>{
  console.log('listener! conneted to nats :)');

  const supscription = stan.subscribe('ticket:created');
  supscription.on('message', (msg)=>{
    console.log('msg recieved')
  })

})