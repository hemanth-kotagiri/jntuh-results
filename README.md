# [ JNTUH Results Statistics ](https://jntuh-results-stats.vercel.app)

<img src="homepage.png">
<br>
<br>

<p align="center">
<code><img height="50" src="https://camo.githubusercontent.com/e1e113df83e7731fdb90f6f0ab2eeb155fd1b48c27d99814dcf1c23c0acdc6a2/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6461726b5f6261636b67726f756e642e706e67"></code>
<code><img height="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"></code>
<code><img height="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/800px-Typescript.svg.png"></code>
<code><img height="50" src="https://avatars.githubusercontent.com/u/67109815?s=200&v=4"></code>
<code><img height="50" src="https://www.chartjs.org/img/chartjs-logo.svg"></code>
</p>

## Introduction

A place where you can get result(s) of all semesters, and regulations of
engineering undergraduates. All that you need is your hallticket to fetch the
results along with the SGPA for that specific exam. Along with fetching result
of a single hallticket, you can also fetch results of students given a
**_specific, valid range_** of hallticket numbers. This feature of the website
also provides you with basic statistics such as overall pass to failure
percentages and subject wise mean total marks.

## Features

- Filter the exam links as you want - Regulation(s), and Exam type. (The only
  reason why I started this project).
- **All R18 Results** - Results of all semesters of R18 regulation batch students in one shot.
- **Notifications** - Latest B.Tech exam results released notifications.
- **Single Student Result** - Ability to get result along with the SGPA of a single student provided the hallticket.
- **Results of Multiple Students** given a specific range of halltickets along with statistics such as
  - Overall pass/fail ratio of the given range of halltickets.
  - Bar chart representing each subject's pass to fail ratio along with mean total marks for eligible exams.

<img src="./multiple-results-stats.jpg">

## Run Locally

Clone the project

```bash
git clone https://github.com/hemanth-kotagiri/jntuh-results-stats
```

Go to the project directory

```bash
cd jntuh-results-stats
```

Install dependencies

```bash
yarn install
```

Start the development server

```bash
yarn run dev
```

Run the production build

```bash
yarn run start
```

## API Documentation

Please visit the [API
Documentation](https://hemanth-kotagiri.github.io/sgpa-rest-api-docs) for
extensive details about the backend which is built using Python. Backend is
also Open-Source, feel free to check it out and contribute as well!

### Authors

- [@hemanth-kotagiri](https://www.github.com/hemanth-kotagiri)

## License

[GPL-3.0](./LICENSE)
