import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import { FormRenderer } from '@/components/FormRenderer';

export default function XMLInputForm() {
  const [xmlInput, setXmlInput] = useState('');
  const [formFields, setFormFields] = useState<any[]>([]);

  const parseXML = (xml: string) => {
    try {
      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(xml);
      
      if (!result.form || !result.form.field) {
        throw new Error('Invalid XML structure');
      }

      const fields = Array.isArray(result.form.field) 
        ? result.form.field 
        : [result.form.field];

      setFormFields(fields.map((field: any) => ({
        type: field['@_type'],
        label: field['@_label'],
        name: field['@_name'],
        options: field.option,
      })));
    } catch (error) {
      Alert.alert('Error', 'Invalid XML format. Please check your input.');
      setFormFields([]);
    }
  };

  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form values:', values);
    Alert.alert('Success', 'Form submitted successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.xmlInput}
          multiline
          numberOfLines={6}
          placeholder="Paste your XML here..."
          value={xmlInput}
          onChangeText={setXmlInput}
          onEndEditing={() => parseXML(xmlInput)}
        />
      </View>
      {formFields.length > 0 && (
        <FormRenderer fields={formFields} onSubmit={handleSubmit} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 16,
  },
  xmlInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
});