import { Router } from "express";
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController";
import auth from "../middleware/auth";

const router = Router();

// get all workouts
router.get("/", [auth], getWorkouts);

// get a single workout
router.get("/:id", [auth], getWorkout);

// post a new workout
router.post("/", [auth], createWorkout);

// delete a workout
router.delete("/:id", [auth], deleteWorkout);

// update a workout
router.patch("/:id", [auth], updateWorkout);

export default router;
