import { OpenAI } from 'https://deno.land/x/openai_deno/mod.ts'

import inquirer from 'npm:inquirer';

import input from 'npm:@inquirer/input';
import select from 'npm:@inquirer/select';

// load .env for the token env var
import "https://deno.land/std@0.179.0/dotenv/load.ts";


import os from "https://deno.land/x/dos@v0.11.0/mod.ts";

const answer = await input({ message: '' });

const openai = new OpenAI() 

const completion = await openai.createCompletion(
  'text-davinci-003',
  {
    prompt: `The shell command to ${answer}} on ${os.platform()} is:`,
    temperature: 0.4,
    frequencyPenalty: 0.2,
    presencePenalty: 0,
    maxTokens: 150,
    bestOf: 3,
  }
)

// completion can multiple lines, so the MVP is just to split by new lines then pick the line you want
const options = [] as string[];
for (const choice of completion.choices) {
    let split = choice.text.split(/\n+/)
    // remove empty strings
    split = split.filter((s) => s.length > 0)
    options.push(...split)
}
const choices = options.map((value) => ({"value": value}))

const res = await select({
  message: 'Select a command from the list below:',
  choices: choices
});
const tmpFile = Deno.args[0]
Deno.writeFileSync(tmpFile, new TextEncoder().encode(res))
