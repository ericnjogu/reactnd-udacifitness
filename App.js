import React from 'react';
import {View } from 'react-native';
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import {FontAwesome, Entypo} from '@expo/vector-icons'

const Tabs = createAppContainer(createBottomTabNavigator ({
		History: {
			screen: History,
			navigationOptions: {
				tabBarIcon: () => <FontAwesome name='history' size={30} color='black'/>
			}
		},
		'Add Entry': {
			screen:AddEntry,
			navigationOptions: {
				tabBarIcon: () => <Entypo name='add-to-list' size={30} color='black'/>
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