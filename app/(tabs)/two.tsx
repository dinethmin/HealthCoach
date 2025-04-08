import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FIREBASE_Storage, ref, getDownloadURL } from '@/FirebaseConfig';
import { FIREBASE_DB } from '@/FirebaseConfig';


const fetchModelUrl = async (fileName: string | undefined) => {
  const fileRef = ref(FIREBASE_Storage, fileName);
  try {
    const url = await getDownloadURL(fileRef);
    console.log(`Download URL for ${fileName}: ${url}`);
    return url;
  } catch (error) {
    console.error("Error fetching file URL:", error);
  }
};


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});