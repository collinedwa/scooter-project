class Scooter{
  static nextSerial = 1;
  station;
  user;
  serial;
  charge;
  isBroken;

  constructor(station){
    if (!station) throw new Error('must include station')

    this.station = station;
    this.user = null;
    // consider condensing these serial lines -> this.serial = Scooter.nextSerial++;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user){
    // I like this structure of handling error cases first before the 'happy path' logic
    if(this.charge <= 20) throw new Error('scooter needs to charge');
    if(this.isBroken) throw new Error('scooter needs repair');
    if(this.user != null) throw new Error('scooter already rented')

    this.station = null;
    this.user = user;
  }

  dock(station){
    if (!station) throw new Error('Invalid station')
    if (this.station != null) throw new Error('scooter already docked')

    this.station = station;
    this.user = null;
  }

  async recharge(){
    if (this.charge == 100) throw new Error('Scooter does not need charging!')

    console.log('Starting charge')

    // love this solution to incrementally charge the scooter
    while(this.charge < 100){
      await new Promise(resolve => setTimeout(resolve, 30));
      this.charge++;
      if (this.charge % 25 == 0) console.log(`Scooter at ${this.charge}%`)
    }

    console.log('Charge complete')
  }

  async requestRepair(){
    if (!this.isBroken) throw new Error('Scooter does not need repairs!')

    console.log('Starting repair')

    await new Promise(resolve => setTimeout(resolve, 4000));

    this.isBroken = false;

    console.log('Scooter repaired!')
  }

}


module.exports = Scooter
