function MoodButton({ mood, selectedMood, onSelect, children }) {
    return (
        <button
            type="button"
            aria-pressed={selectedMood === mood}
            className={selectedMood === mood ? "selected-mood" : ""}
            onClick={() => onSelect(mood)}
        >
            {children}
        </button>
    );
}

export default MoodButton;