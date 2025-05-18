import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ContactCard({ contact, onPress }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center bg-white p-4 rounded-lg mb-3 shadow-sm">
      <Image
        source={{ uri: contact.avatar }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-slate-800">{contact.name}</Text>
        <Text className="text-slate-600">{contact.phone}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#94a3b8" />
    </Pressable>
  );
}
