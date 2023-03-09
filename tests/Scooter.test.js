const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('Scooter is correct object', () => {
    scooterTrue = new Scooter('Downtown');
    expect(typeof(scooterTrue)).toBe('object');
  })
})

//Method tests
describe('scooter methods', () => {

  test('Can construct', () => {
    // TIL not adding 'let' or 'const' makes this visible to the entire file
    // regardless of scope. while this is cool, I think it would be
    // helpful to others who might read this to re-define the test object
    // in each test, to ensure complete context in each block
    newScooter = new Scooter('Downtown')

    emptyStation = () => {
      testScooter = new Scooter()
    }
    expect(emptyStation).toThrow()

    // consider adding an additional initialization test
    // to verify initial attribute values
  })

  //rent method
  // this is another example where separating each scenario into its
  // own test block would increase readability
  test('Rent method', () => {
    newUser = new User('hey','hello',20)

    noCharge = () => {
      newScooter.charge = 0;
      newScooter.rent(newUser);
    }

    expect(noCharge).toThrow();

    brokenScooter = () => {
      newScooter.charge = 100;
      newScooter.isBroken = true;
      newScooter.rent(newUser);
    }

    expect(brokenScooter).toThrow();

    newScooter.isBroken = false;
    newScooter.rent(newUser)
    expect(newScooter.user).toBe(newUser)

    invalidUser = () => {
      newScooter.rent('Gooba')
    }

    expect(invalidUser).toThrow()
  })

  //dock method
  test('Dock method', () => {
    emptyStation = () => {
      newScooter.dock();
    }

    expect(emptyStation).toThrow();
    
    newScooter.dock('Downtown');

    expect(newScooter.station).toBe('Downtown')

    alreadyDocked = () => {
      newScooter.dock('Downtown');
    }

    expect(alreadyDocked).toThrow();

    
  })

  //charge method
  test('recharge method', async () => {
    newScooter.charge = 0;

    await newScooter.recharge();

    expect(newScooter.charge).toBe(100);

    expect(newScooter.recharge()).rejects.toThrow();

  }) 

  //requestRepair method
  test('requestRepair method', async () => {
    newScooter.isBroken = true;

    await newScooter.requestRepair();

    expect(newScooter.isBroken).toBe(false);

    expect(newScooter.requestRepair()).rejects.toThrow();
  })

  //serial test
  test('serial test', () => {
    expect(newScooter.serial).toBe(2);

    scooter3Serial = new Scooter('Place');
    expect(scooter3Serial.serial).toBe(3);
  })


})
