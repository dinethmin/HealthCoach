import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ColorPalette } from '@/constants/Colors'

const GoBack = () => {
  return (
    <View>
      <Text>GoBack</Text>
      <Link
          href={{
            pathname: "/Prediction",
            params: {
              type: "nav",
            },
          }}
          asChild
          //style={[defaultStyles.btns, styles.btnDark]}
        >
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="page-previous"
              size={20}
              //style={styles.btnIcon}
              color={ColorPalette.light}
            />
            <Text //</TouchableOpacity>style={styles.btnDarkText}
            >Go Back</Text>
          </TouchableOpacity>
        </Link>
    </View>
  )
}

export default GoBack