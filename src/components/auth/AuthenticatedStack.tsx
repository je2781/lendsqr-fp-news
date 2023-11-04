import React from "react";
import NewsListing from "../../screens/news/NewsListing";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../constants/Colors";
import NewsDetails from "../../screens/news/NewsDetails";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/auth-action-creators";
const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthenticatedStack() {
  const dispatch = useAppDispatch();
  return (
    <Navigator
      initialRouteName="Listing"
      screenOptions={{
        contentStyle: { backgroundColor: Colors.secondary50 },
      }}
    >
      <Screen
        name="Listing"
        component={NewsListing}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                auth()
                  .signOut()
                  .then(() => {
                    dispatch(logoutUser());
                  })
              }
            >
              <MaterialIcons name="logout" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Screen name="NewsDetails" component={NewsDetails} />
    </Navigator>
  );
}
