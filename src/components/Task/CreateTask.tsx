import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
} from "react-native";
import {
  SCREEN_WIDTH,
  RootStackParamList,
  SCREEN_HEIGHT,
  task,
} from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import AddCategory from "./AddCategory";
import CreateTaskDesc from "./CreateTaskDesc";
import CreateTaskHeader from "./CreateTaskHeader";
import DatePick from "../Calender/DatePick";
import {
  addTask,
  addCategory,
  addCategoryTask,
} from "../../redux/ActionCreator";
import { connect } from "react-redux";
import { getFormatedDate } from "../DatePicker";

interface Category {
  tasks: task[] | [];
  categoryName: string;
  categoryColor: string;
  categoryDesc?: string;
  id: string;
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateTask">;
  addTask: (task: task) => any;
  category: Category[];
  addCategory: (category: Category) => any;
  addCategoryTask: (task: { categoryName: string; task: task }) => any;
}

const mapStateToProps = (state: {
  category: { category: Array<Category> };
}) => ({
  category: state.category.category,
});

const mapDispatchToProps = (dispacth: any) => ({
  addTask: (task: task) => dispacth(addTask(task)),
  addCategory: (category: Category) => dispacth(addCategory(category)),
  addCategoryTask: (task: { categoryName: string; task: task }) =>
    dispacth(addCategoryTask(task)),
});

const CreateTask: FunctionComponent<Props> = ({
  navigation,
  addTask,
  category,
  addCategory,
  addCategoryTask,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const dateAnimate = useRef(new Animated.Value(0)).current;
  const mainViewOpacity = useRef(new Animated.Value(1)).current;

  const animateMainViewUp = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 0.5,
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

  const btnOpacity = mainViewOpacity.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0, 1],
  });

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

  const animateDateOpen = () => {
    animateMainViewUp();
    Animated.spring(dateAnimate, {
      toValue: 1,
      useNativeDriver: true,
      mass: 0.5,
    }).start();
  };

  const animateDateClose = () => {
    animateMainViewDown();
    Animated.spring(dateAnimate, {
      toValue: 0,
      useNativeDriver: true,
      mass: 0.3,
    }).start();
  };

  const dateScale = dateAnimate.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.7, 1],
  });

  const dateY = dateAnimate.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, SCREEN_HEIGHT, SCREEN_HEIGHT],
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getFormatedDate(new Date(), "ddd, DD MMM"));
  const [isCat, setCat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedCategory === "") {
      setCat(false);
    } else {
      setCat(true);
    }
  }, [selectedCategory]);

  return (
    <>
      <Animated.View
        style={{
          ...styles.datePickerContainer,
          opacity: dateAnimate,
          transform: [{ scale: dateScale, translateY: dateY }],
        }}
      >
        <View style={{ width: 332, height: 332 }}>
          <DatePick close={animateDateClose} setDate={setDate} />
        </View>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.addCategoryContainer,
          opacity,
          transform: [{ scale, translateY }],
        }}
      >
        <AddCategory
          addCategory={addCategory}
          close={closeModal}
          type="Add Category"
          setSelectedCategory={setSelectedCategory}
        />
      </Animated.View>
      <Animated.View
        style={{ ...styles.headerContainer, opacity: mainViewOpacity }}
      >
        <CreateTaskHeader
          goBack={navigation.goBack}
          animateDateOpen={animateDateOpen}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: SCREEN_WIDTH, opacity: mainViewOpacity }}
      >
        <CreateTaskDesc
          setCat={setCat}
          categories={category}
          animateModal={animateModal}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </Animated.ScrollView>
      <Animated.View
        style={{ ...styles.createTaskContainer, opacity: btnOpacity }}
      >
        <TouchableOpacity
          onPress={() => {
            if (!isCat) {
              addTask({ date: date, title: title, id: "" });
            } else {
              addCategoryTask({
                categoryName: selectedCategory,
                task: { date: date, title: title, id: "" },
              });
            }
          }}
        >
          <Text style={{ ...styles.createTaskText }}>Create Task</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

const styles = StyleSheet.create({
  addCategoryContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
    elevation: 10,
  },
  headerContainer: {
    height: 315,
    backgroundColor: "#FFCC66",
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    position: "absolute",
    elevation: 1,
    zIndex: 1,
  },
  createTaskContainer: {
    width: SCREEN_WIDTH - 48,
    height: 48,
    position: "absolute",
    backgroundColor: "#6488e4",
    borderRadius: 45,
    marginHorizontal: 24,
    elevation: 10,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  createTaskText: {
    fontSize: 14,
    color: "#FFFF",
    fontFamily: "bold",
  },
  datePickerContainer: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    elevation: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    top: -SCREEN_HEIGHT,
  },
});
