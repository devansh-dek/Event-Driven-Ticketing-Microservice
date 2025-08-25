"use client"
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resp = await axios.post('/api/users/signup', {
      email, password
    })

    console.log(resp.data)
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold text-center">Sign Up</h1>

      <div className="field">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
