import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Update() {
  const navigation = useNavigation();
  const [message, setMessage] = React.useState();
  const handleUpdate = async (id) => {
    const [newItem, setNewItem] = React.useState({
      name: "",
      author: "",
      description: "",
    });

    const response = await fetch(`http://localhost:3001/books/${itemId}`, {
      method: "PUT", // Utiliza el método PUT para la operación de actualización
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    });
    // Verifica el contenido del cuerpo de la respuesta
    const responseBody = await response.json();
    console.log("Response from server:", responseBody);

    if (response.ok) {
      setMessage("Book updated successfully");
    } else {
      setMessage(responseBody.message || "Error updating the book");
    }
  };
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Add a New Book </RN.Text>
      <RN.TextInput
        style={styles.inputContainer}
        placeholder="Book Name"
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <RN.TextInput
        style={styles.inputContainer}
        placeholder="Book Autor"
        onChangeText={(text) => setNewItem({ ...newItem, author: text })}
      />
      <RN.TextInput
        style={styles.inputContainer}
        placeholder="Book Description"
        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
      />
      <RN.Button title="Update" onPress={() => handleUpdate(itemId)} />
    </RN.View>
  );
}
const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  inputContainer: {
    width: "80%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
});
