import * as React from "react";
import * as RN from "react-native";

export default function Input({ placeholder, value, onChangeText }) {
  return (
    <RN.TextInput
      style={styles.inputContainer}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = RN.StyleSheet.create({
  inputContainer: {
    width: "80%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
});
