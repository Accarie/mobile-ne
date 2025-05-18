// app/index.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../services/api";
import ContactCard from "../components/ContactCard";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, contacts]);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    const term = text.toLowerCase();
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.phone.toLowerCase().includes(term)
    );
    setFilteredContacts(results);
  };

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );

  return (
    <View className="flex-1 bg-slate-100 p-4 mt-10">
      <Text className="text-xl font-bold mb-3 text-gray-800">Contacts</Text>

      <TextInput
        placeholder="Search by name, email, or phone"
        value={search}
        onChangeText={(text) => setSearch(text)}
        className="bg-white border border-blue-100 rounded-2xl px-4 py-3 mb-4 text-base"
      />

      {filteredContacts.length === 0 ? (
        <Text className="text-center text-gray-500 mt-4">
          No contacts found.
        </Text>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onPress={() => router.push(`/contact/${item.id}`)}
            />
          )}
        />
      )}

      <Pressable
        onPress={() => router.push("/contact/add")}
        className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
      >
        <Feather name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}
