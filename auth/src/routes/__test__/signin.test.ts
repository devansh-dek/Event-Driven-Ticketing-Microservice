import request from "supertest";
import { app } from "../../app";

it('fails when email does not exists is supplied', async()=> {
  await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password:"password"
    })
    .expect(400);
})

it('fails when incorrect password is supplied', async ()=>{
    await request(app)
      .post('/api/users/signup')
      .send({
        email:"test@test.com",
        password:"password"
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email:"test@test.com",
        password:"dehdekfekj"
      })
      .expect(400)

})

it("respond with a cokkie when given valid credentials", async()=> {
    await request(app)
      .post('/api/users/signup')
      .send({
        email:"test@test.com",
        password:"password"
      })
      .expect(201);

    const resp = await request(app)
      .post('/api/users/signin')
      .send({
        email:"test@test.com",
        password:"password"
      })
      .expect(201)

    expect(resp.get('Set-Cookie')).toBeDefined()
})