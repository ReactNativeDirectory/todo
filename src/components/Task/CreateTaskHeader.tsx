import React, { FunctionComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import Calendar from "../../assets/icons/calendar.svg";
import Left from "../../assets/icons/left.svg";
import { SCREEN_WIDTH, day, month } from "../../constants";

interface Props {
  goBack(): void;
  animateDateOpen: () => void;
}

const CreateTaskHeader: FunctionComponent<Props> = ({
  goBack,
  animateDateOpen,
}) => {
  const date = new Date();
  return (
    <>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity onPress={() => goBack()}>
          <Left color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.heading }}>
        <Text style={{ ...styles.headingText }}>Create new task</Text>
      </View>
      <View style={{ ...styles.taskContainer }}>
        <View style={{ ...styles.title }}>
          <Text style={{ ...styles.titleText }}>Title</Text>
          <View style={{ ...styles.inputContainer }}>
            <TextInput
              placeholder="Chocolate Cake"
              placeholderTextColor="#000000"
              style={{ ...styles.titleInput }}
            />
          </View>
        </View>
        <View style={{ ...styles.title }}>
          <Text style={{ ...styles.titleText }}>Date</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholderTextColor="#000000"
              placeholder={`${day[date.getDay()]}, ${date.getDate()} ${
                month[date.getMonth()].month
              }`}
              style={{ ...styles.dateInput }}
            />
            <TouchableOpacity
              style={{ ...styles.calenderIcon }}
              onPress={() => animateDateOpen()}
            >
              <Calendar color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateTaskHeader;

const styles = StyleSheet.create({
  nav: {
    height: 56,
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  heading: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  headingText: {
    color: "#000000",
    fontSize: 22,
    fontFamily: "bold",
  },
  taskContainer: {
    height: 203,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
  title: {
    height: 48,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 12,
    fontFamily: "regular",
    color: "#000000",
  },
  inputContainer: {
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderBottomWidth: 1,
    width: SCREEN_WIDTH - 48,
  },
  titleInput: {
    fontSize: 16,
    fontFamily: "medium",
    color: "black",
  },
  dateInput: {
    fontFamily: "medium",
    fontSize: 14,
    width: SCREEN_WIDTH - 48 - 72,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  calenderIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});