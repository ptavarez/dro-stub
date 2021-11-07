import request from 'supertest';
import { app } from '../../app';

describe('Sign Up', () => {
  it('returns a 201 on successful sign up', async () => {
    return request(app)
      .post('/api/users/signup') // POST request to /api/users/signup
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'testtest.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123',
      })
      .expect(400);
  });

  it('returns a 400 with an missing email or password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com' })
      .expect(400);
    return request(app)
      .post('/api/users/signup')
      .send({ password: '1234' })
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(400);
  });

  it('sets a cookie after successful sign up', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
