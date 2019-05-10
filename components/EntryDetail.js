import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import MetricCard from './MetricCard'
import {newEntry} from '../actions'
import {removeEntry} from '../utils/api'
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import TextButton from './TextButton'

class EntryDetail extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {id} = navigation.state.params
		return {
			title:new Date(Date.parse(id)).toLocaleDateString()
		}
	}

	reset = () => {
		const {remove, goBack, id} = this.props
		remove()
		goBack()
		removeEntry(id)
	}

	render() {
		const {metrics} = this.props
		return (
			<View style={styles.container}>
				<MetricCard metrics={metrics}/>
				<TextButton onPress={this.reset} style={{margin:20}}>Reset</TextButton>
			</View>
			)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.metrics !== null && !nextProps.metrics.today
	}
}

function mapStateToProps (state, {navigation}) {
	const {id} = navigation.state.params
	return {
		id,
		metrics:state[id]
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor:white,
		padding:15
	}
})

function mapDispatchToProps (dispatch, {navigation}) {
	const {id} = navigation.state.params

	return {
		remove: () => dispatch(newEntry({
			[id]:timeToString() === id
			? getDailyReminderValue
			: null	
		})),
		goBack: () => navigation.goBack()
	}
}