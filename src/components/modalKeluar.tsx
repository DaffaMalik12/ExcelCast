import React, { useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';

interface ModalKeluarProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalKeluar: React.FC<ModalKeluarProps> = ({ visible, onClose, onConfirm }) => {
  // Menangani tombol back pada hardware
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        // Jika modal terlihat dan tombol back ditekan, tampilkan konfirmasi
        onClose(); // Tutup modal saat ini
        setTimeout(() => {
          // Jeda singkat sebelum menampilkan modal
          onConfirm(); // Panggil konfirmasi keluar
        }, 100);
        return true; // Mencegah default behavior tombol back
      }
      return false; // Biarkan default behavior tombol back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible, onClose, onConfirm]);

  // Modal tidak akan terlihat secara default
  // Hanya akan muncul saat onRequestClose dipanggil oleh sistem (dari tombol back hardware)
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Konfirmasi</Text>
              <Text style={styles.modalText}>Apakah Anda yakin ingin keluar?</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={onClose}
                >
                  <Text style={styles.buttonCancelText}>Batal</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={onConfirm}
                >
                  <Text style={styles.buttonConfirmText}>Ya, Keluar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonCancelText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonConfirm: {
    backgroundColor: '#e53935',
  },
  buttonConfirmText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ModalKeluar;