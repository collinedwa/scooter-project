const User = require('../src/User')

// User tests here
describe('User methods', () => {
    test('User construction', () => {
        testUser = new User('goob','goober',18);

        throwTest = () => {
            fakeUser = new User()
        }

        expect(throwTest).toThrow();
    })
// test username
    test('username', () => {
        expect(testUser.username).toBe('goob')
    })
// test password
    test('password', () => {
        expect(testUser.password).toBe('goober')
    })
// test age
    test('age', () => {
        expect(testUser.age).toBe(18)
    })
// test login
    test('login', () => {
        noPass = () => {
            testUser.login();
        }

        expect(noPass).toThrow();

        wrongPass = () => {
            testUser.login('hello');
        }

        expect(wrongPass).toThrow();

        testUser.login('goober');

        expect(testUser.loggedIn).toBe(true);

        alreadyLoggedIn = () => {
            testUser.login('goober');
        }

        expect(alreadyLoggedIn).toThrow();
    })
// test logout
    test('logout', () => {
        testUser.logout()

        expect(testUser.loggedIn).toBe(false)

        alreadyLoggedOut = () => {
            testUser.logout();
        }

        expect(alreadyLoggedOut).toThrow();
    })

})
