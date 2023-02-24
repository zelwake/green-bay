import databaseQuery from '@/lib/db'
import handler from '@/pages/api/items/index'
import checkToken from '@/scripts/checkToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createMocks,
  createRequest,
  createResponse,
  RequestMethod,
} from 'node-mocks-http'

jest.mock('@/scripts/checkToken', () => jest.fn(() => true))
jest.mock('@/lib/db', () =>
  jest.fn(() => [
    {
      id: 1,
      name: 'Test',
      photo_url: 'http://image.png',
      price: 123,
    },
  ])
)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('/api/items/index GET API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const {
      req,
      res,
    }: {
      req: NextApiRequest & ReturnType<typeof createRequest>
      res: NextApiResponse & ReturnType<typeof createResponse>
    } = createMocks({ method })
    req.headers = {
      'Content-Type': 'application/json',
    }
    return { req, res }
  }

  it('should return 401 when unauthorized', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => null)
    const { req, res } = mockRequestResponse()
    await handler(req, res)

    expect(res.statusCode).toEqual(401)
    expect(res._getJSONData()).toEqual({ error: 'Unauthorized' })
  })

  it('should return 200 status code', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => true)
    const { req, res } = mockRequestResponse()
    await handler(req, res)

    expect(res.statusCode).toEqual(200)
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' })
    expect(res._getJSONData()).toEqual({
      items: [
        {
          id: 1,
          name: 'Test',
          photo_url: 'http://image.png',
          price: 123,
        },
      ],
    })
  })
})

describe('/api/items/index POST API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'POST') {
    const {
      req,
      res,
    }: {
      req: NextApiRequest & ReturnType<typeof createRequest>
      res: NextApiResponse & ReturnType<typeof createResponse>
    } = createMocks({ method })
    req.headers = {
      'Content-Type': 'application/json',
    }
    req.body = {
      name: 'Test',
      description: 'Test of api',
      photoUrl: 'http://image.png',
      price: 123,
    }

    return { req, res }
  }

  it('should return 401 when unauthorized', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => null)
    const { req, res } = mockRequestResponse()

    await handler(req, res)

    expect(res.statusCode).toEqual(401)
  })

  jest.mock('@/scripts/checkToken', () => jest.fn(() => true))

  it('should return 400 status code, error missing parameters', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => true)
    ;(databaseQuery as jest.Mock).mockImplementation(() => ({ insertId: 1 }))
    const { req, res } = mockRequestResponse()
    req.body = {
      name: '',
      description: '',
      photoUrl: '',
      price: '',
    }
    await handler(req, res)

    expect(res.statusCode).toEqual(400)
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' })
    expect(res._getJSONData()).toEqual({
      error: 'Missing one or more information',
    })
  })

  const numbers = ['0', '-1', '1.1']
  for (const number of numbers) {
    it('should return 400 status code, error positive integer', async () => {
      ;(checkToken as jest.Mock).mockImplementation(() => true)
      ;(databaseQuery as jest.Mock).mockImplementation(() => ({ insertId: 1 }))
      const { req, res } = mockRequestResponse()
      req.body = {
        name: 'Test',
        description: 'Test of api',
        photoUrl: 'http://image.png',
        price: number,
      }
      await handler(req, res)

      expect(res.statusCode).toEqual(400)
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' })
      expect(res._getJSONData()).toEqual({
        error: 'Price must be positive integer',
      })
    })
  }

  it('should return 400 status code, error wrong url', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => true)
    ;(databaseQuery as jest.Mock).mockImplementation(() => ({ insertId: 1 }))
    const { req, res } = mockRequestResponse()
    req.body = {
      name: 'Test',
      description: 'Test of api',
      photoUrl: 'www.image.png',
      price: 123,
    }
    await handler(req, res)

    expect(res.statusCode).toEqual(400)
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' })
    expect(res._getJSONData()).toEqual({
      error: 'Url must be valid',
    })
  })

  it('should return 200 status code', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => true)
    ;(databaseQuery as jest.Mock).mockImplementation(() => ({ insertId: 1 }))
    const { req, res } = mockRequestResponse()
    await handler(req, res)

    expect(res.statusCode).toEqual(201)
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' })
    expect(res._getJSONData()).toEqual({
      item: 1,
    })
  })
})

describe('/api/items/index PUT API endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'PUT') {
    const {
      req,
      res,
    }: {
      req: NextApiRequest & ReturnType<typeof createRequest>
      res: NextApiResponse & ReturnType<typeof createResponse>
    } = createMocks({ method })
    return { req, res }
  }

  it('should return 405 when calling PUT', async () => {
    ;(checkToken as jest.Mock).mockImplementation(() => true)
    const { req, res } = mockRequestResponse()
    await handler(req, res)

    expect(res.statusCode).toEqual(405)
    expect(res._getJSONData()).toEqual({
      error: 'Method not allowed',
    })
  })
})
