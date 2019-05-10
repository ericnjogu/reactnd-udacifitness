import React, {Component} from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet,Animated} from 'react-native'
import {Location, Permissions} from 'expo'
import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'
import {calculateDirection} from '../utils/helpers'

export default class Live extends Component {
	state = {
		coords:null,
		status: null,
		direction:'',
		bounceValue: new Aminated.Value(1)
	}

	askPermission = () => {
		Permissions.askAsync(Permissions.LOCATION)
			.then(({status}) => {
				if (status === 'granted') {
					return this.setLocation()
				}

				this.setState({status})
			})
			.catch((error) => console.warn('error asking location permission', error))
	}

	setLocation = () => {
		Location.watchPositionAsync({
			enableHighAccuracy: true,
			timeInterval:1,
			distanceInterval:1
		},({coords}) => {
			const newDirection = calculateDirection(coords.heading)
			const {direction, bounceValue} = this.state

			if (newDirection !== direction) {
				Animated.sequence([
					Animated.timing(bounceValue, {duration:200, toValue:1.04}),
					nimated.spring(bounceValue, {toValue:1, friction:4}),
				]).start()
			}

			this.setState(() => ({
				coords,
				status:'granted',
				direction:newDirection
			})
		)})
	}

	componentDidMount() {
		Permissions.getAsync(Permissions.LOCATION)
			.then(({status}) => {
				if (status === 'granted') {
					return this.setLocation()
				}
				this.setState(() => {status})
			})
			.catch((error) => {
				console.warn('Error getting location permission', error)
				this.setState({status:'undetermined'})
			})
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
			case 'undetermined':
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
								<Animated.Text style={[styles.direction, {transform:[{scale:bounceValue}]}]}>{direction}</Animated.Text>
							</View>
							<View style={styles.metricContainer}>
								<View style={styles.metric}>
									<Text style={[styles.header, {color:white}]}>
										Alt
									</Text>
									<Text style={[styles.subHeader, {color:white}]}>
										{Math.round(coords.altitude)} m
									</Text>
								</View>
								<View style={styles.metric}>
									<Text style={[styles.header, {color:white}]}>
										Velocity
									</Text>
									<Text style={[styles.subHeader, {color:white}]}>
										{coords.speed} kph
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