/* eslint-disable react-hooks/exhaustive-deps */
// app/contact/[id].js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../../services/api';
import { Feather } from '@expo/vector-icons';

export default function ContactDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await api.get(`/contacts/${id}`);
      setContact(res.data);
    } catch (err) {
      console.error('Failed to fetch contact', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Delete Contact', 'Are you sure you want to delete this contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/contacts/${id}`);
            router.replace('/')
          } catch (err) {
            console.error('Failed to delete contact', err);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" className="flex-1 justify-center items-center" />;
  }

  if (!contact) {
    return <Text className="text-center mt-10 text-red-500">Contact not found.</Text>;
  }

  return (
    <View className="flex-1 bg-white p-6 items-center">
      <Image source={{ uri: contact.avatar }} className="w-24 h-24 rounded-full mb-4" />
      <Text className="text-2xl font-bold text-slate-800">{contact.name}</Text>
      <Text className="text-lg text-slate-600 mb-2">{contact.phone}</Text>
      <Text className="text-base text-slate-500 mb-6">{contact.email}</Text>

      <View className="flex-row space-x-4">
        <Pressable
          onPress={() => router.push(`/contact/edit/${id}`)}
          className="flex-row items-center bg-yellow-500 px-4 py-2 rounded-full"
        >
          <Feather name="edit" size={18} color="white" />
          <Text className="text-white ml-2 font-medium">Edit</Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          className="flex-row items-center bg-red-600 px-4 py-2 rounded-full"
        >
          <Feather name="trash-2" size={18} color="white" />
          <Text className="text-white ml-2 font-medium">Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
