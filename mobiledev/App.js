import React from 'react';
import { StyleSheet, Alert, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
            money: '$0',
            bags: '0',
		}
	}
	
	componentDidMount() {
		return fetch('https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6')
			.then((response) => response.json())
			.then((responseJson) => {
		        const orders = responseJson.orders;
		        let total = 0;
		        let bags = 0;
				orders.forEach((order) => {
					if (order.email === 'napoleon.batz@gmail.com') {
						if (order.currency === 'CAD') {
						    total +=  parseFloat(order.total_price);
                        } else {
						    //Convert to CAD and add to total
                        }
					}
					order.line_items.forEach((item) => {
					    if (item.title === 'Awesome Bronze Bag') {
							bags += item.quantity;
						}
                    });
				});
                this.setState({
					isLoading: false,
                    money: `$${total.toString()}`,
                    bags: bags.toString(),
				}, function() {
					// do something with new state
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	render() {
		if (this.state.isLoading) {
			return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <Text>Loading</Text>
                </View>
			);
		}
		
		return (
            <View style={styles.container}>
                <Text style={styles.text}>Money Spent by Napoleon Batz in CAD</Text>
                <TextInput style={styles.input} value={this.state.money} editable={false}></TextInput>
                <Text style={styles.text}>Number of Awesome Bronze Bags Sold</Text>
                <TextInput style={styles.input} value={this.state.bags} editable={false}></TextInput>
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#283593',
		alignItems: 'center',
		justifyContent: 'center',
        padding: 50
	},
    text: {
	    color: '#FFF',
        fontWeight: 'bold',
    },
    input: {
        width: 100,
        paddingBottom: 5,
        textAlign: 'center',
		color: '#FFF',
    }
});
