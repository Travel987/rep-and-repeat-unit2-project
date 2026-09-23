function ExerciseCard({ exercise, index, imageSrc }) {
    return (
        <div className={`exercise-item exercise-card-${index % 3}`}>
            <div className="exercise-thumbnail">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={`${exercise.name} demonstration`}
                    />
                ) : (
                    <span>🏋️</span>
                )}
            </div>

            <div className="exercise-info">
                <strong>{exercise.name}</strong>
                <span>
          {exercise.sets} × {exercise.reps} • {exercise.weight} lbs
        </span>
            </div>

            <div className="exercise-number">
                {String(index + 1).padStart(2, "0")}
            </div>
        </div>
    );
}

export default ExerciseCard;