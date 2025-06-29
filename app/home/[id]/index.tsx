import { useState, useEffect } from "react";
import { Alert, Text, TextInput, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Book from "../../../types/Book";

export default function EditBook() {
  const { id } = useLocalSearchParams();
  const safeId = Array.isArray(id) ? id[0] : id;

  const router = useRouter();

  const {
    data: book,
    loading,
    upsert,
  } = useDocument<Book>("books", safeId as string);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPages(book.pages ? String(book.pages) : "");
    }
  }, [book]);

  const handleSave = async () => {
    if (!title || !author || !pages) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await upsert({
        id: safeId as string,
        title,
        author,
        pages: Number(pages),
      });
      Alert.alert("Sucesso", "Livro atualizado com sucesso!");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  if (!safeId) return <Text>ID inválido</Text>;
  if (loading || !book) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Editar Livro",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Editar Livro</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
      />
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Autor"
      />
      <TextInput
        style={styles.input}
        value={pages}
        onChangeText={setPages}
        placeholder="Páginas"
        keyboardType="numeric"
      />

      <StyledButton title="Salvar Alterações" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
});
