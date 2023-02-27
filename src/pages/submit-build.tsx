import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import { buildTypes } from "./races/[raceName]/match-ups/[opponentRace]";

type TStep = {
  name: string;
  supply: number;
};

type races = "z" | "p" | "t";

const units: Record<races, TStep[]> = {
  z: [
    {
      name: "drone",
      supply: 1,
    },
    {
      name: "zergling",
      supply: 1,
    },
    {
      name: "roach",
      supply: 2,
    },
    {
      name: "overlord",
      supply: 0,
    },
    {
      name: "infestor",
      supply: 2,
    },
    {
      name: "ultralisk",
      supply: 6,
    },
    {
      name: "baneling",
      supply: 0,
    },
    {
      name: "queen",
      supply: 2,
    },
    { name: "hydralisk", supply: 2 },
    { name: "mutalisk", supply: 2 },
    { name: "corruptor", supply: 2 },
    { name: "swarm host", supply: 3 },
    { name: "viper", supply: 3 },
    { name: "brood lord", supply: 2 },
    { name: "overseer", supply: 0 },
  ],
  p: [],
  t: [],
};

const structures: Record<races, TStep[]> = {
  z: [
    {
      name: "spawning pool",
      supply: -1,
    },
    {
      name: "extractor",
      supply: -1,
    },
    {
      name: "hatchery",
      supply: -1,
    },
    {
      name: "evolution chamber",
      supply: -1,
    },
    {
      name: "spore crawler",
      supply: -1,
    },
    {
      name: "spine crawler",
      supply: -1,
    },
    {
      name: "roach warren",
      supply: -1,
    },
    {
      name: "baneling nest",
      supply: -1,
    },
    {
      name: "lair",
      supply: 0,
    },
    {
      name: "spire",
      supply: -1,
    },
    {
      name: "hydralisk den",
      supply: -1,
    },
    {
      name: "nydus network",
      supply: -1,
    },
    {
      name: "infestion pit",
      supply: -1,
    },
    {
      name: "hive",
      supply: 0,
    },
    {
      name: "ultralisk cavern",
      supply: -1,
    },
    {
      name: "greater spire",
      supply: 0,
    },
  ],
  p: [],
  t: [],
};

type TBuildStep = {
  supply: number;
  unit: string;
  note: string;
};

const SubmitBuildPage: NextPage = () => {
  const createBuildMutation = trpc.builds.createBuild.useMutation();

  const [matchUp, setMatchUp] = useState("zvt");
  const [style, setStyle] = useState("cheese");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [build, setBuildOrder] = useState("");
  const router = useRouter();
  const [supply, setSupply] = useState(12);

  const [buildSteps, setBuildSteps] = useState<TBuildStep[]>([]);

  async function handleSubmitBuildOrder(e: React.FormEvent) {
    e.preventDefault();
    await createBuildMutation.mutateAsync({
      matchUp,
      build,
      style,
      title,
      description,
      author,
    });
    router.push("/");
  }

  function addStepToBuildOrder(stepName: TStep) {
    setBuildSteps([
      ...buildSteps,
      {
        supply,
        unit: stepName.name,
        note: "",
      },
    ]);
    setSupply(supply + stepName.supply);
  }

  function handleNoteUpdated(
    originalBuildStep: TBuildStep,
    newNoteValue: string
  ) {
    setBuildSteps(
      buildSteps.map((buildStep) =>
        buildStep === originalBuildStep
          ? {
              ...buildStep,
              note: newNoteValue,
            }
          : buildStep
      )
    );
  }

  const race = matchUp.split("v")[0]!;

  return (
    <>
      <Head>
        <title>Submit a Build</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container m-auto flex flex-col gap-8 bg-gray-800 pb-12 pt-12 text-white">
        <h1 className="text-4xl">Submit a Build Order</h1>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmitBuildOrder}
        >
          <div className="flex gap-12">
            <fieldset>
              <label
                htmlFor="match-up-select"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Match Up
              </label>
              <select
                className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={matchUp}
                onChange={(e) => setMatchUp(e.target.value)}
                id="match-up-select"
                required
              >
                <option value="zvt">ZvT</option>
                <option value="zvp">ZvP</option>
                <option value="zvz">ZvZ</option>
                <option value="pvt">PvT</option>
                <option value="pvp">PvP</option>
                <option value="pvz">PvZ</option>
                <option value="tvt">TvT</option>
                <option value="tvp">TvP</option>
                <option value="tvz">TvZ</option>
              </select>
            </fieldset>

            <fieldset>
              <label
                htmlFor="style"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Style
              </label>
              <select
                className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                id="style"
                required
              >
                {buildTypes.map((buildType) => (
                  <option key={buildType} value={buildType}>
                    {buildType}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>

              <input
                id="author"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>

              <input
                id="title"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </fieldset>
          </div>

          <fieldset className="w-3/4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>

            <textarea
              id="description"
              className="h-[140px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          <div className="m-auto flex w-full gap-8">
            <fieldset className="w-1/2">
              <label
                htmlFor="build"
                className="mb-2 block text-sm font-medium  text-white"
              >
                Build Order
              </label>

              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">supply</th>
                    <th className="px-6 py-3">unit / structure</th>
                    <th className="px-6 py-3">note</th>
                  </tr>
                </thead>
                <tbody>
                  {buildSteps.map((buildStep, idx) => (
                    <tr
                      key={idx}
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <td className="px-6 py-3">{buildStep.supply}</td>
                      <td className="px-6 py-3">{buildStep.unit}</td>
                      <td className="px-6 py-3">
                        <input
                          className="bg-transparent p-1 hover:bg-white focus:bg-white"
                          value={buildStep.note}
                          onChange={(e) =>
                            handleNoteUpdated(buildStep, e.target.value)
                          }
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </fieldset>

            <div className="flex w-1/2 gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Units</h2>
                {units[race as races].map((unit: TStep) => (
                  <button
                    key={unit.name}
                    type="button"
                    onClick={() => addStepToBuildOrder(unit)}
                  >
                    {unit.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Structures</h2>
                {structures[race as races].map((structure: TStep) => (
                  <button
                    key={structure.name}
                    type="button"
                    onClick={() => addStepToBuildOrder(structure)}
                  >
                    {structure.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default SubmitBuildPage;
