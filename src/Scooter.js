let nextSerial = 1;
class Scooter{
  station;
  user;
  serial;
  charge;
  isBroken;

  constructor(station){
    if (!station) throw new Error('must include station')

    this.station = station;
    this.user = null;
    this.serial = nextSerial;
    nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user){
    if(this.charge <= 20) throw new Error('scooter needs to charge');
    if(this.isBroken) throw new Error('scooter needs repair');
    if(this.user != null) throw new Error('scooter already rented')

    this.station = null;
    this.user = user;

    console.log(`Scooter #${this.serial} rented to ${user.username}`)
  }

  dock(station){
    if (!station) throw new Error('Invalid station')
    if (this.station != null) throw new Error('scooter already docked')

    this.station = station;
    this.user = null;

    console.log(`Scooter #${this.serial} docked`)
  }

  async recharge(){
    if (this.charge == 100) throw new Error('Scooter does not need charging!')

    console.log('Starting charge')

    await new Promise(resolve => setTimeout(resolve, 2000));

    while(this.charge < 100){
      this.charge++;
    }

    console.log('Charge complete')
  }

  async requestRepair(){
    if (!this.isBroken) throw new Error('Scooter does not need repairs!')

    console.log('Starting repair')

    await new Promise(resolve => setTimeout(resolve, 2000));

    this.isBroken = false;

    console.log('Scooter repaired!')
  }

}


module.exports = Scooter
