const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here
describe('ScooterApp tests', () => {
    // construction
    test('ScooterApp construction', () => {

        // similar thought in the scooter test suite:
        // consider initializing a ScooterApp object for each 
        // of your test blocks to have full context in each test
        // of where newScooterApp is coming from
        newScooterApp = new ScooterApp();
        // include an expectation statement here for this test
    })
    
    // register user
    test('register user', () => {
        // needs expectation statement for the happy-path use case
        newScooterApp.registerUser('goob', 'goober', 20);

        tooYoung = () => {
            newScooterApp.registerUser('todd', 'howard', 12);
        }

        // additional similar comment in user suite:
        // specifying which error is being thrown will improve readability
        // and help distinguish between which errors to expect to be thrown
        expect(tooYoung).toThrow();

        alreadyRegistered = () => {
            newScooterApp.registerUser('goob', 'goober', 20);
        }

        expect(alreadyRegistered).toThrow();
    })

    // log in
    test('log in', () => {
        wrongPassword = () => {
            newScooterApp.loginUser('goob', 'reboog');
        }

        expect(wrongPassword).toThrow();

        invalidUser = () => {
            newScooterApp.loginUser('gooba', 'reboog');
        }

        expect(invalidUser).toThrow();

        newScooterApp.loginUser('goob', 'goober');

        expect(newScooterApp.registeredUsers['goob'].loggedIn).toBe(true);

        alreadyLoggedIn = () => {
            newScooterApp.loginUser('goob', 'goober');
        }

        expect(alreadyLoggedIn).toThrow();
    })

    // log out
    test('log out', () => {
        newScooterApp.logoutUser('goob');

        expect(newScooterApp.registeredUsers['goob'].loggedIn).toBe(false);

        alreadyLoggedOut = () => {
            newScooterApp.logoutUser('goob');
        }

        expect(alreadyLoggedOut).toThrow();

        notAUser = () => {
            newScooterApp.logoutUser('nobody');
        }

        expect(notAUser).toThrow();
    })

    // create scooter
    test('create scooter', () => {
        newScooterApp.createScooter('Downtown');

        expect(newScooterApp.stations['Downtown'].length).toBe(1)

        newScooterApp.createScooter('Downtown');

        expect(newScooterApp.stations['Downtown'].length).toBe(2)

        invalidStation = () => {
            newScooterApp.createScooter('Gooberville');
        }

        expect(invalidStation).toThrow()

        noStation = () => {
            newScooterApp.createScooter()
        }

        expect(noStation).toThrow();
    })

    // rent scooter
    test('rent scooter', () => {
        const currentUser = newScooterApp.registeredUsers['goob'];
        const currentScooter = newScooterApp.stations['Downtown'][0];

        notLoggedIn = () => {
            newScooterApp.rentScooter(currentScooter, currentUser);
        }

        expect(notLoggedIn).toThrow();

        newScooterApp.loginUser('goob', 'goober')

        newScooterApp.rentScooter(currentScooter, currentUser);
        // happy path expectation statement needed

        alreadyRented = () => {
            newScooterApp.rentScooter(currentScooter, currentUser);
        }

        expect(alreadyRented).toThrow();
    })

    // dock scooter
    test('dock scooter', () => {
        const currentScooter = newScooterApp.stations['Downtown'][0];

        wrongStation = () => {
            newScooterApp.dockScooter(currentScooter, 'Gooberville');
        }

        expect(wrongStation).toThrow();

        newScooterApp.dockScooter(currentScooter, 'Downtown');

        alreadyDocked = () => {
            newScooterApp.dockScooter(currentScooter, 'Downtown');
        }

        expect(alreadyDocked).toThrow();
    })

    // different stations
    // this test could also use a comment explaining what it's testing
    test('dock at different stations', () => {
        const currentUser = newScooterApp.registeredUsers['goob'];
        let currentScooter;
        let prev;

        for (let station in newScooterApp.stations) {
            if (!currentScooter) {
                currentScooter = newScooterApp.stations[station][0];
                prev = station;
            } else {
                newScooterApp.rentScooter(currentScooter, currentUser);
                newScooterApp.dockScooter(currentScooter, station);

                expect(newScooterApp.stations[prev].includes(currentScooter)).toBe(false);
                expect(newScooterApp.stations[station].includes(currentScooter)).toBe(true);

                currentScooter = newScooterApp.stations[station][0];
                prev = station;
            }
        }
    })

    // serial test
    test('serial increments', () => {
        let currentScooter = newScooterApp.stations['Airport'][0];
        expect(currentScooter.serial).toBe(2);

        newScooterApp.createScooter('Residential');
        currentScooter = newScooterApp.stations['Residential'][0];

        expect(currentScooter.serial).toBe(3);
    })

    // if we want to keep this test,
    // consider testing the output in the console and verify it's what you expect
    // print
    test('print', () => {
        newScooterApp.print();
    })

})