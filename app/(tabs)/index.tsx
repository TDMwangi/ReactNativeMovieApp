import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: '',
  }));

  if (moviesLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>
          Error: {moviesError.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="mt-2 pb-32"
        scrollEnabled={true}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}
        ListHeaderComponent={
          <View className="bg-neutral-950 pt-20 pb-6 px-5 border-b border-neutral-800">
            <Image
              source={icons.logo}
              className="w-12 h-10 mb-4 mx-auto"
              resizeMode="contain"
            />

            <SearchBar
              placeholder="Search movies"
              onPress={() => router.push('/search')}
            />

            <View className="px-5 mt-6 mb-3">
              <Text className="text-lg text-white font-bold">
                Latest Movies
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
}
