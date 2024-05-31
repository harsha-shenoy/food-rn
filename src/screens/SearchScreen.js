import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, error] = useResults();

  const filterByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter((result) => result.price === price);
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}

      />
      {/* <Text>We have found - {results.length} results</Text> */}
      {error ? <Text>Something went wrong</Text> : null}
      <ScrollView>
        <ResultsList title="Cost Effective" results={filterByPrice("$")} />
        <ResultsList title="Bit Pricer" results={filterByPrice("$$")} />
        <ResultsList title="Big Spender" results={filterByPrice("$$$")} />
        <ResultsList title="Rich Bitch" results={filterByPrice("$$$$")} />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
    screen : {
        flex: 1
    }
});

export default SearchScreen;
