import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import { FormRenderer } from '@/components/FormRenderer';

const sampleXML = `
<?xml version="1.0" encoding="UTF-8"?>
<form>
  <field type="text" label="Full Name" name="fullName" />
  <field type="datetime" label="Appointment Date" name="appointmentDate" />
  <field type="radio" label="Gender" name="gender">
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </field>
  <field type="drawing" label="Signature" name="signature" />
</form>
`;

export default function XMLFileForm() {
  const [formFields, setFormFields] = useState(() => {
    try {
      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(sampleXML);
      
      return result.form.field.map((field: any) => ({
        type: field['@_type'],
        label: field['@_label'],
        name: field['@_name'],
        options: field.option,
      }));
    } catch (error) {
      Alert.alert('Error', 'Failed to parse XML file');
      return [];
    }
  });

  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form values:', values);
    Alert.alert('Success', 'Form submitted successfully!');
  };

  return (
    <View style={styles.container}>
      <FormRenderer fields={formFields} onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});