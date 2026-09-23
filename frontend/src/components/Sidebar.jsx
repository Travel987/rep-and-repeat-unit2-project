import NavButton from "./NavButton";

function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="sidebar">
            <div className="logo">
                <span>REP</span>
                <small>& REPEAT</small>
            </div>

            <nav>
                <NavButton
                    page="home"
                    activePage={activePage}
                    setActivePage={setActivePage}
                >
                    ⌂ Home
                </NavButton>

                <NavButton
                    page="workouts"
                    activePage={activePage}
                    setActivePage={setActivePage}
                >
                    ▣ Workouts
                </NavButton>

                <NavButton
                    page="history"
                    activePage={activePage}
                    setActivePage={setActivePage}
                >
                    ◷ History
                </NavButton>

                <NavButton
                    page="music"
                    activePage={activePage}
                    setActivePage={setActivePage}
                >
                    ♫ Music
                </NavButton>

                <NavButton
                    page="about"
                    activePage={activePage}
                    setActivePage={setActivePage}
                >
                    👤 About
                </NavButton>
            </nav>
        </aside>
    );
}

export default Sidebar;