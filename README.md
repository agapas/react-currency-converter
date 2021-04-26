# react-currency-converter

Simple currency conversion app, which uses exchanged rates API from [exchangeratesapi.io](https://exchangeratesapi.io/). The app is made with React in a Functional Programming like approach. Unit tests are made with Jest and Enzyme.

[Demo](http://agapas.github.io/react-currency-converter)

### A note:

For the demo website purpose I used mocked data in this repo as since the 1st April 2021, the [exchangeratesapi.io](https://exchangeratesapi.io/) requires an API access key to use the service. You can sign up for a free API key or get the paid one on their website (just keep in mind that the free plan uses the `http` protocol).

When you will have the API access key:

- add it as a value to `API_ACCESS_KEY` variable in the `src/App.js` file
- in `src/components/DataContorller.js`:
  - remove `mockData` variable,
  - in `componentDidMount` method:
    - remove `this.setState({ data: mockData });`
    - uncomment `this.loadData()` line

### UI example:

<p align="middle">
  <img src="https://raw.githubusercontent.com/agapas/react-currency-converter/master/src/images/exampleUI.jpg" width="800"/>
</p>

### Additional info:

Used packages:

- [currency-flags](https://github.com/transferwise/currency-flags)
- [font-awesome](https://github.com/FortAwesome/Font-Awesome)
- [react-select](https://github.com/JedWatson/react-select)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project

- go to project directory,
- run `npm i` or `yarn` to install packages (just a first time),
- run `npm start` or `yarn start` (it runs the app in the development mode and opens [http://localhost:3000](http://localhost:3000) automatically to view in the browser).

## Testing the project

In the project directory run `npm test`. It launches the test runner in the interactive watch mode.<br>
Run `npm coverage` to see coverage report.

## Production build

To run a production build use command `npm run build` or `yarn build`. It builds the app for production to the build folder.

## License

This project is licensed under the [MIT] License - see the [LICENSE.md](LICENSE) file for details.
