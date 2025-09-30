import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto';

console.clear()

const stan = nats.connect(
  'ticketing', randomBytes(4).toString('hex'), {
      url: 'http://localhost:4222'
  }
);

stan.on('connect', ()=>{
  console.log('listener! conneted to nats :)');

  const supscription = stan.subscribe('ticket:created', 'litenerQueueGroup');

  supscription.on('message', (msg: Message)=>{
    const data = msg.getData();
    if(typeof data === 'string'){
      console.log(`Recieved event number`, msg.getSequence(), `with data `, JSON.parse(data))
    }
  })

})