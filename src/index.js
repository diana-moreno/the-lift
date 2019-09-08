class Person {
  constructor(name, originFloor, destinationFloor){
    this.name = name;
    this.originFloor = originFloor;
    this.destinationFloor = destinationFloor
  }
}

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
    this.starting = setInterval(() => this.update(), 1500);
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
      this._deleteRequests();
    }
  }
  setDirection() {
    let destination = this.requests[0];
    if(destination > this.floor) { // no >=
      this.direction = 'up'
      } else {
        this.direction = 'down'
      }
    this.direction === 'up' ? this.floorUp() : this.floorDown();
  }
  getDestinationFloor(i) {
    let destination = prompt('A que piso vas?')
    this.destinationFloor =Number(destination)
    this.passengers[i].destinationFloor = this.destinationFloor
    this.waitingList[i].destinationFloor = this.destinationFloor
  }
  _passengersEnter() {
    if(this.waitingList.length) {
      for(let i = this.waitingList.length - 1; i >= 0; i--) {
        if(this.floor === this.waitingList[i].originFloor) {
          let text = `${this.waitingList[i].name} has entered the lift in floor ${this.waitingList[i].originFloor} to floor ${this.waitingList[i].destinationFloor}.`
          this.appendText(text)
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
          let text = `${this.passengers[i].name} has left the lift.`
          this.appendText(text)
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
    this.waitingList = [...this.waitingList, person] //.push(person)
    this.requests = [...this.requests, person.originFloor]
    let text = `${person.name} has called the lift from floor ${person.originFloor}.`
    this.appendText(text)
  }
  log() {
    floorDom.forEach(floor => floor.style.backgroundColor = '#d6d6d6')
    floorDom[this.floor].style.backgroundColor = '#1dbcad'
    let text = `Direction: ${this.direction} | Floor: ${this.floor}`
    this.appendText(text)
  }
  appendText(text) {
    let node = document.createElement("p");
    let textnode = document.createTextNode(text);
    node.appendChild(textnode);
    liftExplanation.appendChild(node);
  }
}

let floor0 = document.getElementById('0')
let floor1 = document.getElementById('1')
let floor2 = document.getElementById('2')
let floor3 = document.getElementById('3')
let floor4 = document.getElementById('4')
let floor5 = document.getElementById('5')
let floor6 = document.getElementById('6')
let floor7 = document.getElementById('7')
let floor8 = document.getElementById('8')
let floor9 = document.getElementById('9')
let floor10 = document.getElementById('10')
let liftExplanation = document.getElementById('lift-explanation')


floor0.style.backgroundColor = '#1dbcad'

let floorDom = [floor0, floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9, floor10]

let elevator = new Lift();

function call(e) {
  elevator.start()
  let name = prompt('Welcome to the lift. What is your name?')
  let originFloor = Number(e.target.id)
  let destinationFloor = Number(prompt('What floor are you going?'))
  if(!destinationFloor) destinationFloor = originFloor;
  if(!name) name = 'Anonymous'
  let person = new Person(name, originFloor, destinationFloor);
  elevator.call(person)
}

floorDom.forEach(floor => floor.onclick = call)
