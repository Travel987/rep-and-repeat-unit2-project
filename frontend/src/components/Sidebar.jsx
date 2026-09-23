function Sidebar({ activePage, setActivePage }) {
    return (
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
                    ◔ History
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
    );
}

export default Sidebar;