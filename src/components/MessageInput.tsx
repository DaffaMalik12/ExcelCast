import React from 'react';
import { TextInput } from 'react-native';
import { messageInputStyles } from '../styles/messageInputStyles';

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const MessageInput = ({ value, onChangeText }: MessageInputProps) => {
  return (
    <TextInput
      style={messageInputStyles.textArea}
      multiline
      numberOfLines={4}
      placeholder="Type your message..."
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default MessageInput;