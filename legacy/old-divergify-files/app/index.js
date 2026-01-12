import { Image, View, Text, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>WELCOME TO DIVERGIFY</Text>
      <Text style={styles.subtitle}>Your chaos, finally organized.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' },
  logo: { width: 180, height: 180, marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00AEEF', textTransform: 'uppercase' },
  subtitle: { fontSize: 18, color: '#7B68EE', textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
});
