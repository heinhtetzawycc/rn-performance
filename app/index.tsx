import React, { useState } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {useRenderCount, useWhyDidYouUpdate} from "@/services/performance/PerformanceMetrics";


// ANTI-PATTERN 4: Component without React.memo that always re-renders

const HeavyComponent = ({ index }: {index: number}) => {

    // Track renders - you'll see this logs EVERY time any item renders
    useRenderCount(`HeavyComponent-${index}`);
    useWhyDidYouUpdate(`HeavyComponent-${index}`, { index });


    const start = performance.now();

    while (performance.now() - start < 10) {}



// ANTI-PATTERN 5: Inline styles (new object every render)

    return (

        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>

            <Text>Item #{index} (Heavy)</Text>

            {/* ANTI-PATTERN 6: Unoptimized images */}

            <Image

                source={{ uri: `https://picsum.photos/200/200?random=${index}` }}

                style={{ width: 200, height: 200 }}

                // Missing: resizeMode, no caching strategy

            />

        </View>

    );

};



// ANTI-PATTERN 7: Component that re-renders due to inline object props

const StatDisplay = ({ stats }:{stats: any}) => {

    // Track renders - you'll see this logs EVERY time any item renders
    useRenderCount('StatDisplay');
    useWhyDidYouUpdate('StatDisplay', { stats });


    return (

        <View style={styles.statsContainer}>

            <Text>Count: {stats.count}</Text>

            <Text>Items: {stats.total}</Text>

        </View>

    );

};



export default function JankLab() {
    useRenderCount('JankLab');

    const [count, setCount] = useState(0);

    const [items, setItems] = useState(Array.from({ length: 50 }, (_, i) => i));

    const [filter, setFilter] = useState('');



// ANTI-PATTERN 2: Unnecessary array spread

    const listData = [...items];



// ANTI-PATTERN 8: Expensive filter operation without useMemo

    const filteredItems = listData.filter(item =>

        item.toString().includes(filter)

    );



// ANTI-PATTERN 9: Inline object creation (new reference every render)

    const stats = { count, total: items.length };



    return (

        <View style={styles.container}>

            <Text style={styles.title}>Performance Practice Lab</Text>



            {/* This causes StatDisplay to re-render unnecessarily */}

            <StatDisplay stats={stats} />



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

                renderItem={({ item }) => <HeavyComponent index={item} />}

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

    statsContainer: { padding: 10, backgroundColor: '#f0f0f0', marginBottom: 10 }

});