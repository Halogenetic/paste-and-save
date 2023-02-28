import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { trpc } from "../utils/trpc";
import BuildToJson from "./buildtojson";

const KEY = 'azertyuiopqsdfghjklmwxcvbn';

const Myteams: NextPage = () => {

  const [username, setUsername] = useState('');
  const [privateTeams, setPrivateTeams] = useState({});
  const [json, setJson] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.verify(token, KEY);
      if (typeof decodedToken !== 'string') {
        const username = decodedToken.username;
        setUsername(username);
      }
    }
  }, []);

  const gptMutation = trpc.signup.getPrivateTeams.useMutation();

  useEffect(() => {
    const fetchPrivateTeams = async () => {
      const result = await gptMutation.mutateAsync({ author: username });
      const modifiedResult = Object.fromEntries(
        Object.entries(result).map(([key, value]) => [key, JSON.parse(value)])
      );
      setPrivateTeams(modifiedResult);
      if (modifiedResult && Object.keys(modifiedResult).length > 0) {
        setJson(BuildToJson(modifiedResult[0]));
      } else {
        setJson("You don't have any team");
      }
    };
    fetchPrivateTeams();
  }, [username]);
  

  console.log(json);
  

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center h-[90%]">
        <div>Hello {username}</div>
      </main>
    </>
  );
};

export default Myteams;
