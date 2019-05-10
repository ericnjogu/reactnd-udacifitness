import React, {Component} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'

export default class Live extends Component {
	state = {
		coords:null,
		status: null,
		direction:'',
	}

	render () {
		const {status, coords, direction} = this.state

		switch (status) {
			case null:
				return <View><ActivityIndicator style={{marginTop:30}}/></View>
			case 'denied':
				return <View><Text>Denied</Text></View>
			case 'undertermined':
				return <View><Text>undertermined</Text></View>
			default:
				<View>
					<Text>Live</Text>
					<Text>{JSON.stringify(this.state)}</Text>
				</View>
		}
	}
}