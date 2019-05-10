import React from 'react'
import {View, Text} from 'react-native'

class EntryDetail extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {id} = navigation.state.params
		return {
			title:new Date(Date.parse(id)).toLocaleDateString()
		}
	}


	render() {
		return (
			<View>
				<Text>Entry Detail ({this.props.navigation.state.params.id})</Text>
			</View>
			)
	}
}

export default EntryDetail