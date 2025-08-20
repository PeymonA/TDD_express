const request = require('supertest');
const app = require('../app')

describe('GET /', () => {
  it('responds with 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});

describe('GET /carValue', () => {
  test("Returns correct output", async() =>{
    const response = await request(app).get('/getValue?model=Civic&year=2014')
    expect(response.body.carValue).toBe(6614)
  })

  test("Doesn't accept negative year", async() =>{
    const response = await request(app).get('/getValue?model=Civic&year=-1')
    expect(response.status).toBe(400)
  })

  test("Doesn't accept non integer years", async() =>{
    const response = await request(app).get('/getValue?model=Civic&year=two')
    expect(response.status).toBe(400)
  })

  test("Numbers only for model", async() =>{
    const response = await request(app).get('/getValue?model=911&year=2020')
    expect(response.body.carValue).toBe(2020)
  })

  test("Checking that symbols are ignored", async() =>{
    const response = await request(app).get('/getValue?model=Civic!&year=2014')
    expect(response.body.carValue).toBe(6614);
  })
})

describe('POST /getRiskRating', () => {
  it('responds with 200', async () => {
    const body = 'Hello World!'
    const res = await request(app).post('/getRiskRating').send({ input: body });
    expect(res.status).toBe(200);
  })
  it ('Expected input and output', async () => {
    const body = 'My only claim was a crash into my house\'s garage door that left a scratch on my car.  There are no other crashes.'
    const res = await request(app).post('/getRiskRating').send({ input: body });
    expect(res.body.riskRating).toBe(3);
  })
  it ('Handles empty input', async () => {
    const body = ''
    const res = await request(app).post('/getRiskRating').send({ input: body });
    expect(res.body.riskRating).toBe(1);
  })
  it ('Checking how API handles data', async () => {
    const body = 'Cra sh'
    const res = await request(app).post('/getRiskRating').send({ input: body });
    expect(res.body.riskRating).toBe(0);
  })
  it ('Doesn\'t accept non string input', async () => {
    const body = 12345
    const res = await request(app).post('/getRiskRating').send({ input: body });
    expect(res.status).toBe(400);
  })
})

describe('GET /getQuote', () => {
  it('responds with 200', async () => {
    const res = await request(app).get('/getQuote?car_value=6614&risk_rating=5');
    expect(res.status).toBe(200);
  });
  it('Expected output', async () => {
    const res = await request(app).get('/getQuote?car_value=6614&risk_rating=5');
    expect(res.body).toEqual({ monthlyPremium: 27.5, yearlyPremium: 330 });
  })
  it('Doesn\'t accept non-numeric values', async () => {
    const res = await request(app).get('/getQuote?car_value=abc&risk_rating=def');
    expect(res.status).toBe(400);
  });
  it('Handles missing query parameters', async () => {
    const res = await request(app).get('/getQuote?car_value=5000');
    expect(res.status).toBe(400);
  });
  it('Handles negative values', async () => {
    const res = await request(app).get('/getQuote?car_value=-1000&risk_rating=5');
    expect(res.status).toBe(400);
  });
});

describe('GET /getDiscount', () => {
  it('responds with 200', async () => {
    const res = await request(app).get('/getDiscount?age=30&experience=6');
    expect(res.status).toBe(200);
  });
  it('Returns correct discount for age and experience', async () => {
    const res = await request(app).get('/getDiscount?age=30&experience=6');
    expect(res.body.discount).toBe(10);
  });
  it('Handles missing query parameters', async () => {
    const res = await request(app).get('/getDiscount?age=30');
    expect(res.status).toBe(400);
  });
  it('Handles non-numeric values', async () => {
    const res = await request(app).get('/getDiscount?age=thirty&experience=six');
    expect(res.status).toBe(400);
  });
  it('Handles negative values', async () => {
    const res = await request(app).get('/getDiscount?age=-5&experience=2');
    expect(res.status).toBe(400);
  });
})