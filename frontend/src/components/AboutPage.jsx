import brianaPhoto from "../assets/briana.jpg";
function AboutPage() {
    return (
        <section className="about-page">
            <div className="about-hero">
                <img
                    className="about-photo"
                    src={brianaPhoto}
                    alt="Briana Powers"
                />

                <div className="about-hero-text">
                    <p className="eyebrow">ABOUT REP & REPEAT</p>

                    <h1>Built around two things I love: working out and music.</h1>

                    <p className="about-intro">
                        I created Rep & Repeat because fitness has always been more enjoyable
                        for me when I can track my progress, stay motivated, and have the right
                        music playing in the background.
                    </p>
                </div>
            </div>

            <div className="about-grid">
                <div className="about-card">
                    <h2>Why I built it</h2>
                    <p>
                        I wanted to build an app that felt more personal than a basic workout
                        tracker. Rep & Repeat combines workout planning, exercise tracking,
                        mood check-ins, workout history, and music so the whole experience
                        feels connected.
                    </p>
                </div>

                <div className="about-card">
                    <h2>The idea</h2>
                    <p>
                        Music can completely change the energy of a workout, so I wanted users
                        to be able to choose a vibe, track how they feel before and after a
                        session, and look back at the work they have put in over time.
                    </p>
                </div>

                <div className="about-card">
                    <h2>What I wanted users to feel</h2>
                    <p>
                        Motivated, focused, and excited to come back. The goal was to create
                        something that feels encouraging instead of just showing numbers and
                        workout data.
                    </p>
                </div>

                <div className="about-card">
                    <h2>Built with</h2>
                    <p>
                        React, JavaScript, CSS, React Router, Java, Spring Boot, Spring Data
                        JPA, MySQL, REST APIs, and the iTunes Search API.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;