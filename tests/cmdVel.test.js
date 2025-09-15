const supertest = require('supertest')
const { app } = require('../app')


const api = supertest(app)

describe('POST api/cmd_vel', () => {
  test('linear and angular velocity', async () => {
    const res = await api
      .post('/api/cmd_vel')
      .send({linear_velocity: 1.2, angular_velocity:-0.5})
  
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', 'ok')
  })
})