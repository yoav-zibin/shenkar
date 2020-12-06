# shenkar

## Installation

Clone from github:
`git clone https://<YOUR_GITHUB_USER_NAME>:<YOUR_GITHUB_PASSWORD>@github.com/yoav-zibin/shenkar.git`

Go into the new directory:
`cd shenkar`

Let's all use `yarn` instead of `npm`
(see how to install [yarn](https://classic.yarnpkg.com/en/docs/install/))

And install all dependencies:
`yarn install`

## Start the app

Runs [expo](http://expo.io/) that allows you to run the app in various ways:
`yarn start`

To share the app run
`expo publish`

## Unit test commands

Runs all unit tests using [jest](https://jestjs.io/)
`yarn testFinal`

Interactively run unit tests (while you edit code):
`yarn test`

## Fix code style and lint errors

To fix everything: `yarn fixAll`

We have git hooks (using [husky](https://github.com/typicode/husky/)) that automatically
fix style and possible lint errors (like changing things to `const` if possible).

If you still want to run them manually:

- Fix style and formatting using [prettier](https://prettier.io/): `yarn prettier`
- Try and fix lint errors using [eslint](https://eslint.org/): `yarn eslint`

## Check code

To check everything (including tests): `yarn checkAll`

Check whether your code was indeed styled correctly: `yarn checkPrettier`

And whether you still have lint errors: `yarn checkEslint`

## Github

Github notifications (e.g. about commits) are sent to the [google group shenkar-games-notification](https://groups.google.com/u/2/g/shenkar-games-notification)
You are welcome to join it.

We have a CI (Continuous Integration) that checks everything is green, i.e., that `yarn checkAll` pass.
