import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import bicepCurlGif from "./assets/exercises/bicep-curl.gif";
import shoulderPressGif from "./assets/exercises/shoulder-press.gif";
import skullCrushersGif from "./assets/exercises/skull-crushers.gif";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import MoodButton from "./components/MoodButton";
import WorkoutCard from"./components/WorkoutCard";
import ExerciseCard from "./components/ExerciseCard";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formError, setFormError] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [workoutType, setWorkoutType] = useState("Strength");
  const [duration, setDuration] = useState("45");
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");
  const [exerciseReps, setExerciseReps] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [exercises, setExercises] = useState([]);
    const activePage =
        location.pathname === "/" ? "home" : location.pathname.slice(1);
    const setActivePage = (page) => {
        navigate(page === "home" ? "/" : `/${page}`);
    };
  const [selectedVibe, setSelectedVibe] = useState("locked");
  const [mixSelected, setMixSelected] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);


    const exerciseImages = {
        "bicep curl": bicepCurlGif,
        "shoulder press": shoulderPressGif,
        "skull crushers": skullCrushersGif,
    };

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
    const togglePlay = () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    const formatTime = (time) => {
        if (!time || Number.isNaN(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    useEffect(() => {
        const searchTerm = encodeURIComponent(
            `${currentSong.artist} ${currentSong.title}`
        );

        fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                const song = data.results[0];

                setPreviewUrl(song?.previewUrl || "");
                setArtworkUrl(
                    song?.artworkUrl100?.replace("100x100bb", "600x600bb") || ""
                );
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
            setFormError("Please complete all exercise fields.");
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
      if (!moodAfter) {
          setFormError("Please select Mood After.");
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

    const getMoodBeforeEmoji = (mood) => {
        const moods = {
            1: "🫩",
            2: "😩",
            3: "😐",
            4: "😊",
            5: "🤪",
        };

        return moods[Number(mood)] || "—";
    };

    const getMoodAfterEmoji = (mood) => {
        const moods = {
            1: "😮‍💨",
            2: "😅",
            3: "🙂",
            4: "💪🏽",
            5: "🤩",
        };

        return moods[Number(mood)] || "—";
    };

    const todaysWorkout =
        [...workouts].reverse().find((workout) => workout.exercise?.lenght > 0)
    || workouts[workouts.length - 1];

  return (
      <div className="app">
          {previewUrl && (
          <audio
              ref={audioRef}
              key={previewUrl}
              src={previewUrl}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={(event) =>
                  setCurrentTime(event.currentTarget.currentTime)
              }
              onLoadedMetadata={(event) =>
                  setAudioDuration(event.currentTarget.duration)
              }
              onEnded={() => setIsPlaying(false)}
          />
          )}
          <Sidebar
              activePage={activePage}
              setActivePage={setActivePage}
          />
          <main className="main-content">

              <div className="page-header">
                  {activePage === "home" && (
                      <>
                          <p className="eyebrow">TONIGHT IS YOURS</p>
                          <h1>Time to put in WORK.</h1>
                          <p className="subtext">
                              You showed up. Now go earn that stronger version of you.
                          </p>
                      </>
                  )}
                  {activePage === "home" && (
                      <div className="home-dashboard">

                          <WorkoutCard
                              workouts={workouts}
                              todaysWorkout={todaysWorkout}
                              onStart={() => setActivePage("workouts")}
                          />
                          <div className="home-mood-card">
                              <h2>Set the mood</h2>
                              <p>How are you feeling?</p>

                              <div className="mood-picker">
                                  <MoodButton
                                      mood="1"
                                      selectedMood={moodBefore}
                                      onSelect={setMoodBefore}
                                  >
                                      🫩
                                  </MoodButton>

                                  <MoodButton
                                      mood="2"
                                      selectedMood={moodBefore}
                                      onSelect={setMoodBefore}
                                  >
                                      😒
                                  </MoodButton>

                                  <MoodButton
                                      mood="3"
                                      selectedMood={moodBefore}
                                      onSelect={setMoodBefore}
                                  >
                                      😐
                                  </MoodButton>

                                  <MoodButton
                                      mood="4"
                                      selectedMood={moodBefore}
                                      onSelect={setMoodBefore}
                                  >
                                      😊
                                  </MoodButton>

                                  <MoodButton
                                      mood="5"
                                      selectedMood={moodBefore}
                                      onSelect={setMoodBefore}
                                  >
                                      🤪
                                  </MoodButton>
                              </div>
                              </div>

                      </div>
                  )}
              </div>
              {activePage === "workouts" && (
                  <>
                      <div className="workouts-header">
                          <p className="eyebrow">BUILD THE WIN</p>
                          <h1>Create your next victory.</h1>
                          <p className="workouts-subtitle">
                              Pick the moves. Set the challenge. Make it yours.
                          </p>
                      </div>
          <form className="workout-form" onSubmit={handleSubmit}>
              {formError && (
                  <p className="form-error">{formError}</p>
              )}

              <div className="session-panel">
                  <h2>Session details</h2>
                  <input
                      type="text"
                      placeholder="Workout"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

              </div>
              <div className="queue-panel">
                  <h2>Exercise queue</h2>
              {exercises.length > 0 && (
                  <div className="exercise-list">
                      {exercises.map((exercise, index) => (
                      <ExerciseCard
                          key={index}
                          exercise={exercise}
                          index={index}
                          imageSrc={exerciseImages[exercise.name.toLowerCase()]}
                      />
                      ))}
              </div>
              )}
              </div>
              <div className="mood-section">
                  <span>Mood After</span>
                  <div className="mood-picker">
                      <MoodButton
                          mood="1"
                          selectedMood={moodAfter}
                          onSelect={setMoodAfter}
                      >
                          😮‍💨
                      </MoodButton>

                      <MoodButton
                          mood="2"
                          selectedMood={moodAfter}
                          onSelect={setMoodAfter}
                      >
                          😅
                      </MoodButton>

                      <MoodButton
                          mood="3"
                          selectedMood={moodAfter}
                          onSelect={setMoodAfter}
                      >
                          🙃
                      </MoodButton>

                      <MoodButton
                          mood="4"
                          selectedMood={moodAfter}
                          onSelect={setMoodAfter}
                      >
                          💪🏽
                      </MoodButton>

                      <MoodButton
                          mood="5"
                          selectedMood={moodAfter}
                          onSelect={setMoodAfter}
                      >
                          🤩
                      </MoodButton>
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
                                      {workout.exercises?.map((exercise, index) => (
                                          <p key={index}>
                                              {exercise.name} — {exercise.sets} × {exercise.reps} • {exercise.weight} lbs
                                          </p>
                                      ))}
                                      <p>Mood Before: {getMoodBeforeEmoji(workout.moodBefore)}</p>
                                      <p>Mood After: {getMoodAfterEmoji(workout.moodAfter)}</p>

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
                                  {artworkUrl ? (
                                      <img
                                          src={artworkUrl}
                                          alt={`${currentSong.title} album cover`}
                                      />
                                  ) : (
                                      "R&R"
                                  )}
                              </div>

                              <h2>{currentSong.title}</h2>
                              <p>{currentSong.artist} • {currentSong.mix}</p>

                              {previewUrl ? (
                                          <>
                                              <div className="custom-player">
                                                  <button
                                                      type="button"
                                                      className="custom-play-button"
                                                      onClick={togglePlay}
                                                  >
                                                      {isPlaying ? "❚❚" : "▶"}
                                                  </button>

                                                  <span className="player-time">
                                                    {formatTime(currentTime)}
                                                        </span>

                                                  <div className="progress-track">
                                                      <div
                                                          className="progress-fill"
                                                          style={{
                                                              width: `${
                                                                  audioDuration
                                                                      ? (currentTime / audioDuration) * 100
                                                                      : 0
                                                              }%`
                                                          }}
                                                      />
                                                  </div>

                                                  <span className="player-time">
        {formatTime(audioDuration)}
    </span>
                                              </div>
                                              </>
                                  ) : (

                                          <p>Preview unavailable</p>
                                      )}
                          </div>

                      </div>
                  </div>
              )}
              <Footer/>
          </main>
          </div>
          );
          }

export default App;