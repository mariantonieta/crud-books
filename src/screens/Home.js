import * as React from "react";
import * as RN from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  const [books, setBooks] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetch("http://192.168.1.131:3001/books")
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error("Error:", error));
    }, [refresh])
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.131:3001/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setRefresh(!refresh);
        setMessage("Book deleted successfully");
      } else {
        const data = await response.json();
        setMessage(data.message || "Error deleting the book");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
      setMessage("Error al eliminar el recurso");
    }
  };

  const handleUpdate = (item) => {
    navigation.navigate("Add", { bookData: item });
  };

  return (
    <RN.View>
      <RN.StatusBar />
      <RN.FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RN.View style={styles.card}>
            <RN.View>
              <RN.View style={styles.row}>
                <RN.Text style={styles.label}>Name Book:</RN.Text>
                <RN.Text style={styles.value}>{item.name}</RN.Text>
              </RN.View>
              <RN.View style={styles.row}>
                <RN.Text style={styles.label}>Author Book:</RN.Text>
                <RN.Text style={styles.value}>{item.author}</RN.Text>
              </RN.View>
              <RN.View style={styles.row}>
                <RN.Text style={styles.label}>Description Book:</RN.Text>
                <RN.Text style={styles.value}>{item.description}</RN.Text>
              </RN.View>
            </RN.View>
            <RN.View style={styles.icons}>
              <RN.Pressable onPress={() => handleUpdate(item)}>
                <AntDesign
                  name="edit"
                  size={24}
                  color="#3498db"
                  style={{ marginRight: 18 }}
                />
              </RN.Pressable>
              <RN.Pressable onPress={() => handleDelete(item.id)}>
                <AntDesign name="delete" size={24} color="red" />
              </RN.Pressable>
            </RN.View>
          </RN.View>
        )}
      />
      <RN.Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 255, 0.5)" : "#007BFF",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
          },
        ]}
        onPress={() => navigation.navigate("Add")}
      >
        <RN.Text style={{ color: "white", fontSize: 18 }}>Add</RN.Text>
      </RN.Pressable>
    </RN.View>
  );
}
const styles = RN.StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    margin: 20,
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    boxShadowColor: "#000",
    boxShadowOffset: {
      width: 0,
      height: 2,
    },
    boxShadowOpacity: 0.25,
    boxShadowRadius: 3.84,
  },
});
