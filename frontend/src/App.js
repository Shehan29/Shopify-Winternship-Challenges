import React, { Component } from 'react';
import './App.css';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {email: '', error: false};
		
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.signUp = this.signUp.bind(this);
	}
	
	handleChangeEmail(event) {
		this.setState({email: event.target.value, error: false});
	}
	
	signUp() {
		if (!this.state.email){
			this.setState({error: true});
		}
	}
	
	render() {
		return (
            <div className="App">
                <div className="App-body">
                    <h2 className="title">Stay up to date with ecommerce trends with Shopify's newsletter</h2>
                    <p className="text">Subscribe to Shopify's weekly newsletter for free marketing tips</p>
                    <input id="email" className="inputField" value={this.state.email} onChange={this.handleChangeEmail} type="text" placeholder="Email address"></input>
                    <button className="button" onClick={this.signUp}>Sign up now</button>
					<p style={{display: this.state.error ? 'block' : 'none', color: '#C23628', fontSize: 13 }}>Please enter a valid email address</p>
                    <p className="text">Unsubscribe at any time.</p>
                </div>
            </div>
		);
	}
}

export default App;
