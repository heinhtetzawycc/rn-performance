import {useRenderCount, useWhyDidYouUpdate} from "@/services/performance/PerformanceMetrics";
import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";

const CardItem = ({ index }: {index: number}) => {

    // Track renders - you'll see this logs EVERY time any item renders
    useRenderCount(`HeavyComponent-${index}`);
    useWhyDidYouUpdate(`HeavyComponent-${index}`, { index });


    const start = performance.now();

    while (performance.now() - start < 10) {}



// ANTI-PATTERN 5: Inline styles (new object every render)

    return (

        <View style={styles.cardContainer}>

            <Text>Item #{index} (Heavy)</Text>

            {/* ANTI-PATTERN 6: Unoptimized images */}

            <Image

                source={{ uri: `https://picsum.photos/200/200?random=${index}` }}

                style={styles.imageStyle}

                // Missing: resizeMode, no caching strategy

            />

        </View>

    );

};

const styles = StyleSheet.create({
    cardContainer: {padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    imageStyle: { width: 200, height: 200 }
});

export const MemoizedCardItem = React.memo(CardItem);