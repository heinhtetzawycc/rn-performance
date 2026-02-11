import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Summary from './Summary'; // Your Summary component

const DebugContext = createContext({ isDebugMode: false });

export const DebugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDebugMode, setIsDebugMode] = useState(false);

    return (
        <DebugContext.Provider value={{ isDebugMode }}>
    <View style={{ flex: 1 }}>
    {children}

    {/* Toggle Button */}
    <TouchableOpacity
        style={styles.toggle}
    onPress={() => setIsDebugMode(!isDebugMode)}
>
    <Text style={{ color: 'white', fontSize: 10 }}>
    {isDebugMode ? 'DISABLE DEBUG' : 'ENABLE DEBUG'}
    </Text>
    </TouchableOpacity>

    {/* Only show overlay if debug is on */}
    {isDebugMode && <Summary />}
    </View>
    </DebugContext.Provider>
);
};

export const useDebug = () => useContext(DebugContext);

const styles = StyleSheet.create({
    toggle: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#FF3B30',
        padding: 8,
        borderRadius: 5,
        zIndex: 10000,
    }
});