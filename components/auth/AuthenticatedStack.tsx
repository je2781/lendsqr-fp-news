import React from "react";
import NewsListing from "../../screens/news/NewsListing";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../constants/Colors";
import NewsDetails from "../../screens/news/NewsDetails";

const { Navigator, Screen } = createNativeStackNavigator();


export default function AuthenticatedStack(){
    return  <Navigator
    initialRouteName="Listing"
    screenOptions={{
      contentStyle: { backgroundColor: Colors.secondary50 },
    }}
  >
    <Screen name="Listing" component={NewsListing}/>
    <Screen name="NewsDetails" component={NewsDetails}/>
  </Navigator>
}