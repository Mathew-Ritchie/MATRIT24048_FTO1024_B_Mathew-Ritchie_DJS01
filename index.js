/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result, it throws an error to the user if something has gone wrong (parameter used with an incorrect unit of measurement, etc)
 */

const accelerationConversionFactor = 3.6;

// Given Parameters
const initialVelocity = {
  value: 10000,
  measurement: "km/h",
}; // velocity (km/h)
const acceleration = 3; // acceleration (m/s^2)
const timeAsSeconds = 3600; // seconds (1 hour)
const initialDistance = 0; // distance (km)
const initialFuel = 5000; // remaining fuel (kg)
const fuelBurnRate = 0.5; // fuel burn rate (kg/s)

const timeAsHour = timeAsSeconds / 60 / 60;

const newDistance = initialDistance + initialVelocity.value * timeAsHour; //calcultes new distance
const remainingFuel = initialFuel - fuelBurnRate * timeAsSeconds; //calculates remaining fuel

// Pick up an error with how the function below is called and make it robust to such errors

const calcNewVel = (props) => {
  const { acceleration, time, velocity } = props;
  const { value, measurement } = velocity;
  console.log(props);
  if (!acceleration) throw new Error('"Acceleration" not added');
  if (!time) throw new Error('"time" in seconds not added');
  if (!velocity) throw new Error('"initial" velocity not added');
  if (!value) throw new Error('"Value" not added');
  if (!measurement) throw new Error('"Measurement" not added');

  if (measurement !== "km/h") {
    throw new Error('"measurement" is required to be in "km/h"');
  }

  const velocityAsMetersSeconds =
    measurement === "km/h"
      ? value / accelerationConversionFactor
      : console.error("Velocity not km/h");
  console.log(velocityAsMetersSeconds);
  return (velocityAsMetersSeconds + acceleration * time) * accelerationConversionFactor;
};

// const calcNewVel = (initialVelocity, acceleration, timeAsSeconds) => {
//   initialVelocity = initialVelocity * (1000 / 1) * (1 / 3600);

//   initialVelocity = initialVelocity + acceleration * timeAsSeconds;

//   return initialVelocity * (timeAsSeconds / 1) * (1 / 1000);
// };

const newVelocity = calcNewVel({
  acceleration: acceleration,
  time: timeAsSeconds,
  velocity: initialVelocity,
}); //calculates new velocity based on acceleration

console.log(`Corrected New Velocity: ${newVelocity} km/h`);
console.log(`Corrected New Distance: ${newDistance} km`);
console.log(`Corrected Remaining Fuel: ${remainingFuel} kg`);
