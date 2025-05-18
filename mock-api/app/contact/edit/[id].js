/* eslint-disable react-hooks/exhaustive-deps */
// app/contact/edit/[id].js
import React, { useEffect, useState } from 'react';
import {  TextInput, Text, Pressable, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../../../services/api';

export default function EditContact() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await api.get(`/contacts/${id}`);
      const { name, phone, email, avatar } = res.data;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAvatar(avatar);
    } catch (err) {
      console.error('Error loading contact', err);
      Alert.alert('Error', 'Could not load contact');
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Validation', 'Name and phone are required');
      return;
    }

    const updatedContact = {
      name,
      phone,
      email,
      avatar: avatar || `https://i.pravatar.cc/150?u=${name}`,
    };

    try {
      await api.put(`/contacts/${id}`, updatedContact);
      router.replace('/');
    } catch (err) {
      console.error('Failed to update contact', err);
      Alert.alert('Error', 'Could not update contact');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white p-6">
      <Text className="text-lg font-semibold text-slate-700 mb-2">Name</Text>
      <TextInput
        className="border border-slate-300 rounded px-4 py-2 mb-4"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-lg font-semibold text-slate-700 mb-2">Phone</Text>
      <TextInput
        className="border border-slate-300 rounded px-4 py-2 mb-4"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text className="text-lg font-semibold text-slate-700 mb-2">Email</Text>
      <TextInput
        className="border border-slate-300 rounded px-4 py-2 mb-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text className="text-lg font-semibold text-slate-700 mb-2">Avatar URL</Text>
      <TextInput
        className="border border-slate-300 rounded px-4 py-2 mb-6"
        value={avatar}
        onChangeText={setAvatar}
      />

      <Pressable
        onPress={handleUpdate}
        className="bg-yellow-500 p-4 rounded-lg items-center"
      >
        <Text className="text-white text-lg font-medium">Update Contact</Text>
      </Pressable>
    </ScrollView>
  );
}
