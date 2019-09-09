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
    this.lastFloor = floorDom[0];
    this.historyPass = [];
  }
  start() {
    this.updateInterval = setInterval(() => this.update(), 1000);
  }
  stop() {
    clearInterval(this.updateInterval)
  }
  update() {
    if(!this.requests.length) {
      this.stop();
    } else {
      this.setDirection();
      this.updateFloor();
      this._passengersEnter();
      this._passengersLeave();
      this._deleteRequests();
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
    if(this.waitingList.length > 0) {
      for(let i = this.waitingList.length - 1; i >= 0; i--) {
        if(this.floor === this.waitingList[i].originFloor) {
    floorDom[this.floor].style.color = ''
    console.log(floorDom[this.floor])
          let text = `${this.waitingList[i].name} has entered the lift in floor ${this.waitingList[i].originFloor} to floor ${this.waitingList[i].destinationFloor}.`
          this.renderAccions(text, liftExplanation)
          this.passengers.push(this.waitingList[i])
          this.requests.push(this.waitingList[i].destinationFloor)
          this.waitingList.splice(i, 1);
          this.renderPassengers()
        }
      }
    }
  }
  _passengersLeave() {
    if(this.passengers.length > 0) {
      for(let i = this.passengers.length - 1; i >= 0; i--) {
        if (this.floor === this.passengers[i].destinationFloor) {
          let text = `${this.passengers[i].name} has left the lift.`
          this.renderAccions(text, liftExplanation)
          this.passengers.splice(i, 1);
          this.renderPassengers()
        }
      }
    }
  }
  _deleteRequests() {
    for(let i = this.requests.length - 1; i >= 0; i--) {
      if (this.floor === this.requests[i]) {
        this.requests.splice(i, 1);
      }
    }
  }
  floorUp(){
    this.floor = this.floor < this.MAXFLOOR ? this.floor + 1 : this.MAXFLOOR;
  }

  floorDown(){
    this.floor = this.floor > 0 ? this.floor - 1 : 0;
  }
  callElevator(person) {
    this.waitingList = [...this.waitingList, person]
    this.historyPass.push(person.name)
    this.requests = [...this.requests, person.originFloor]
    let text = `${person.name} has called the lift from floor ${person.originFloor}.`
    this.renderAccions(text, liftExplanation)
    this.renderPassengers()
  }
  updateFloor() {
    // set the color of the previous floor
    this.lastFloor.style.backgroundColor = '#5aa4ff'
    this.lastFloor.style.border = ''
    floor0.style.backgroundColor = '#009688'
    // set the color of the current floor
    this.currentFloor = floorDom[this.floor]
    this.currentFloor.style.backgroundColor = '#ac74b6'
    this.currentFloor.style.border = '1px solid #4a4848'
    // display the message
    this.renderAccions(`Direction: ${this.direction} | Floor: ${this.floor}`, liftExplanation)
    // set the last floor as the current one to update it properly in the next update
    this.lastFloor = this.currentFloor
  }
  renderAccions(text, domElem) {
    let node = document.createElement("p");
    let textnode = document.createTextNode(text);
    node.appendChild(textnode);
    domElem.appendChild(node);
  }
  renderPassengers() {
    let nameCurrentPassengers = [];
    this.passengers.forEach(passenger => nameCurrentPassengers.push(passenger.name));
    currentPassengers.innerHTML = nameCurrentPassengers.join(', ');

    let nameWaitingPassengers = [];
    this.waitingList.forEach(passenger => nameWaitingPassengers.push(passenger.name));
    waitingPassengers.innerHTML = nameWaitingPassengers.join(', ');

    historyPassengers.innerHTML = this.historyPass.join(', ');
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
let currentPassengers = document.getElementById('current-passengers')
let waitingPassengers = document.getElementById('waiting-passengers')
let historyPassengers = document.getElementById('history-passengers')

//floor0.style.backgroundColor = '#a3a3a3'

let floorDom = [floor0, floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9, floor10]

let elevator = new Lift();

function callElevator(e) {
  e.target.style.color = 'white'
  elevator.start()
  let name = prompt('Welcome to the lift. What is your name?')
  let originFloor = Number(e.target.id)
  let destinationPrompt = prompt('Which floor are you going?')
  if(destinationPrompt === '') destinationPrompt = originFloor;
  let destinationFloor = Number(destinationPrompt)
  if(!name) name = 'Anonymous'
  let person = new Person(name, originFloor, destinationFloor);
  elevator.callElevator(person)
}

floorDom.forEach(floor => floor.onclick = callElevator)
