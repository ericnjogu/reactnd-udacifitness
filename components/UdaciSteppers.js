import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {white, grey, purple} from '../utils/colors' 

export default function UdaciSteppers ({max, unit, step, value, onIncrement, onDecrement}) {
	return (
			<View style={[styles.row,{justifyContent:'space-between'}]}>
			{Platform.OS === 'ios' 
			?
				<View style={{flexDirection:'row'}} >
					<TouchableOpacity onPress={onDecrement} style={styles.iosBtn}>
						<FontAwesome name='minus' size={30} color={purple}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={onIncrement} style={styles.iosBtn}>
						<FontAwesome name='plus' size={30} color={purple}/>
					</TouchableOpacity>
				</View>
			
			:
				<View style={{flexDirection:'row'}} >
					<TouchableOpacity onPress={onDecrement} style={styles.androidBtn}>
						<Entypo name='minus' size={30} color={white}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={onIncrement} style={styles.androidBtn}>
						<Entypo name='plus' size={30} color={white}/>
					</TouchableOpacity>
				</View>
			}
			<View style={styles.info} style={styles.metricCounter}>
					<Text style={{fontSize:24, textAlign:'center'}}>{value}</Text>
					<Text style={{fontSize:18, color:grey}} >{unit}</Text>
				</View>
			</View>
		
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection:'row',
		alignItems:'center',
		flex:1
	},
	container: {
		//flexDirection:'row',
		//alignItems:'stretch'
	},
	iosBtn: {
		backgroundColor:white,
		borderColor: purple,
		borderWidth:1,
		borderRadius:3,
		padding:5,
		paddingLeft:25,
		paddingRight:25,
	},
	androidBtn: {
		backgroundColor:purple,
		borderRadius:3,
		padding:10,
		margin:5
	},
	metricCounter: {
		width:85,
		justifyContent:'center',
		alignItems:'center'
	}
})