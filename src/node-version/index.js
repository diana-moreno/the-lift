const Lift = require('./lift.js');
const Person = require('./person.js');

let elevator = new Lift();
let diana = new Person('Diana', 0, 10);
let luis = new Person('Luis', 3, 6);
let yoli = new Person('Yoli', 4, 8);
let gerard = new Person('Gerard', 6, 8);

elevator.start()
/*elevator.call(luis)
elevator.call(yoli)*/
elevator.call(diana)
setTimeout(() => {elevator.call(gerard)}, 3000);
