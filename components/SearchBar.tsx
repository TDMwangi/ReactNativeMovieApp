import { Feather } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

interface SearchInputProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchInput({
  placeholder,
  onPress,
  value,
  onChangeText,
}: SearchInputProps) {
  return (
    <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-3 border border-neutral-700">
      <Feather name="search" size={18} color="#e5e7eb" />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#e5e7eb"
        className="flex-1 ml-3 text-white text-base"
      />
    </View>
  );
}
