import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                © {currentYear} ExcelCast. All rights reserved. Created by Muhammad Daffa Malik Akram.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    text: {
        color: '#6c757d',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default Footer;
