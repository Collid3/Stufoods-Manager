import React from "react";

const CreateStoreHours = ({ newStore, setNewStore }) => {
  return (
    <div className="hours-container">
      <select
        value={newStore.hours.min}
        onChange={(e) =>
          setNewStore((prev) => {
            return { ...prev, hours: { ...prev.hours, min: e.target.value } };
          })
        }
      >
        <option value={"5am"}>5am</option>
        <option value={"6am"}>6am</option>
        <option value={"7am"}>7am</option>
        <option value={"8am"}>8am</option>
        <option value={"9am"}>9am</option>
        <option value={"10am"}>10am</option>
        <option value={"11am"}>11am</option>
        <option value={"12pm"}>12pm</option>
        <option value={"1pm"}>1pm</option>
        <option value={"2pm"}>2pm</option>
        <option value={"3pm"}>3pm</option>
        <option value={"4pm"}>4pm</option>
        <option value={"5pm"}>5pm</option>
        <option value={"6pm"}>6pm</option>
        <option value={"7pm"}>7pm</option>
        <option value={"8pm"}>8pm</option>
        <option value={"9pm"}>9pm</option>
        <option value={"10pm"}>10pm</option>
        <option value={"11pm"}>11pm</option>
        <option value={"12am"}>12am</option>
      </select>
      to
      <select
        value={newStore.hours.min}
        onChange={(e) =>
          setNewStore((prev) => {
            return { ...prev, hours: { ...prev.hours, max: e.target.value } };
          })
        }
      >
        <option value={"5am"}>5am</option>
        <option value={"6am"}>6am</option>
        <option value={"7am"}>7am</option>
        <option value={"8am"}>8am</option>
        <option value={"9am"}>9am</option>
        <option value={"10am"}>10am</option>
        <option value={"11am"}>11am</option>
        <option value={"12pm"}>12pm</option>
        <option value={"1pm"}>1pm</option>
        <option value={"2pm"}>2pm</option>
        <option value={"3pm"}>3pm</option>
        <option value={"4pm"}>4pm</option>
        <option value={"5pm"}>5pm</option>
        <option value={"6pm"}>6pm</option>
        <option value={"7pm"}>7pm</option>
        <option value={"8pm"}>8pm</option>
        <option value={"9pm"}>9pm</option>
        <option value={"10pm"}>10pm</option>
        <option value={"11pm"}>11pm</option>
        <option value={"12am"}>12am</option>
      </select>
    </div>
  );
};

export default CreateStoreHours;
