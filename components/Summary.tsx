import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Type for our global tracking object
type RenderCounts = Record<string, number>;

// Global variable (outside the component) so it doesn't get reset
let renderCounts: RenderCounts = {};

export const trackRender = (componentName: string): void => {
    renderCounts[componentName] = (renderCounts[componentName] || 0) + 1;
};

export default function PerformanceSummary() {
    const [counts, setCounts] = useState<RenderCounts>({});

    useEffect(() => {
        const interval = setInterval(() => {
            // Check if data actually changed before setting state to avoid extra renders
            setCounts((prev) => {
                const hasChanged = JSON.stringify(prev) !== JSON.stringify(renderCounts);
                return hasChanged ? { ...renderCounts } : prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Don't render anything if there are no counts yet
    if (Object.keys(counts).length === 0) return null;

    return (
        <View style={styles.summaryContainer} pointerEvents="none">
            <Text style={styles.summaryTitle}>⚡ Render Tracker</Text>
            {Object.entries(counts).map(([name, count]) => (
                <Text key={name} style={styles.summaryText}>
                    {name}: <Text style={{ fontWeight: 'bold', color: '#00ff00' }}>{count}</Text>
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    summaryContainer: {
        position: 'absolute',
        bottom: 40, // Moved to bottom so it doesn't block headers
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: 12,
        borderRadius: 8,
        zIndex: 9999,
        borderWidth: 1,
        borderColor: '#444',
    },
    summaryTitle: {
        color: '#aaa',
        fontSize: 10,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    summaryText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'System', // Use monospace if available
    },
});