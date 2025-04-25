import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  Linking, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Platform,
  BackHandler 
} from 'react-native';

// Import Components
import MessageInput from '../../components/MessageInput';
import UploadExcel from '../../components/UploadExcel';
import ModalKeluar from '../../components/modalKeluar';

//  Import Styles
import { homeStyles } from '../../styles/homeStyles';

export default function Home() {
  const [message, setMessage] = useState('');
  const [excelNumbers, setExcelNumbers] = useState<string[]>([]);
  const [broadcasting, setBroadcasting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Menangani tombol back pada hardware di screen ini
  useEffect(() => {
    const backAction = () => {
      if (!broadcasting) {
        // Jika tidak sedang broadcasting, tampilkan modal konfirmasi keluar
        setModalVisible(true);
        return true; // Mencegah default behavior
      } else {
        // Jika sedang broadcasting, tampilkan peringatan bahwa proses sedang berjalan
        Alert.alert(
          'Peringatan',
          'Proses broadcast sedang berjalan. Selesaikan atau batalkan terlebih dahulu sebelum keluar.',
          [{ text: 'OK' }]
        );
        return true; // Mencegah default behavior
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [broadcasting]);

  const sendMessageToWhatsApp = async (phoneNumber: string, messageText: string): Promise<boolean> => {
    try {
      // Perbaikan format nomor telepon
      let formattedNumber = phoneNumber;
      if (formattedNumber.startsWith('0')) {
        formattedNumber = `62${formattedNumber.substring(1)}`;
      } else if (!formattedNumber.startsWith('62')) {
        formattedNumber = `62${formattedNumber}`;
      }
      
      // Coba gunakan opsi URL alternatif
      const whatsappUrl = `whatsapp://send?phone=${formattedNumber}&text=${encodeURIComponent(messageText || '')}`;
      
      console.log("Mencoba membuka URL:", whatsappUrl);
      
      // Langsung coba buka WhatsApp
      await Linking.openURL(whatsappUrl);
      return true;
    } catch (error) {
      console.error(`Error sending message to ${phoneNumber}:`, error);
      
      // Jika gagal, coba opsi alternatif dengan deep link web
      try {
        const webWhatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText || '')}`;
        console.log("Mencoba alternatif web URL:", webWhatsappUrl);
        await Linking.openURL(webWhatsappUrl);
        return true;
      } catch (secondError) {
        console.error("Kedua metode gagal:", secondError);
        Alert.alert(
          'Gagal Mengirim',
          `Tidak dapat mengirim pesan ke nomor ${phoneNumber}. Pastikan WhatsApp terinstall.`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return false;
      }
    }
  };

  const handleNumbersParsed = (numbers: string[]) => {
    setExcelNumbers(numbers);
  };

  const handleSend = async () => {
    if (excelNumbers.length === 0) {
      Alert.alert('Peringatan', 'Tidak ada nomor yang ditemukan. Harap unggah file Excel terlebih dahulu.');
      return;
    }
    
    if (message.trim() === '') {
      Alert.alert('Peringatan', 'Harap masukkan pesan yang akan dikirim.');
      return;
    }
    
    // Start broadcasting
    setBroadcasting(true);
    setCurrentIndex(0);
    setProgress(0);
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < excelNumbers.length; i++) {
      const num = excelNumbers[i];
      setCurrentIndex(i);
      setProgress(Math.round(((i + 1) / excelNumbers.length) * 100));
      
      const success = await sendMessageToWhatsApp(num, message);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Add a delay between messages to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    setBroadcasting(false);
    
    Alert.alert(
      'Broadcast Selesai',
      `Berhasil mengirim ke ${successCount} nomor.\nGagal untuk ${failCount} nomor.`
    );
  };

  const handleExitConfirm = () => {
    BackHandler.exitApp(); 
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={homeStyles.container}>
          <View style={homeStyles.sectionContainer}>
            <Text style={homeStyles.heading}>Tambah Nomor</Text>
            <UploadExcel onNumbersParsed={handleNumbersParsed} />
          </View>

          <View style={homeStyles.numberListContainer}>
            {excelNumbers.length > 0 && (
              <Text style={homeStyles.subHeading}>
                {excelNumbers.length} nomor WhatsApp ditemukan
              </Text>
            )}
            
            {excelNumbers.map((num: string, idx: number) => (
              <View
                key={idx}
                style={homeStyles.numberCard}
              >
                <Text style={homeStyles.numberText}>
                  {num}
                </Text>
                {broadcasting && idx === currentIndex && (
                  <View style={homeStyles.statusBadgeSending}>
                    <Text style={homeStyles.statusBadgeText}>Mengirim...</Text>
                  </View>
                )}
                {broadcasting && idx < currentIndex && (
                  <View style={homeStyles.statusBadgeSent}>
                    <Text style={homeStyles.statusBadgeTextSent}>Terkirim</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={homeStyles.sectionContainer}>
            <Text style={homeStyles.heading}>Pesan</Text>
            <MessageInput
              value={message}
              onChangeText={setMessage}
            />
          </View>

          {/* Progress Bar */}
          {broadcasting && (
            <View style={homeStyles.progressContainer}>
              <View style={homeStyles.progressHeader}>
                <Text style={homeStyles.progressText}>Progres: {progress}%</Text>
                <Text style={homeStyles.progressCount}>{currentIndex + 1} dari {excelNumbers.length}</Text>
              </View>
              <View style={homeStyles.progressBarBackground}>
                <View 
                  style={[
                    homeStyles.progressBarFill,
                    { width: `${progress}%` }
                  ]} 
                />
              </View>
            </View>
          )}

          {/* Tombol Kirim */}
          <View style={homeStyles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSend}
              disabled={broadcasting}
              style={[
                homeStyles.broadcastButton,
                broadcasting && homeStyles.broadcastButtonDisabled
              ]}
            >
              {broadcasting ? (
                <>
                  <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 10 }} />
                  <Text style={homeStyles.buttonText}>Sedang Mengirim...</Text>
                </>
              ) : (
                <Text style={homeStyles.buttonText}>Mulai Broadcast</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <ModalKeluar
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleExitConfirm}
      />
    </>
  );
}