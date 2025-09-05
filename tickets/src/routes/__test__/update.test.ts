import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if provided id does not exists', async() => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', await global.signin())
    .send({
      title: "somedd",
      price: 20
    })
    .expect(404);

})

it('returns a 401 if user is not authenticated', async() => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "somedd",
      price: 20
    })
    .expect(401);
})

it('returns a 401 if user does not own the ticket', async() => {
  const resp = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', await global.signin())
    .send({
      title: "djejfeh",
      price: 20
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set("Cookie",await global.signin())  // diff user id while this req
    .send({
      title:"dygewj",
      price: 22
    })
    .expect(401)


})

it('returns a 400 if user provide invalid title or price', async() => {
  const cookie = await global.signin();

  const resp = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: "djejfeh",
      price: 20
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set("Cookie", cookie)
    .send({
      title:"",
      price: 20
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set("Cookie", cookie)
    .send({
      title:"djejfeh",
      price: -89
    })
    .expect(400)

})

it('it upadate the ticket provided input is valid', async() => {
  const cookie = await global.signin();

  const resp = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: "djejfeh",
      price: 20
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set("Cookie", cookie)
    .send({
      title:"newTitle",
      price: 100
    })
    .expect(200)
})