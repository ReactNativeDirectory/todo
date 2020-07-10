import React, { FunctionComponent, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
  StyleSheet,
  Animated,
} from "react-native";
import Close from "../assets/icons/close.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_HEIGHT } from "../constants";
import AddCategory from "./Task/AddCategory";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "Settings">;
}

const Settings: FunctionComponent<Props> = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const opacity = useRef(new Animated.Value(0)).current;
  const mainViewOpacity = useRef(new Animated.Value(1)).current;

  const animateMainViewUp = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 0.3,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animateMainViewDown = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const scale = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0.7, 0.7, 1],
  });

  const translateY = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, -SCREEN_HEIGHT, -SCREEN_HEIGHT],
  });

  const animateModal = () => {
    animateMainViewUp();
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      mass: 0.5,
    }).start();
  };

  const closeModal = () => {
    animateMainViewDown();
    Animated.spring(opacity, {
      toValue: 0,
      useNativeDriver: true,
      mass: 0.3,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={{
          ...styles.addCategoryContainer,
          opacity,
          transform: [{ scale, translateY }],
        }}
      >
        <AddCategory close={closeModal} type="Rename" />
      </Animated.View>
      <Animated.ScrollView
        style={{ ...styles.container, opacity: mainViewOpacity }}
      >
        <View style={{ ...styles.nav }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Close color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.headingContainer }}>
          <Text style={{ ...styles.headingText }}>Settings</Text>
        </View>
        <View style={{ ...styles.optionsContainer }}>
          <View style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Dark mode</Text>
            <Switch
              trackColor={{ false: "#282828", true: "#6488E4" }}
              thumbColor={
                isEnabled ? "rgba(255,255,255,1.0" : "rgba(255,255,255,1.0)"
              }
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity
            style={{ ...styles.optionCard }}
            onPress={() => animateModal()}
          >
            <Text style={{ ...styles.optionText }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Rate us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Contact us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  nav: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headingContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headingText: {
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "bold",
  },
  optionsContainer: {
    height: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  optionCard: {
    height: 48,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  optionText: {
    color: "#FFFF",
    fontFamily: "regular",
    fontSize: 16,
  },
  addCategoryContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
    elevation: 10,
  },
});