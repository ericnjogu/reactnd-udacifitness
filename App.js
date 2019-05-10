import React from 'react';
import {View, Platform} from 'react-native';
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {white, purple} from './utils/colors'

const Tabs = createAppContainer(createBottomTabNavigator ({
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
	}))

export default class App extends React.Component {

  render() {

    return (
    	<Provider store={createStore(reducer)}>
	      <View style={{flex:1}}>
	        <Tabs/>
	      </View>
	    </Provider>
    )
  }
}