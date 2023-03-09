class User {
  username;
  password;
  age;
  loggedIn;

  constructor(username, password, age){
    // love this argument check
    if (!username || !password || !age) throw new Error('Missing arguments')

    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password){
    if (password != this.password) throw new Error('Incorrect password!')
    if (this.loggedIn) throw new Error('Already logged in')

    this.loggedIn = true;
  }

  logout(){
    if (!this.loggedIn) throw new Error('User already logged out')

    this.loggedIn = false;
  }

}

module.exports = User
