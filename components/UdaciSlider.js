import React from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'
import {white, grey, purple} from '../utils/colors' 


export default function UdaciSlider ({max, unit, step, value, onChange}) {
	return (
		<View style={[styles.row, {justifyContent:'space-between'}]}>
			<Slider style={{flex:1}} step={step} value={value} maximumValue={max}
			minimumValue={0} onValueChange={onChange}/>
			<View style={styles.metricCounter}>
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
	metricCounter: {
		width:85,
		justifyContent:'center',
		alignItems:'center'
	}
})