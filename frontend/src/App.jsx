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
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");
  const [exerciseReps, setExerciseReps] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [exercises, setExercises] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const [selectedVibe, setSelectedVibe] = useState("locked");
  const [mixSelected, setMixSelected] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

    const vibeSongs = {
        locked: {
            title: "The Language",
            artist: "Drake",
            mix: "Late Night Lift",
            spotifyId: "6df0bdSOGYU6NHZWlEcHXP"
        },
        high: {
            title: "Higher",
            artist: "Eminem",
            mix: "High Energy",
            spotifyId: "1wwnN2wOvZOsPp4Nh8E4i3"
        },
        calm: {
            title: "We Are the People",
            artist: "Empire of the Sun",
            mix: "Calm Focus",
            spotifyId: "57RHMnLMQx8Qz5V6c0E8dF"
        }
    };

    const currentSong = vibeSongs[selectedVibe];
    useEffect(() => {
        const searchTerm = encodeURIComponent(
            `${currentSong.artist} ${currentSong.title}`
        );

        fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                setPreviewUrl(data.results[0]?.previewUrl || "");
            })
            .catch((error) => {
                console.error("Music preview error:", error);
                setPreviewUrl("");
            });
    }, [selectedVibe]);

  useEffect(() => {
    fetch("http://localhost:8080/api/workouts")
        .then((response) => response.json())
        .then((data) => setWorkouts(data))
        .catch((error) => console.error("Error:", error));
  }, []);

    const handleAddExercise = () => {
        if (!exerciseName || !exerciseSets || !exerciseReps || !exerciseWeight) {
            alert("Please complete all exercise fields.");
            return;
        }

        const newExercise = {
            name: exerciseName,
            sets: Number(exerciseSets),
            reps: Number(exerciseReps),
            weight: Number(exerciseWeight)
        };

        setExercises([...exercises, newExercise]);

        setExerciseName("");
        setExerciseSets("");
        setExerciseReps("");
        setExerciseWeight("");
    };

  const handleSubmit = (e) => {
      e.preventDefault();
      if ( !moodBefore || !moodAfter) {
          alert("Please select both Mood Before and Mood After.");
          return;
      }

      const newWorkout = {
          name: name,
          workoutType: workoutType,
          duration: Number(duration),
          moodBefore: Number(moodBefore),
          moodAfter: Number(moodAfter),
          exercises: exercises

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
              setExercises([]);
          });
  };

  const handleEdit = (workout) => {
      setActivePage("workouts");
      setEditingId(workout.id);
      setName(workout.name);
      setWorkoutType(workout.workoutType);
      setDuration(workout.duration);
      setMoodBefore(workout.moodBefore);
      setMoodAfter(workout.moodAfter);
      setExercises(workout.exercises || []);
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

    const getMoodEmoji = (mood) => {
        const value = Number(mood);

        const moods = {
            1: "😫",
            2: "😕",
            3: "😐",
            4: "🙂",
            5: "😄"
        };

        return moods[value] || "—";
    };

    const todaysWorkout =
        [...workouts].reverse().find((workout) => workout.exercise?.lenght > 0)
    || workouts[workouts.length - 1];

  return (
      <div className="app">
          <aside className="sidebar">
              <div className="logo">
                  <span>REP</span>
                  <small>& REPEAT</small>
              </div>

              <nav>
                  <button
                      type="button"
                      className={`nav-item ${activePage === "home" ? "active" : ""}`}
                      onClick={() => setActivePage("home")}
                  >
                      ⌂ Home
                  </button>

                  <button
                      type="button"
                      className={`nav-item ${activePage === "workouts" ? "active" : ""}`}
                      onClick={() => setActivePage("workouts")}
                  >
                      ▣ Workouts
                  </button>

                  <button
                      type="button"
                      className={`nav-item ${activePage === "history" ? "active" : ""}`}
                      onClick={() => setActivePage("history")}
                  >
                      ↻ History
                  </button>

                  <button
                      type="button"
                      className={`nav-item ${activePage === "music" ? "active" : ""}`}
                      onClick={() => setActivePage("music")}
                  >
                      ♫ Music
                  </button>
              </nav>
          </aside>
          <main className="main-content">

              <div className="page-header">
                  {activePage === "home" && (
                      <>
                          <p className="eyebrow">TONIGHT IS YOURS</p>
                          <h1>Time to put in WORK.</h1>
                      </>
                  )}
                  {activePage === "home" && (
                      <div className="home-dashboard">
                          <h2>Set the mood</h2>
                          <p>How are you feeling?</p>

                          <div className="mood-picker">
                              <button
                                  type="button"
                                  className={moodBefore === "1" ? "selected-mood" : ""}
                                  onClick={() => setMoodBefore("1")}
                              >
                                  🥱
                              </button>

                              <button
                                  type="button"
                                  className={moodBefore === "2" ? "selected-mood" : ""}
                                  onClick={() => setMoodBefore("2")}
                              >
                                  😩
                              </button>

                              <button
                                  type="button"
                                  className={moodBefore === "3" ? "selected-mood" : ""}
                                  onClick={() => setMoodBefore("3")}
                              >
                                  😐
                              </button>

                              <button
                                  type="button"
                                  className={moodBefore === "4" ? "selected-mood" : ""}
                                  onClick={() => setMoodBefore("4")}
                              >
                                  😤
                              </button>

                              <button
                                  type="button"
                                  className={moodBefore === "5" ? "selected-mood" : ""}
                                  onClick={() => setMoodBefore("5")}
                              >
                                  🔥
                              </button>

                          </div>

                          {workouts.length > 0 && (
                              <div className="home-workout-card">
                                  <p>TODAY'S WORKOUT</p>

                                  <h2>{todaysWorkout.name}</h2>

                                  <p>
                                      {todaysWorkout.exercises?.length || 0}{" "}
                                      {todaysWorkout.exercises?.length === 1 ? "exercise" : "exercises"}
                                      {" • "}
                                      {todaysWorkout.duration} min
                                  </p>

                                  <button
                                      type="button"
                                      onClick={() => setActivePage("workouts")}
                                  >
                                      START SESSION
                                  </button>
                              </div>
                          )}

                      </div>
                      )}
                  {activePage === "home" && (
                      <p className="subtext">
                          You showed up. Now go earn that stronger version of you.
                      </p>
                  )}
              </div>
              {activePage === "workouts" && (
                  <>
              <h2 className="section-title">Log a Workout</h2>
              <h2 className="section-title">My Workouts</h2>
          <form className="workout-form" onSubmit={handleSubmit}>

          <input
              type="text"
              placeholder="Workout"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          <input
              type="text"
              placeholder="Type"
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
          />
          <input
              type="number"
              placeholder="Minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
          />
              <div className="exercise-builder">
                  <input
                      type="text"
                      placeholder="Exercise"
                      value={exerciseName}
                      onChange={(e) => setExerciseName(e.target.value)}
                  />
                  <input
                      type="number"
                      placeholder="Sets"
                      value={exerciseSets}
                      onChange={(e) => setExerciseSets(e.target.value)}
                  />

                  <input
                      type="number"
                      placeholder="Reps"
                      value={exerciseReps}
                      onChange={(e) => setExerciseReps(e.target.value)}
                  />

                  <input
                      type="number"
                      placeholder="Weight"
                      value={exerciseWeight}
                      onChange={(e) => setExerciseWeight(e.target.value)}
                  />

                  <button type="button" onClick={handleAddExercise}>
                      + Add Exercise
                  </button>
              </div>
              {exercises.length > 0 && (
                  <div className="exercise-list">
                      <h3>Exercise Queue</h3>

                      {exercises.map((exercise, index) => (
                          <div className="exercise-item" key={index}>
                              <strong>{index + 1}. {exercise.name}</strong>
                              <span>
                    {exercise.sets} × {exercise.reps} • {exercise.weight} lbs
                </span>
                          </div>
                      ))}
                  </div>
              )}
              <div className="mood-section">
                  <span>Mood Before</span>
                  <div className="mood-picker">

                  <button type="button"
                          className={moodBefore === "1" ? "selected-mood" : ""}
                          onClick={() => setMoodBefore("1")}
                  >🥱
                  </button>
                  <button type="button"
                          className={moodBefore === "2" ? "selected-mood" : ""}
                          onClick={() => setMoodBefore("2")}
                  >😩
                  </button>
                  <button type="button"
                          className={moodBefore === "3" ? "selected-mood" : ""}
                          onClick={() => setMoodBefore("3")}
                  >😐
                  </button>
                      <button
                          type="button"
                          className={moodBefore === "4" ? "selected-mood" : ""}
                          onClick={() => setMoodBefore("4")}
                      >
                          😤
                      </button>

                      <button
                          type="button"
                          className={moodBefore === "5" ? "selected-mood" : ""}
                          onClick={() => setMoodBefore("5")}
                      >
                          🔥
                      </button>

                  </div>
              </div>
              <div className="mood-section">
                  <span>Mood After</span>
                  <div className="mood-picker">
                  <button
                      type="button"
                      className={moodAfter === "1" ? "selected-mood" : ""}
                      onClick={() => setMoodAfter("1")}
                  >
                      😵‍💫
                  </button>

                  <button
                      type="button"
                      className={moodAfter === "2" ? "selected-mood" : ""}
                      onClick={() => setMoodAfter("2")}
                  >
                      😮‍💨
                  </button>

                  <button
                      type="button"
                      className={moodAfter === "3" ? "selected-mood" : ""}
                      onClick={() => setMoodAfter("3")}
                  >
                      🙂
                  </button>

                  <button
                      type="button"
                      className={moodAfter === "4" ? "selected-mood" : ""}
                      onClick={() => setMoodAfter("4")}
                  >
                      💪
                  </button>

                  <button
                      type="button"
                      className={moodAfter === "5" ? "selected-mood" : ""}
                      onClick={() => setMoodAfter("5")}
                  >
                      🤩
                  </button>
              </div>
              </div>
              <button type="submit">
                  Log Workout
              </button>
      </form>
                      </>
              )}
                      {activePage === "history" && (
                          <>
                              <h1>Look at you putting in WORK.</h1>
                              <h2>Recent Workouts</h2>

                              {workouts.map((workout) => (
                                  <div className="workout-card" key={workout.id}>
                                      <h3>{workout.name}</h3>
                                      <p>Type: {workout.workoutType}</p>
                                      <p>Duration: {workout.duration} minutes</p>
                                      <p>Mood Before: {getMoodEmoji(workout.moodBefore)}</p>
                                      <p>Mood After: {getMoodEmoji(workout.moodAfter)}</p>

                                      <button onClick={() => handleEdit(workout)}>Edit</button>
                                      <button onClick={() => handleDelete(workout.id)}>Delete</button>
                                  </div>
                              ))}
                          </>
                      )}

              {activePage === "music" && (
                  <div className="music-page">
                      <p className="eyebrow">BRING THE ENERGY</p>
                      <h1>Turn it UP.</h1>
                      <p className="subtext">
                          Choose the soundtrack that makes you feel unstoppable.
                      </p>

                      <div className="music-layout">

                          <div className="vibe-panel">
                              <h2>Choose your workout vibe</h2>
                              <p>Your choice shapes the suggested mix.</p>

                              <button
                                  type="button"
                                  className={`vibe-option ${selectedVibe === "locked" ? "selected-vibe" : ""}`}
                                  onClick={() => {
                                      setSelectedVibe("locked");
                                      setMixSelected(false);
                                  }}
                              >
                                  <strong>LOCKED IN</strong>
                                  <span>Focused bars + heavy bass</span>
                              </button>

                              <button
                                  type="button"
                                  className={`vibe-option ${selectedVibe === "high" ? "selected-vibe" : ""}`}
                                  onClick={() => {
                                      setSelectedVibe("high");
                                      setMixSelected(false);
                                  }}
                              >
                                  <strong>HIGH ENERGY</strong>
                                  <span>Fast tempo + big hooks</span>
                              </button>

                              <button
                                  type="button"
                                  className={`vibe-option ${selectedVibe === "calm" ? "selected-vibe" : ""}`}
                                  onClick={() => {
                                      setSelectedVibe("calm");
                                      setMixSelected(false);
                                  }}
                              >
                                  <strong>CALM FOCUS</strong>
                                  <span>Smooth rhythm + steady pace</span>
                              </button>

                              <button
                                  type="button"
                                  className="use-mix-button"
                                  onClick={() => setMixSelected(true)}
                              >
                                  {mixSelected ? "✓ MIX SELECTED" : "USE THIS MIX"}
                              </button>
                          </div>

                          <div className="now-playing-panel">
                              <p className="eyebrow">NOW PLAYING</p>

                              <div className="album-placeholder">
                                  R&R
                              </div>

                              <h2>{currentSong.title}</h2>
                              <p>{currentSong.artist} • {currentSong.mix}</p>

                              {previewUrl ? (
                                  <audio
                                      key={previewUrl}
                                      controls
                                      src={previewUrl}
                                  />
                              ) : (
                                  <p>Preview unavailable</p>
                              )}
                          </div>

                      </div>
                  </div>
              )}
          </main>
          </div>
          );
          }

export default App;