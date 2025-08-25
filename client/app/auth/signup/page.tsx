"use client";
import useRequest from "@/hooks/use-request";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    method: "post",
    url: "/api/users/signup",
    body: { email, password },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await doRequest();
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold text-center">Sign Up</h1>

      <div className="field">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors}

      <button type="submit">Sign Up</button>
    </form>
  );
}
