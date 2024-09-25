import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//date fns
import formartDistanceNow from "date-fns/formatDistanceToNow";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async (id) => {
    const response = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load(kg): {workout.load}</strong>
      </p>
      <p>
        <strong>Reps: {workout.load}</strong>
      </p>
      <p>
        {formartDistanceNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span
        className="material-symbols-outlined"
        onClick={() => handleClick(workout?._id)}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
