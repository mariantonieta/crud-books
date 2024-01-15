import * as React from "react";
import * as RN from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Input from "../components/Input";
export default function Add() {
  const navigation = useNavigation();
  const route = useRoute();
  const [newItem, setNewItem] = React.useState({
    name: "",
    author: "",
    description: "",
  });
  const { bookData } = route.params || {};

  React.useEffect(() => {
    if (bookData) {
      setNewItem({
        name: bookData.name || "",
        author: bookData.author || "",
        description: bookData.description || "",
      });
    }
  }, [bookData]);
  const handleUpdate = async (id) => {
    try {
      const dataToUpdate = {
        name: newItem.name,
        author: newItem.author,
        description: newItem.description,
      };
      const response = await fetch(`http://192.168.1.131:3001/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      const responseBody = await response.json();
      console.log("Response from server:", responseBody);

      if (response.ok) {
        console.log("Book updated successfully");
      } else {
        console.log(responseBody.message || "Error updating the book");
      }
    } catch (error) {
      console.error("Error updating the book:", error);
    }
  };
  const onSend = async () => {
    try {
      if (bookData) {
        await handleUpdate(bookData.id);
      } else {
        const response = await fetch("http://192.168.1.131:3001/books", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        const content = await response.json();
        console.log(content);
      }

      navigation.goBack();
    } catch (error) {
      console.log("Error al enviar a la bbdd", error);
    }
  };
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Add or Edit a Book </RN.Text>
      <Input
        placeholder="Book Name"
        value={newItem.name}
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <Input
        placeholder="Book Author"
        value={newItem.author}
        onChangeText={(text) => setNewItem({ ...newItem, author: text })}
      />
      <Input
        placeholder="Book Description"
        value={newItem.description}
        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
      />
      <RN.Button title={bookData ? "Update" : "Send"} onPress={onSend} />
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
});
