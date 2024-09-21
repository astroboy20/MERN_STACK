import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutsContext = ()=>{
    const context = useContext(WorkoutContext)
    if (!context){
        throw new Error("useWorkout must be used where it must be used")
    }
    return context
}