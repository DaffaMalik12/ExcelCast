import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#075e54', // Warna WhatsApp
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
  },
  numberListContainer: {
    marginBottom: 20,
  },
  numberCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: 'steelblue',
  },
  numberText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  statusBadgeSending: {
    backgroundColor: '#ffeb3b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadgeSent: {
    backgroundColor: '#25d366', // Warna hijau WhatsApp
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeTextSent: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#25d366', // Warna hijau WhatsApp
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
    gap: 12,
  },
  broadcastButton: {
    backgroundColor: 'steelblue', // Warna primer WhatsApp
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  broadcastButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e53935',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: '600',
  },
});