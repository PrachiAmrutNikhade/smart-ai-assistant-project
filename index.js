import "dotenv/config";
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { calculator, getWeather } from "./tools.js";
import readline from "readline";

const llm = new OpenAI({ temperature: 0 });

const tools = [
    {
        name: "Calculator",
        func: calculator,
        description: "Useful for math calculations"
    },
    {
        name: "Weather",
        func: async (input) => await getWeather(input),
        description: "Get weather of a city"
    }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function chat() {
    const executor = await initializeAgentExecutorWithOptions(tools, llm, {
        agentType: "zero-shot-react-description"
    });

    rl.question("Ask something: ", async (query) => {
        const result = await executor.call({ input: query });
        console.log(result.output);
        chat();
    });
}

chat();
