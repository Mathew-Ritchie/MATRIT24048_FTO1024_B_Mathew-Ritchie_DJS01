const ACCELERATION_CONVERSION_FACTOR = 3.6; //convert m/s^2 to km/h^2
const TIME_CONVERSION_FACTOR = 3600; //convert seconds to hours

// Given Parameters
const initialVelocityKmHour = {
  value: 10000,
  measurement: "km/h",
};
const accelerationMetersSecondSquared = {
  value: 3,
  measurement: "m/s^2",
};
const timeAsSeconds = {
  value: 3600,
  measurement: "seconds",
};
const initialDistanceKm = {
  value: 0,
  measurement: "km",
};
const initialFuelKg = {
  value: 5000,
  measurement: "kg",
};
const fuelBurnRateKgSecond = {
  value: 0.5,
  measurement: "kg/s",
};

const calcNewDistance = (props) => {
  const { initialDistanceKm, initialVelocityKmHour, timeAsSeconds } = props;

  if (typeof initialDistanceKm.value !== "number" || initialDistanceKm.measurement !== "km")
    throw new Error('"initialDistanceKm" error, either no value or incorrect measuring unit');
  if (
    typeof initialVelocityKmHour.value !== "number" ||
    initialVelocityKmHour.measurement !== "km/h"
  )
    throw new Error('velocity" error, either no value or incorrect measuring unit');
  if (typeof timeAsSeconds.value !== "number" || timeAsSeconds.measurement !== "seconds")
    throw new Error('"TimeAsSeconds" error, either no value or incorrect measuring unit');

  const timeAsHours =
    timeAsSeconds.measurement === "seconds"
      ? timeAsSeconds.value / TIME_CONVERSION_FACTOR
      : console.error("Time not given in seconds");

  return initialDistanceKm.value + initialVelocityKmHour.value * timeAsHours;
};

// Pick up an error with how the function below is called and make it robust to such errors

const calcNewVelocity = (props) => {
  const { acceleration, time, velocity } = props;
  //const { value, measurement } = velocity;
  //console.log(props);
  if (typeof acceleration.value !== "number" || acceleration.measurement !== "m/s^2")
    throw new Error('"Acceleration" error, either no value or incorrect measuring unit');
  if (typeof time.value !== "number" || time.measurement !== "seconds")
    throw new Error('time" error, either no value or incorrect measuring unit');
  if (typeof velocity.value !== "number" || velocity.measurement !== "km/h")
    throw new Error('"velocity" error, either no value or incorrect measuring unit');

  const velocityAsMetersSeconds =
    velocity.measurement === "km/h"
      ? velocity.value / ACCELERATION_CONVERSION_FACTOR
      : console.error("Velocity not km/h");
  //console.log(velocityAsMetersSeconds);
  return (
    (velocityAsMetersSeconds + acceleration.value * time.value) * ACCELERATION_CONVERSION_FACTOR
  );
};

const calcRemainingFuel = (props) => {
  const { initialFuelKg, fuelBurnRateKgSecond, timeAsSeconds } = props;

  if (typeof initialFuelKg.value !== "number" || initialFuelKg.measurement !== "kg")
    throw new Error('"initial fuel" error, either no value or incorrect measuring unit');
  if (typeof fuelBurnRateKgSecond.value !== "number" || fuelBurnRateKgSecond.measurement !== "kg/s")
    throw new Error('fuel burn rate" error, either no value or incorrect measuring unit');
  if (typeof timeAsSeconds.value !== "number" || timeAsSeconds.measurement !== "seconds")
    throw new Error('"time" error, either no value or incorrect measuring unit');

  return initialFuelKg.value - fuelBurnRateKgSecond.value * timeAsSeconds.value;
};

const newVelocity = calcNewVelocity({
  acceleration: accelerationMetersSecondSquared,
  time: timeAsSeconds,
  velocity: initialVelocityKmHour,
}); //calculates new velocity based on acceleration

const newDistance = calcNewDistance({
  initialDistanceKm: initialDistanceKm,
  initialVelocityKmHour: initialVelocityKmHour,
  timeAsSeconds: timeAsSeconds,
});

const remainingFuel = calcRemainingFuel({
  initialFuelKg: initialFuelKg,
  fuelBurnRateKgSecond: fuelBurnRateKgSecond,
  timeAsSeconds: timeAsSeconds,
});

console.log(`Corrected New Velocity: ${newVelocity} km/h`);
console.log(`Corrected New Distance: ${newDistance} km`);
console.log(`Corrected Remaining Fuel: ${remainingFuel} kg`);
