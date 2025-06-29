import { useRouter } from "expo-router";
import { Alert, Text, View, StyleSheet } from "react-native";

import Book from "../types/Book";
import StyledButton from "./StyledButton";

interface ViewBookProps {
  book: Book;
  onDelete: () => void;
}

export default function ViewBook({ book, onDelete }: ViewBookProps) {
  const router = useRouter();

  const handleView = () => {
    if (!book.id) {
      Alert.alert("Erro", "Livro sem ID!");
      return;
    }
    router.push(`/home/${book.id}`);
  };

  const handleDelete = () => {
    if (!book.id) {
      Alert.alert("Erro", "Livro sem ID!");
      return;
    }

    Alert.alert("Deletar Livro", "Deseja realmente excluir este livro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: () => onDelete() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {book.id}</Text>
      <Text style={styles.text}>Título: {book.title}</Text>
      <Text style={styles.text}>Autor: {book.author}</Text>
      <Text style={styles.text}>Páginas: {book.pages}</Text>

      <View style={styles.buttonRow}>
        <StyledButton
          title="Editar"
          onPress={handleView}
          style={styles.button}
        />
        <StyledButton
          title="Excluir"
          onPress={handleDelete}
          style={[styles.button, { backgroundColor: "darkred" }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "darkblue",
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 16,
  },
  text: {
    marginBottom: 4,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  button: {
    width: "48%",
  },
});
