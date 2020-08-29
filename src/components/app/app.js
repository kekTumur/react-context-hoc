import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';

export default class App extends Component {

	swapiService = new SwapiService();

	state = {
		showRandomPlanet: true
	};

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return {
				showRandomPlanet: !state.showRandomPlanet
			}
		});
	};

	render() {
		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.swapiService} >
					<div className="stardb-app">
						<Header />

						<PersonDetails itemId={11} />
						<PlanetDetails itemId={5} />
						<StarshipDetails itemId={9} />

						<PersonList />
						<StarshipList />
						<PlanetList />

					</div>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
}