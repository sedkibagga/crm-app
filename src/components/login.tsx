"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/ContextPage/UserContext";


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebar();

  useEffect(() => {
    console.log("isOpen after update:", isOpen);
  }, [isOpen]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log("Token saved:", localStorage.getItem('token'));
      router.push('/dashboard');
    } catch (error) {
      console.error("There was an error logging in!", error);

    }
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    setIsOpen(true) ;
    console.log ("is open updated" , isOpen)
    login();
    
  };

  return (
    <div className="container" style={{ padding: '30px', width: '390px', paddingTop: "100px" }}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                value={email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                value={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
