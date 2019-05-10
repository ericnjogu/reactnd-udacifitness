import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {white, purple} from './utils/colors'
import {Constants} from 'expo'
import EntryDetail from './components/EntryDetail'

const Tabs = createBottomTabNavigator ({
		History: {
			screen: History,
			navigationOptions: {
				tabBarIcon: ({tintColor}) => <FontAwesome name='history' size={30} color={tintColor}/>
			}
		},
		'Add Entry': {
			screen:AddEntry,
			navigationOptions: {
				tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor}/>
			}
		}
	},
	{
		tabBarOptions: {
			activeTintColor: Platform.OS === 'ios' ? purple : white,
			style: {
				height:60,
				backgroundColor: Platform.OS === 'ios' ? white : purple,
				shadowOffset: {
					width:0,
					height:3
				},
				shadowRadius:6,
				shadowOpacity:1
			}
		}
	})

const StackNavigation = createAppContainer(createStackNavigator({
	home: {
		screen:Tabs
	},
	detail: {
		screen:EntryDetail,
		navigationOptions:{
			headerTintColor:white,
			headerStyle: {
				backgroundColor:purple
			}
		}
	}
}))

function CustomStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height:Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props}/>
		</View>
		)
}

export default class App extends React.Component {

  render() {
    return (
    	<Provider store={createStore(reducer)}>
	      <View style={{flex:1}}>
	      	<CustomStatusBar backgroundColor={purple} barStyle='light-content'/>
	        <StackNavigation/>
	      </View>
	    </Provider>
    )
  }
}