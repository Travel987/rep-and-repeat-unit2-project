function MoodButton({ mood, selectedMood, onSelect, children }) {
    return (
        <button
            type="button"
            className={selectedMood === mood ? "selected-mood" : ""}
            onClick={() => onSelect(mood)}
        >
            {children}
        </button>
    );
}

export default MoodButton;