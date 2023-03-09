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
    // consider condensing the below three tests into one where one test
    // verifies all 3 attributes of the User
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
    // consider separating each login scenario into its own separate test block
    // to promote readability and clear separation of concerns.
    // e.g. successful login assertion, incorrect password assertion,
    // or already logged in assertion
    test('login', () => {
        noPass = () => {
            testUser.login();
        }
        // consider putting in specific errors that are thrown
        // as an argument in each .toThrow() 
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
    // similar comment as before, where it'd be beneficial to
    // have separate test blocks for each scenario
    test('logout', () => {
        testUser.logout()

        expect(testUser.loggedIn).toBe(false)

        alreadyLoggedOut = () => {
            testUser.logout();
        }

        expect(alreadyLoggedOut).toThrow();
    })

})
