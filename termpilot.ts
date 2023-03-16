#!/usr/bin/env -S deno run -A

import { OpenAI } from 'https://deno.land/x/openai_deno/mod.ts'
import inquirer from 'npm:inquirer';
import input from 'npm:@inquirer/input';
import select from 'npm:@inquirer/select';

// load .env for the token env var
import "https://deno.land/std@0.179.0/dotenv/load.ts";

const answer = await input({ message: '' });

const openai = new OpenAI() 
const completion = await openai.createCompletion(
  'text-davinci-003',
  {
    prompt: `Some shell command to ${answer}} on ${Deno.build.os} are:`,
    temperature: parseFloat(Deno.env.get("OPENAI_COMPLETION_TEMPERATURE") || "0.4"),
    frequencyPenalty: parseFloat(Deno.env.get("OPENAI_COMPLETION_FREQUENCY_PENALTY") || "0.2"),
    presencePenalty:  parseFloat(Deno.env.get("OPENAI_COMPLETION_PRESENCE_PENALTY") || "0"),
    maxTokens: parseInt(Deno.env.get("OPENAI_COMPLETION_MAX_TOKENS") || "150"),
    bestOf: parseInt(Deno.env.get("OPENAI_COMPLETION_BEST_OF") || "1"),
  }
)

// completion can multiple lines, so the MVP is just to split by new lines then pick the line you want
const options = [] as string[];
for (const choice of completion.choices) {
    let split = choice.text.split(/\n+/)
    // remove empty strings
    split = split.filter((s) => s.length > 0)

    // remove any numbers followed by a period from the beginning
    split = split.map((s) => s.replace(/^\d+\.\s*/, ''))

    // remove any spaces from the beginning
    split = split.map((s) => s.replace(/^\s+/, ''))    

    options.push(...split)
}
const choices = options.map((value) => ({"value": value}))

const res = await select({
  message: 'Select a command from the list below:',
  choices: choices
});

const tmpFile = Deno.args[0];
if (!tmpFile) {
  throw Error("please specify a temporary file to use for the selected command")
}
Deno.writeFileSync(tmpFile, new TextEncoder().encode(res))
