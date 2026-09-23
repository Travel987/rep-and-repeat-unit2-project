function WorkoutCard({ workouts, todaysWorkout, onStart }) {
    return (
        <div className="home-workout-card">
            <p className="eyebrow">TODAY'S WORKOUT</p>

            {workouts.length > 0 ? (
                <>
                    <h2>{todaysWorkout.name}</h2>

                    <p>
                        {todaysWorkout.exercises?.length || 0}{" "}
                        {todaysWorkout.exercises?.length === 1
                            ? "exercise"
                            : "exercises"}
                    </p>

                    <button type="button" onClick={onStart}>
                        START SESSION
                    </button>
                </>
            ) : (
                <>
                    <h2>No workout yet</h2>

                    <button type="button" onClick={onStart}>
                        BUILD WORKOUT
                    </button>
                </>
            )}
        </div>
    );
}

export default WorkoutCard;