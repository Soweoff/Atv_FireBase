import { Stack, useRouter } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewBook from "../../components/ViewBook";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Book from "../../types/Book";

export default function Home() {
  const { data, remove, refreshData, loading } = useCollection<Book>("books");
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Meus Livros</Text>

      <StyledButton
        title="Cadastrar novo livro"
        onPress={() => router.push("/home/create")}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ViewBook
              book={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
