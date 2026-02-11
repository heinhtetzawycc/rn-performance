import { useRenderCount, useWhyDidYouUpdate } from '@/services/performance/PerformanceMetrics';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
    statsContainer: { padding: 10, backgroundColor: '#f0f0f0', marginBottom: 10 }
});

export const MemoizedStatusDisplay = React.memo(StatDisplay);