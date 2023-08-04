#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createDirectoryContents from './createDirectoryContents.js';
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/themes`);

const QUESTIONS = [
  {
    name: 'theme-choice',
    type: 'list',
    message: 'What theme do you want to generate?',
    choices: CHOICES,
  },
  {
    name: 'theme-name',
    type: 'input',
    message: 'Theme name:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const themeChoice = answers['theme-choice'];
  const themeName = answers['theme-name'];
  const themePath = `${__dirname}/themes/${themeChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${themeName}`);

  createDirectoryContents(themePath, themeName);

  console.log(
    "\nTo get started:\n\n" +
    chalk.blue(
      "\tcd "+ themeName +"\n\tnpm install\n\tnpm run dev\n"
    )+
    "\nTo build & start for production:\n\n" +
    chalk.blue(
      "\tcd "+ themeName +"\n\tnpm install\n\tnpm run build\n\tnpm run start\n"
    )
  );
  
});
