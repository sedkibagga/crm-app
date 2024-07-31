import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";
// import Login from "../components/login";
import Login from "@/pages/LoginPage";


export default function Home() {

  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center", height:"100vh"}}>
      <div>
        <Image src="/khallasli.png" alt="" width={300} height={200}/>
      </div>
      <div>
        <Login/>
      </div>
    </div>
  );
}
