import React, {Component} from 'react'
import {View, Text,TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue, setLocalNotification, clearLocalNotification} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'
import {newEntry} from '../actions'
import {connect} from 'react-redux'
import {white, purple} from '../utils/colors'
import {NavigationActions} from 'react-navigation'

function SubmitBtn ({onPress}) {
	return (<TouchableOpacity onPress={onPress} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
				<Text style={styles.submitBtnText}>Submit</Text>
			</TouchableOpacity>
			)
}

class AddEntry extends Component {
	state = {
		run:0,
		bike: 0,
	    swim: 0,
	    sleep: 0,
	    eat: 0,
	}

	increment = (metric) => {
		const {max, step} = getMetricMetaInfo(metric)

		this.setState(state => {
			const count = state[metric] + step
			return {
				...state,
				[metric]: count > max ? max : count
			}
		})
	}

	decrement = (metric) => {

		this.setState(state => {
			const count = state[metric] - getMetricMetaInfo(metric).step
				return {
					...state,
					[metric]: count < 0 ? 0 : count
				}
		})
	}

	slide = (metric, value) => {
		this.setState({
			[metric]:value
		})
	}

	submit = () => {
		const key = timeToString()
		const entry = this.state

		this.props.dispatch(newEntry({[key]: entry}))

		this.setState({
			run:0,
			bike: 0,
		    swim: 0,
		    sleep: 0,
		    eat: 0,
		})
		this.toHome()
		submitEntry({key, entry})
		clearLocalNotification()
			.then(setLocalNotification())
	}

	reset = () => {
		const key = timeToString()
		this.props.dispatch(newEntry({
			[key]: getDailyReminderValue()}
		))
		removeEntry(key)
		this.toHome()
	}

	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back({
			key:'AddEntry'
		}))
	}

	render() {
		if (this.props.alreadyLogged) {
			return (
				<View style={styles.center}> 
					<Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'} size={100}/>
					<Text>Today's info already logged</Text>
					<TextButton style={{padding:10}} onPress={this.reset}>Reset</TextButton>
				</View>
				)
		}
		const metaInfo = getMetricMetaInfo()

		return (
			<View style={styles.container}>
				<DateHeader date={(new Date()).toLocaleDateString()}/>
				{Object.keys(metaInfo).map(key => {
					const {getIcon, type, ...rest} = metaInfo[key]
					const value = this.state[key]

					return (<View style={styles.row} key={key}>
							{getIcon()}

							{type === 'slider'
							? <UdaciSlider
								value={value}
								onChange={(value) => this.slide(key, value)}
								{...rest}/>
							: <UdaciSteppers
								value={value}
								onIncrement={() => this.increment(key)}
								onDecrement={() => this.decrement(key)}
								{...rest}/>
							}
						</View>
						)
				})}
				<SubmitBtn onPress={this.submit}/>
			</View>
		)
	}
}

function mapStateToProps(state) {
	const key = timeToString()

	return {
		alreadyLogged: state[key] && typeof state[key].today == 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry)

const styles = StyleSheet.create({
	iosSubmitBtn: {
		backgroundColor: purple,
		padding:10,
		borderRadius:7,
		height:45,
		marginLeft:40,
		marginRight:40,
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding:10,
		borderRadius:2,
		height:45,
		paddingLeft:40,
		paddingRight:40,
		alignSelf: 'center',
		justifyContent:'center',
		alignItems:'center'
	},
	submitBtnText: {
		color:white,
		fontSize: 22,
		textAlign:'center'
	},
	container: {
		flex:1,
		padding:20,
		backgroundColor: white
	},
	row: {
		flexDirection:'row',
		flex:1,
		alignItems:'center'
	},
	center:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:30,
		marginRight:30,
	}
})

