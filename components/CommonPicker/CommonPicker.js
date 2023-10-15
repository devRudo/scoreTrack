import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ActionSheetIOS,
  useColorScheme,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const CommonPicker = ({ items, value, handleChange }) => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? "#fff" : "#000",
  };

  const handleOpenActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...items?.map((item) => item.label), "Cancel"],
        cancelButtonIndex: items?.length,
        destructiveButtonIndex: items?.length,
        userInterfaceStyle: isDarkMode ? "dark" : "light",
      },
      (selectedValueIndex) => {
        if (selectedValueIndex !== items?.length) {
          handleChange(
            items?.find((item, itemIndex) => itemIndex === selectedValueIndex)
              ?.value
          );
        } else {
          ActionSheetIOS.showShareActionSheetWithOptions;
        }
        // console.log(
        //   items?.find((item, itemIndex) => itemIndex === selectedValueIndex)
        //     ?.value,
        // );
      }
    );
  };

  // console.log(Platform);

  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity
        onPress={handleOpenActionSheet}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          // flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: backgroundStyle.color,
          }}
          numberOfLines={1}
        >
          {items?.find((item) => item?.value === value)?.label}
        </Text>
        <Icon name="menu-down" size={30} color={backgroundStyle.color} />
      </TouchableOpacity>
    );
  } else {
    return (
      <Picker
        // mode="dropdown"
        style={{ color: "#f3f3f3" }}
        dropdownIconColor={"#d3d3d3"}
        itemStyle={{
          color: "#d3d3d3",
          borderColor: "#d3d3d3",
          borderWidth: 1,
          borderStyle: "solid",
          // backgroundColor: "#343a40",
        }}
        selectedValue={value}
        onValueChange={(newValue) => handleChange(newValue)}
      >
        {items && Array.isArray(items) && items.length > 0
          ? items.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              );
            })
          : null}
      </Picker>
    );
  }
};

export default CommonPicker;
