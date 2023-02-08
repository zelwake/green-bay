import validateCredentials from '../../scripts/validateCredentials'

describe('testing username and password input', () => {
  test('on missing username or password, return false ', async () => {
    const testValues = [
      ['personName', ''],
      ['', 'password'],
      ['', ''],
    ]
    for (const [name, password] of testValues) {
      expect(validateCredentials(name, password)).toBe(false)
    }
  })

  test('on username length being longer than 8 characters, return true ', async () => {
    expect(validateCredentials('johnyBoy', 'hEslo123')).toBe(true)
  })

  test('on username length being shorter than 8 characters, return false ', async () => {
    expect(validateCredentials('johnyoy', 'hEslo123')).toBe(false)
  })

  test('password should be at least 6 characters long', async () => {
    expect(validateCredentials('saveUser', 'sh0rT')).toBe(false)
    expect(validateCredentials('saveUser', 'enOugh1')).toBe(true)
  })

  test('password should have at least one number', async () => {
    expect(validateCredentials('saveUser', 'notEnough')).toBe(false)
    expect(validateCredentials('saveUser', '3nougH')).toBe(true)
  })

  test('password should have at least one uppercase letter', async () => {
    expect(validateCredentials('saveUser', 'not3nough')).toBe(false)
    expect(validateCredentials('saveUser', 'IamWorkingWithNumb3r5')).toBe(true)
  })

  test('password should have at least one lowercase letter', async () => {
    expect(validateCredentials('saveUser', 'NOT3ENOUGH')).toBe(false)
    expect(validateCredentials('saveUser', 'BIGLETT3Rs')).toBe(true)
  })
})
