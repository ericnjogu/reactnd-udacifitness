import React, {Component} from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import {Location} from 'expo'
import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'

export default class Live extends Component {
	state = {
		coords:null,
		status: 'undertermined',//null,
		direction:'',
	}

	askPermission = () => {

	}

	render () {
		const {status, coords, direction} = this.state

		switch (status) {
			case null:
				return <View><ActivityIndicator style={{marginTop:30}}/></View>
			case 'denied':
				return <View><Text>Denied</Text></View>
			case 'undertermined':
				return <View style={styles.center}>
							<Foundation name='alert' size={50}/>
							<Text>Location services need to be enabled</Text>
							<TouchableOpacity onPress={this.askPermission} style={styles.button}>
								<Text style={styles.buttonText}>
									Enable Location Services
								</Text>
							</TouchableOpacity>
						</View>
			default:
				<View>
					<Text>Live</Text>
					<Text>{JSON.stringify(this.state)}</Text>
				</View>
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		justifyContent:'center'
	},
	center:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:30,
		marginRight:30,
	},
	buttonText: {
		color:white,
		fontSize:20,
	},
	button: {
		padding:10,
		backgroundColor:purple,
		alignSelf:'center',
		borderRadius:5,
		margin:20
	}
})