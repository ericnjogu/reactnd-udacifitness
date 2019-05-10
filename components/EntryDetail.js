import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import MetricCard from './MetricCard'

class EntryDetail extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {id} = navigation.state.params
		return {
			title:new Date(Date.parse(id)).toLocaleDateString()
		}
	}


	render() {
		const {metrics} = this.props
		return (
			<View style={styles.container}>
				<MetricCard metrics={metrics}/>
			</View>
			)
	}
}

function mapStateToProps (state, {navigation}) {
	const {id} = navigation.state.params
	//debugger
	return {
		id,
		metrics:state[id]
	}
}

export default connect(mapStateToProps)(EntryDetail)

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor:white,
		padding:15
	}
})