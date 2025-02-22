import React, { useState } from "react"

interface UserRegistrationProps {
    onRegisterSuccess: () => void
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegisterSuccess }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const userData = {
            username,
            email,
            password
        }

        try {
            const response = await fetch("api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })

        if (response.ok) {
            onRegisterSuccess()
        } else {
            const data = await response.json()
            setError(data.detail || "an error occured")
        }
    } catch (err) {
        setError("network error occured")
    }
    }

    return (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Register</button>
          </form>
        </div>
      );
}

export default UserRegistration