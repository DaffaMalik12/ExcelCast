import React from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import styles from '../styles/ExcelStyles';

type UploadExcelProps = {
  onNumbersParsed: (numbers: string[]) => void;
};

export default function UploadExcel({ onNumbersParsed }: UploadExcelProps) {
  const handlePickExcel = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log('User cancelled the picker');
        return;
      }

      const fileUri = result.assets?.[0]?.uri;
      if (!fileUri) {
        Alert.alert('Error', 'No file selected.');
        return;
      }

      const b64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const workbook = XLSX.read(b64, { type: 'base64' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const header: string[] = jsonData[0] as string[];
      const phoneNumberColumnIndex = header.findIndex(
        (column: string) =>
          column.toLowerCase() === 'phonenumber' || column.toLowerCase() === 'number'
      );

      if (phoneNumberColumnIndex === -1) {
        Alert.alert('Error', 'No "phonenumber" or "number" column found.');
        return;
      }

      const numbers: string[] = [];
      for (let row of jsonData.slice(1)) {
        const rowData = row as (string | number | boolean | null)[];
        const number = String(rowData[phoneNumberColumnIndex]).replace(/\D/g, '');
        if (number) {
          numbers.push(number);
        }
      }

      onNumbersParsed(numbers);
      Alert.alert('Success', `${numbers.length} numbers loaded from Excel`);
    } catch (error) {
      console.error('Error reading Excel file:', error);
      Alert.alert('Error', 'Failed to read Excel file.');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePickExcel}>
      <Image
        source={require('../assets/upload-icon1.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.text}>Upload Excel</Text>
    </TouchableOpacity>
  );
}
