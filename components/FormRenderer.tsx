import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

interface FormField {
  type: string;
  label: string;
  name: string;
  options?: string[];
}

interface FormRendererProps {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
}

export function FormRenderer({ fields, onSubmit }: FormRendererProps) {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return (
          <View style={styles.fieldContainer} key={field.name}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange(field.name, value)}
              value={values[field.name] || ''}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </View>
        );

      case 'datetime':
        return (
          <View style={styles.fieldContainer} key={field.name}>
            <Text style={styles.label}>{field.label}</Text>
            <input
              type="datetime-local"
              onChange={(e) => handleChange(field.name, new Date(e.target.value))}
              style={{
                padding: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                width: '100%',
                fontFamily: 'inherit',
                fontSize: 16,
              }}
            />
          </View>
        );

      case 'radio':
        return (
          <View style={styles.fieldContainer} key={field.name}>
            <Text style={styles.label}>{field.label}</Text>
            {field.options?.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => handleChange(field.name, option)}>
                <View style={styles.radioButton}>
                  {values[field.name] === option && <View style={styles.radioSelected} />}
                </View>
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'drawing':
        return (
          <View style={styles.fieldContainer} key={field.name}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.drawingContainer}>
              <Text style={styles.drawingPlaceholder}>
                Drawing functionality is not available in this version
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {fields.map(renderField)}
      <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit(values)}>
        <Text style={styles.submitButtonText}>Submit Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  drawingContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawingPlaceholder: {
    color: '#666',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});