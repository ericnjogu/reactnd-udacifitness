import React, {Component} from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import {Location} from 'expo'
import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'

export default class Live extends Component {
	state = {
		coords:null,
		status: 'ok',//null,
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
				return <View style={styles.center}>
							<Foundation name='alert' size={50}/>
							<Text>Location services have been denied by the user</Text>
						</View>
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
				return <View style={styles.container}>
							<View style={styles.directionContainer}>
								<Text style={styles.header}>You are heading</Text>
								<Text style={styles.direction}>South</Text>
							</View>
							<View style={styles.metricContainer}>
								<View style={styles.metric}>
									<Text style={[styles.header, {color:white}]}>
										Alt
									</Text>
									<Text style={[styles.subHeader, {color:white}]}>
										{1000} m
									</Text>
								</View>
								<View style={styles.metric}>
									<Text style={[styles.header, {color:white}]}>
										Velocity
									</Text>
									<Text style={[styles.subHeader, {color:white}]}>
										{50} m/s
									</Text>
								</View>
							</View>
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
	},
	directionContainer:{
		flex:1,
		justifyContent:'center'
	},
	direction: {
	    color: purple,
	    fontSize: 120,
	    textAlign: 'center',
	 },
	header :{
		fontSize:35,
		textAlign:'center'
	},
	metricContainer: {
		flexDirection:'row',
		justifyContent:'space-around',
		backgroundColor:purple,
	},
	metric:{
		flex:1,
		paddingTop:15,
		paddingBottom:15,
		backgroundColor:'rgba(255, 255, 255, 0.1)',
		marginTop:20,
		marginBottom:20,
		marginLeft:10,
		marginRight:10
	},
	subHeader:{
		fontSize:35,
		textAlign:'center',
		marginTop:5
	}

})