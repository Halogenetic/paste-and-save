import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import BuildToJson from "./buildtojson";
import PokemonComp from "../components/pokemoncomp";
import Select from "../components/Select";
import jwt from 'jsonwebtoken';
import router from "next/router";
import { trpc } from "../utils/trpc";

const KEY = 'azertyuiopqsdfghjklmwxcvbn';

interface FieldProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  children: React.ReactNode;
}

function Field({ name, value, onChange, children, type }: FieldProps) {
  return (
    <div>
      <input className='myinputs' placeholder={`${children}`} type={type} value={value} onChange={onChange} id={name} name={name} />
    </div>
  );
}

interface CheckboxProps {
  name: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

function Checkbox({ name, value, onChange, children }: CheckboxProps) {
  return (
    <div className='flex'>
      <input className='mycheckboxes' type="checkbox" checked={value} onChange={onChange} id={name} name={name} />
      <label className='mylabels' htmlFor={name}>{children}</label>
    </div>
  );
}

const Session: NextPage = () => {
  const [mybuild, setMybuild] = useState('');
  const [json, setJson] = useState('');
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [tier, setTier] = useState('OU');
  const [username, setUsername] = useState('');

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      default:
        break;
    }
  };

  const handlePublicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsPublic(checked);
    setIsPrivate(!checked);
  };

  const handlePrivateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsPrivate(checked);
    setIsPublic(!checked);
  };
  
  const handleTier = (e: ChangeEvent<HTMLSelectElement>) => {
    setTier(e.target.value);
  };

  useEffect(() => {
    setJson(BuildToJson(mybuild));
  }, [mybuild]);

  const createteamMutation = trpc.signup.createTeam.useMutation()
  const ispublic = isPublic;
  const paste = JSON.stringify(mybuild)
  const author = username

  const handleSubmitForm = async (author: string, title: string, tier: string, ispublic: boolean, paste: string) => {
    try {
      await createteamMutation.mutateAsync({ author, title, tier, ispublic, paste });
      router.push("/myteams");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.stringify({ author, title, tier, ispublic, paste });
    handleSubmitForm(author, title, tier, ispublic, paste);
  };

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center w-[100%] h-[90%] border-neutral-500 border-solid border-[2px] font-extrabold">
        <div className="flex flex-col w-[25%] h-[100%]">
          <div className="flex flex-col items-center justify-center w-[100%] h-[50%] border-neutral-500 border-solid border-[2px]">
            <form className='myforms text-neutral-700' onSubmit={handleSubmit}>
              <Field name="title" value={title} onChange={handleChange} type="text">
                Title
              </Field>
              <div className="flex items-center justify-center my-[10%]">
                <Select name="Tier" value={tier} onChange={handleTier}/>
              </div>
              <div className="flex items-center justify-center gap-[15px] my-[10%]">
                <Checkbox name="isPublic" value={isPublic} onChange={handlePublicChange}>
                  Public
                </Checkbox>
                <Checkbox name="isPrivate" value={isPrivate} onChange={handlePrivateChange}>
                  Private
                </Checkbox>
              </div>
              <button className='mybuttons'>Save</button>
            </form>
          </div>
          <div className="w-[100%] h-[50%] overflow-hidden">
          <textarea
            id="myta"
            className="w-[100%] h-[100%] text-center text-neutral-500 border-neutral-500 border-solid border-[2px]"
            value={mybuild}
            onChange={(e) => setMybuild(e.target.value)}
            placeholder=" Paste your team here"
          ></textarea>
          </div>
        </div>
        <div className="flex flex-col w-[75%] h-[100%]">
          <div className="flex items-center justify-center w-[100%] h-[50%]">
            <PokemonComp json={`${json}`} number={1} />
            <PokemonComp json={`${json}`} number={2} />
            <PokemonComp json={`${json}`} number={3} />
          </div>
          <div className="flex items-center justify-center w-[100%] h-[50%]">
            <PokemonComp json={`${json}`} number={4} />
            <PokemonComp json={`${json}`} number={5} />
            <PokemonComp json={`${json}`} number={6} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Session;
