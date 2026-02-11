import React, { useCallback, useState } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {useRenderCount,} from "@/services/performance/PerformanceMetrics";

import {MemoizedCardItem} from "@/components/CardItem";
import { MemoizedStatusDisplay } from '@/components/StatusDisplay';

// ANTI-PATTERN 7: Component that re-renders due to inline object props





export default function JankLab() {
    useRenderCount('JankLab');

    const [count, setCount] = useState(0);

    const [items, setItems] = useState(Array.from({length: 50}, (_, i) => i));

    const [filter, setFilter] = useState('');

    // const renderItem = useCallback(({index}: {index: number}) => (<CardItem index = {index} />), []);


// ANTI-PATTERN 2: Unnecessary array spread

    const listData = [...items];


// ANTI-PATTERN 8: Expensive filter operation without useMemo

    const filteredItems = listData.filter(item =>

        item.toString().includes(filter)
    );


// ANTI-PATTERN 9: Inline object creation (new reference every render)

    const stats = {count, total: items.length};


    const renderItem = useCallback(({item}: { item: number }) => (<MemoizedCardItem index={item}/>), []);

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Performance Practice Lab</Text>


            {/* This causes StatDisplay to re-render unnecessarily */}

            <MemoizedStatusDisplay stats={stats}/>


            <TouchableOpacity

                style={styles.button}

                onPress={() => setCount(prev => prev + 1)}

            >

                <Text style={styles.buttonText}>Trigger Re-render: {count}</Text>

            </TouchableOpacity>


            <TouchableOpacity

                style={styles.button}

                // ANTI-PATTERN 10: Inline arrow function in onPress

                onPress={() => setItems([...items, items.length])}

            >

                <Text style={styles.buttonText}>Add Item</Text>

            </TouchableOpacity>


            <FlatList

                data={filteredItems}

                keyExtractor={(item) => item.toString()}

                renderItem={renderItem}

                // Missing optimization props:

                // removeClippedSubviews

                // maxToRenderPerBatch

                // windowSize

                // getItemLayout

            />

        </View>

    );

}



const styles = StyleSheet.create({

    container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },

    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },

    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginBottom: 10 },

    buttonText: { color: 'white', textAlign: 'center' },

    item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },



});