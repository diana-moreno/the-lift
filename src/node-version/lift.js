class Lift {
  constructor(){
    this.direction = 'up';
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.waitingList = [];
    this.passengers = [];
  }
  start() {
    this.starting = setInterval(() => this.update(), 1000);
  }
  stop() {
    clearInterval(this.starting)
  }
  update() {
    if(!this.requests.length) {
      this.stop();
    } else {
      this.setDirection();
      this.log();
      this._passengersEnter();
      this._passengersLeave();
      this.deleteRequests();
    }
  }
  setDirection() {
    let destination = this.requests[0];
    if(destination > this.floor) {
      this.direction = 'up'
      } else {
        this.direction = 'down'
      }
    this.direction === 'up' ? this.floorUp() : this.floorDown();
  }
  _passengersEnter() {
    if(this.waitingList.length) {
      for(let i = this.waitingList.length - 1; i >= 0; i--) {
        if(this.floor === this.waitingList[i].originFloor) {
          console.log(`${this.waitingList[i].name} has entered the lift in floor ${this.waitingList[i].originFloor} to floor ${this.waitingList[i].destinationFloor}.`);
          this.passengers.push(this.waitingList[i])

          this.requests.push(this.waitingList[i].destinationFloor)
          this.waitingList.splice(i, 1);
        }
      }
    }
  }
  _passengersLeave() {
    if(this.passengers.length) {
      for(let i = this.passengers.length - 1; i >= 0; i--) {
        if (this.floor === this.passengers[i].destinationFloor) {
          console.log(`${this.passengers[i].name} has left the lift.`);
        }
      }
      this.passengers = this.passengers.filter(passenger => passenger.destinationFloor !== this.floor); //elimina a los pasajeros que salen de la lista pasajeros
    }
  }
  _deleteRequests() {
    for(let i = this.requests.length - 1; i >= 0; i--) {
      if (this.floor === this.requests[i]) {
        this.requests.splice(i, 1);
      }
    }
  }
  floorUp() {
    this.floor < this.MAXFLOOR ? this.floor++ : this.floor = 10;
  }
  floorDown() {
    this.floor > 0 ? this.floor-- : this.floor = 0;
  }
  call(person) {
    this.waitingList.push(person)
    this.requests.push(person.originFloor)
    console.log(`${person.name} has called the lift from floor ${person.originFloor}.`)
  }
  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
/*    console.log('requests:', this.requests)
    console.log('passengers: ', this.passengers)
    console.log('waitings:', this.waitingList)*/
  }
}


module.exports = Lift;