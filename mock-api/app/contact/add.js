// app/contact/add.js
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { api } from "../../services/api";

export default function AddContact() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Validation", "Name and phone are required");
      return;
    }

    const newContact = {
      name,
      phone,
      email,
      avatar: avatar || `https://i.pravatar.cc/150?u=${name}`,
    };

    try {
      await api.post("/contacts", newContact);
      router.replace("/");
    } catch (err) {
      console.error("Failed to add contact", err);
      Alert.alert("Error", "Could not add contact");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white p-6"
    >
      <View className="mt-10 p-6 ">
        <Text className="text-lg font-bold mb-2 text-center">
          Add new Contact
        </Text>
        <Text className="text-lg font-semibold text-slate-700 mb-2">Name</Text>
        <TextInput
          className="border border-slate-300 rounded px-4 py-2 mb-4"
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-lg font-semibold text-slate-700 mb-2">Phone</Text>
        <TextInput
          className="border border-slate-300 rounded px-4 py-2 mb-4"
          placeholder="+1 555-1234"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text className="text-lg font-semibold text-slate-700 mb-2">Email</Text>
        <TextInput
          className="border border-slate-300 rounded px-4 py-2 mb-4"
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text className="text-lg font-semibold text-slate-700 mb-2">
          Avatar URL (optional)
        </Text>
        <TextInput
          className="border border-slate-300 rounded px-4 py-2 mb-6"
          placeholder="https://..."
          value={avatar}
          onChangeText={setAvatar}
        />

        <Pressable
          onPress={handleSubmit}
          className="bg-blue-600 p-4 rounded-lg items-center"
        >
          <Text className="text-white text-lg font-medium">Add Contact</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
