# GAN Integrity backend code challenge

This is my solution to the GAN Integrity backend coding challenge. The solution is implemented per three different servers:
- [Bun](https://bun.sh/) (using Bun runtime environment)
- [Express](https://expressjs.com/) (using Node.js runtime environment)
- [koa](https://koajs.com/) (using Node.js runtime environment)

I am not affiliated with GAN Integrity, I have never received a response from them regarding my submitted solution. I am just using the opportunity to try out different approaches solving the challenge.

## Solution instructions

1. Run `npm install`.
2. Compile and start up the server, by executing either: `npm run deploy:bun`, `npm run deploy:express`, or `npm run deploy:koa`.
3. In a separate terminal, run the challenge script `npm start`.

## Tests

In addition to the solution, some basic tests are implemented. They may be executed all at once per `npm test`. The Bun tests use the [Bun test runner](https://bun.sh/docs/cli/test), while the Express and koa tests use the [Jest test framework](https://jestjs.io/).

## Original instructions

>
>The script `index.js` uses a local api to perform various operations on a set of cities. Your task is to implement an api so that the script runs successfully all the way to the end.
>
>Run `npm install` and `npm run start` to start the script.
>
>Your api can load the required data from [here](addresses.json).
>
>In the distance calculations you can assume the earth is a perfect sphere and has a radius is 6371 km.
>
>Once you are done, please provide us with a link to a git repo with your code, ready to run.

---

Source repository: https://github.com/gandevops/backend-code-challenge
