package com.brianapowers.repandrepeat;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/workouts")

public class WorkoutController {

    private final WorkoutRepository workoutRepository;

    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }
    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable Long id) {
        return workoutRepository.findById(id).orElse(null);
    }
    @PutMapping("/{id}")
    public Workout updateWorkout(@PathVariable Long id, @RequestBody Workout updatedWorkout) {
        return workoutRepository.findById(id)
                .map(workout -> {
                    workout.setName(updatedWorkout.getName());
                    workout.setWorkoutType(updatedWorkout.getWorkoutType());
                    workout.setDuration(updatedWorkout.getDuration());
                    workout.setMoodBefore(updatedWorkout.getMoodBefore());
                    workout.setMoodAfter(updatedWorkout.getMoodAfter());

                    return workoutRepository.save(workout);

                })
                .orElse(null);
    }
    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        workoutRepository.deleteById(id);
    }
    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {
        return workoutRepository.save(workout);
    }
}


