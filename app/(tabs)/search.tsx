import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery,
  }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        if (movies?.length > 0 && movies?.[0]) {
          updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />

            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}

            {
              !moviesLoading && !moviesError && searchQuery.trim() !== '' && (
                <Text className="text-xl text-white mt-3 font-bold">
                  Search Results for{' '}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )
            }
          </View>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
}
