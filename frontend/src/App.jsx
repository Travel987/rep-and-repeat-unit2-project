import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
  const [editingId, setEditingId] = useState(null);




  useEffect(() => {
    fetch("http://localhost:8080/api/workouts")
        .then((response) => response.json())
        .then((data) => setWorkouts(data))
        .catch((error) => console.error("Error:", error));
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();

      const newWorkout = {
          name: name,
          workoutType: workoutType,
          duration: Number(duration),
          moodBefore: Number(moodBefore),
          moodAfter: Number(moodAfter)

      };

      fetch(
          editingId
              ? `http://localhost:8080/api/workouts/${editingId}`
              : "http://localhost:8080/api/workouts",
          {
              method: editingId ? "PUT" : "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newWorkout)
      })
          .then((response) => response.json())
          .then((savedWorkout) => {
              if (editingId) {
                  setWorkouts(
                      workouts.map((workout) =>
                          workout.id === editingId ? savedWorkout : workout
                      )
                  );
              } else {
                  setWorkouts([...workouts, savedWorkout]);
              }
              setName("");
              setWorkoutType("");
              setDuration("");
              setMoodBefore("");
              setMoodAfter("");
              setEditingId(null);
          });
  };

  const handleEdit = (workout) => {
      setEditingId(workout.id);
      setName(workout.name);
      setWorkoutType(workout.workoutType);
      setDuration(workout.duration);
      setMoodBefore(workout.moodBefore);
      setMoodAfter(workout.moodAfter);
  };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/workouts/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Delete failed");
                }

                setWorkouts((currentWorkouts) =>
                    currentWorkouts.filter((workout) => workout.id !== id)
                );
            })
            .catch((error) => {
                console.error("Delete error:", error);
            });
    };


  return (
      <div>
        <h1>Rep & Repeat</h1>
          <h2>Log a Workout</h2>
        <h2>My Workouts</h2>
          <form onSubmit={handleSubmit}>

          <input
              type="text"
              placeholder="Workout Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              />
          <input
              type="text"
              placeholder="Workout Type"
              value={workoutType}
              required
              onChange={(e) => setWorkoutType(e.target.value)}
          />
          <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              min="1"
              required
              onChange={(e) => setDuration(e.target.value)}
          />
          <input
              type="number"
              placeholder="Mood Before (1-10)"
              value={moodBefore}
              min="1"
              max="10"
              required
              onChange={(e) => setMoodBefore(e.target.value)}
          />
          <input
              type="number"
              placeholder="Mood After (1-10)"
              value={moodAfter}
              min="1"
              max="10"
              required
              onChange={(e) => setMoodAfter(e.target.value)}
          />
              <button type="submit">
                  Log Workout
              </button>
      </form>


        {workouts.map((workout) => (
            <div key={workout.id}>
              <h3>{workout.name}</h3>
              <p>Type: {workout.workoutType}</p>
              <p>Duration: {workout.duration} minutes</p>
              <p>Mood Before: {workout.moodBefore}</p>
              <p>Mood After: {workout.moodAfter}</p>
                <button onClick={() => handleEdit(workout)}>
                Edit
                </button>
                <button onClick={() => handleDelete(workout.id)}>
                    Delete
                </button>
            </div>
        ))}
      </div>
  );
}

export default App;