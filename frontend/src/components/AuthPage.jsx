import { useState } from "react";

function AuthPage({ onLogin }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const endpoint = isRegistering ? "register" : "login";

        try {
            const response = await fetch(
                `api/auth/${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Something went wrong.");
                return;
            }

            if (isRegistering) {
                setMessage("Registration successful! You can log in now.");
                setIsRegistering(false);
                setPassword("");
            } else {
                onLogin(data.username);
            }
        } catch {
            setMessage("Unable to connect to the server.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">REP & REPEAT</p>

                <h1>
                    {isRegistering ? "Create your account." : "Welcome back."}
                </h1>

                <p className="auth-subtitle">
                    {isRegistering
                        ? "Start tracking your workouts, progress, mood, and music."
                        : "Log in and get back to work."}
                </p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </label>

                    {message && <p className="auth-message">{message}</p>}

                    <button type="submit" className="auth-submit">
                        {isRegistering ? "CREATE ACCOUNT" : "LOG IN"}
                    </button>
                </form>

                <button
                    type="button"
                    className="auth-switch"
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        setMessage("");
                    }}
                >
                    {isRegistering
                        ? "Already have an account? Log in"
                        : "Need an account? Register"}
                </button>
            </div>
        </div>
    );
}

export default AuthPage;