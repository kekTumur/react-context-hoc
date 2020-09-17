import React, { Component } from 'react';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import RandomPlanet from '../random-planet';
import {
	PeoplePage,
	PlanetPage,
	StarshipPage
} from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

	state = {
		swapiService: new SwapiService()
	};

	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service = swapiService instanceof SwapiService ? 
							DummySwapiService : SwapiService;
			return {
				swapiService: new Service()
			};
		});
	}

	render() {
		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.state.swapiService} >
					<Router>
						<div className="stardb-app">
							<Header onServiceChange={this.onServiceChange}/>
							<RandomPlanet />

							<Route path="/" exact render={() => <h2>Welcome</h2>} />
							<Route path="/people" component={PeoplePage} />
							<Route path="/planets" component={PlanetPage} />
							<Route path="/starships" exact component={StarshipPage} />
							<Route path="/starships/:id"
								render={({match}) => {
									const {id} = match.params;
									return <StarshipDetails itemId={id}/>
								}} />

						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
}
