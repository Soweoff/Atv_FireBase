import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "expo-router";
import useFirebase from "../../firebase/hooks/useFirebase";

export default function CreateBook() {
  const { app } = useFirebase();
  const db = app ? getFirestore(app) : null;
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const handleSubmit = async () => {
    if (!titulo || !autor) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const ref = collection(db!, "livros");
      await addDoc(ref, { titulo, autor, createdAt: new Date() });
      Alert.alert("Sucesso", "Livro cadastrado com sucesso!");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
});
