import { Tabs } from 'expo-router';
import { FileText, PenTool } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'XML File Form',
          tabBarLabel: 'From File',
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="input"
        options={{
          title: 'XML Input Form',
          tabBarLabel: 'From Input',
          tabBarIcon: ({ size, color }) => (
            <PenTool size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}