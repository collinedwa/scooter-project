const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  stations = {'Downtown': [], 'Residential': [], 'Airport': []};
  registeredUsers = {};
  
  registerUser(username, password, age){
    if (age < 18) throw new Error('Must be 18 to register')
    if (username in this.registeredUsers) throw new Error('User already exists')

    const user = new User(username, password, age)
    this.registeredUsers[username] = user;
  }

  loginUser(username, password){
    if (!this.registeredUsers[username]) throw new Error('User does not exist')

    const currentUser = this.registeredUsers[username]
    currentUser.login(password);
  }

  logoutUser(username){
    if (!this.registeredUsers[username]) throw new Error('User does not exist')

    const currentUser = this.registeredUsers[username]
    currentUser.logout();

    console.log(`${username} logged out!`)
  }

  createScooter(station){
    if (!station) throw new Error('Must include station')
    if (!this.stations[station]) throw new Error('Station does not exist')

    const newScooter = new Scooter(station)

    this.stations[station].push(newScooter)

    // for user experience, consider printing initial station as well
    console.log(`Created new scooter (id: ${newScooter.serial})`)
  }

  dockScooter(scooter, station){
    if (!this.stations[station]) throw new Error('Station does not exist')
    if (scooter.station == station && scooter.user == null) throw new Error('Scooter already at station')
    let currentStation;

    // this is a really interesting few lines of code.
    // A couple of comments explaining what you're checking could
    // improve the readability even more.
    for (let curr in this.stations){
      if (this.stations[curr].includes(scooter)){
        currentStation = this.stations[curr];
        break
      }
    }
    if (currentStation != station) {
      currentStation.splice(currentStation.indexOf(scooter), 1)
      this.stations[station].push(scooter);
    }

    scooter.dock(station);
    console.log(`Scooter #${scooter.serial} docked at ${station}`)
  }

  rentScooter(scooter, user){
    // can also check if the station exists here,
    // as well as whether scooter.station is defined to determine
    // whether it's been rented
    if(scooter.user != null) throw new Error('Scooter already rented')
    if(!user.loggedIn) throw new Error('User must be logged in')

    for (let station in this.stations){
      // instead of defining a new variable, consider checking
      // if this.stations[station].includes(scooter)
      const currentStation = this.stations[station]
      if (currentStation.includes(scooter)){
        // make sure to remove this scooter from the station's array when rented
        scooter.rent(user);
        console.log(`Scooter #${scooter.serial} rented to ${user.username}`);
        break
      }
    }
  }

  print(){
    console.log('STATIONS:');
    for(let station in this.stations){
      console.log(station);
    }
    console.log('');
    console.log('USERS:');
    for(let user in this.registeredUsers){
      console.log(user);
    }
  }
}

module.exports = ScooterApp
