# Contributing

Thank you for contributing. Here are some guidelines to get you started.

This project uses [semantic commits](https://conventionalcommits.org) and [semver](https://semver.org).

Follow these steps to get started:

1. Make sure you have [Node.js](https://nodejs.org) with npm installed

1. Fork the repo into your account

1. Clone the fork to your local machine

```
git clone https://github.com/<your-github-username>/react-r3f-shader-hook.git
```

4. Install all the dependencies

```
cd react-r3f-shader-hook

npm install
```

## Development

This project uses [Storybook](https://storybook.js.org/) to help with the development.

You can start a Storybook development server by running the following in your terminal:

```
npm run storybook
```

Please make sure you add your stories in the designated `stories` directory

## Testing

This project currently uses [Jest](https://jestjs.io/) for unit testing.

Run Jest test suites against the library with:

```bash
npm run jest

#or, to test live against changes
npm run jest:watch
```

We also use [Cypress](https://www.cypress.io/) to help with testing. This is because, since this project involves in-depth usage of WebGL, Jest's JSDOM does not really support `WebGLRenderer`. Thus we need a proper browser environment to fully test the library. This is where Cypress comes in.

Run Cypress test suites against the library with:

```bash
npm run cypress

#or, to test live against changes using Cypress's interface
npx cypress open
```

## Commiting your changes and creating a PR

Once you're done with your changes, you can commit them and open a PR. Please keep in mind this project uses [semantic commits](https://conventionalcommits.org). If your PR closes an issue, please make sure to mention it in your commit footer.

Feel free to reach me at [abshar.hassan7@gmail.com](mailto:abshar.hassan7@gmail.com) anytime.

Best of luck!
