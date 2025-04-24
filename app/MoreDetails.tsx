import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MoreDetails = () => {
  const { disease } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View style={{ backgroundColor: "white" }}>
        <Text>MoreDetails</Text>
        <Text>Disease: {disease}</Text>
      </View>
      {disease === "FLU" && (
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>Symptoms Flu</Text>
          <Text style={styles.paragraph}>
            Fever, sore throat, runny nose, headache, muscle aches, cough,
            tiredness
          </Text>
          <Text style={styles.link}>More About Flu Symptoms &gt;</Text>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            The flu is a respiratory tract infection caused by the influenza
            virus. Flu symptoms include fever, sore throat, runny nose,
            headache, cough, muscle aches, and fatigue. The flu spreads easily
            from person to person. Most people recover at home with rest and
            over-the-counter medications, but for some people flu can be severe.
          </Text>
          <Text style={styles.link}>Read more &gt;</Text>

          <Text style={styles.sectionTitle}>What Happens with the Flu</Text>
          <Text style={styles.paragraph}>
            After being infected, symptoms may appear within 1 to 4 days. The
            virus attacks the respiratory system, leading to inflammation, body
            aches, and fatigue. Most people recover in about a week, but
            complications can occur in vulnerable individuals.
          </Text>

          <Text style={styles.sectionTitle}>Treatment</Text>
          <Text style={styles.paragraph}>
            The flu usually gets better on its own in one to two weeks with
            rest. Antihistamines, decongestants, pain relievers, drinking plenty
            of fluids, and inhaling steam may help ease symptoms. For people at
            risk for complications and those with severe symptoms, antiviral
            medications such as oseltamivir (Tamiflu), baloxavir (Xofluza),
            peramivir (Rapivab), or zanamivir (Relenza) may help reduce the
            duration of symptoms, shorten the illness, and prevent complications
            if taken early.
          </Text>
          <Text style={styles.link}>
            Which Treatments are Effective for the Flu? &gt;
          </Text>

          <Text style={styles.sectionTitle}>Prevention</Text>
          <Text style={styles.paragraph}>
            Wash your hands frequently, avoid close contact with sick people,
            stay home when you’re sick, and get a flu vaccine every year.
          </Text>

          <Text style={styles.sectionTitle}>When to See a Doctor</Text>
          <Text style={styles.paragraph}>
            Seek medical attention if your symptoms worsen, you have trouble
            breathing, chest pain, or a persistent high fever, especially if
            you're in a high-risk group like children, the elderly, or those
            with chronic health conditions.
          </Text>

          <Text style={styles.sectionTitle}>How Long Does It Last?</Text>
          <Text style={styles.paragraph}>
            Symptoms typically last 5–7 days, but fatigue and cough may linger
            for several more days.
          </Text>
        </ScrollView>
      )}

      {disease === "COLD" && (
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>Symptoms Cold</Text>
          <Text style={styles.paragraph}>
            Fever, sore throat, runny nose, headache, muscle aches, cough,
            tiredness
          </Text>
          <Text style={styles.link}>More About Flu Symptoms &gt;</Text>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            The flu is a respiratory tract infection caused by the influenza
            virus. Flu symptoms include fever, sore throat, runny nose,
            headache, cough, muscle aches, and fatigue. The flu spreads easily
            from person to person. Most people recover at home with rest and
            over-the-counter medications, but for some people flu can be severe.
          </Text>
          <Text style={styles.link}>Read more &gt;</Text>

          <Text style={styles.sectionTitle}>What Happens with the Flu</Text>
          <Text style={styles.paragraph}>
            After being infected, symptoms may appear within 1 to 4 days. The
            virus attacks the respiratory system, leading to inflammation, body
            aches, and fatigue. Most people recover in about a week, but
            complications can occur in vulnerable individuals.
          </Text>

          <Text style={styles.sectionTitle}>Treatment</Text>
          <Text style={styles.paragraph}>
            The flu usually gets better on its own in one to two weeks with
            rest. Antihistamines, decongestants, pain relievers, drinking plenty
            of fluids, and inhaling steam may help ease symptoms. For people at
            risk for complications and those with severe symptoms, antiviral
            medications such as oseltamivir (Tamiflu), baloxavir (Xofluza),
            peramivir (Rapivab), or zanamivir (Relenza) may help reduce the
            duration of symptoms, shorten the illness, and prevent complications
            if taken early.
          </Text>
          <Text style={styles.link}>
            Which Treatments are Effective for the Flu? &gt;
          </Text>

          <Text style={styles.sectionTitle}>Prevention</Text>
          <Text style={styles.paragraph}>
            Wash your hands frequently, avoid close contact with sick people,
            stay home when you’re sick, and get a flu vaccine every year.
          </Text>

          <Text style={styles.sectionTitle}>When to See a Doctor</Text>
          <Text style={styles.paragraph}>
            Seek medical attention if your symptoms worsen, you have trouble
            breathing, chest pain, or a persistent high fever, especially if
            you're in a high-risk group like children, the elderly, or those
            with chronic health conditions.
          </Text>

          <Text style={styles.sectionTitle}>How Long Does It Last?</Text>
          <Text style={styles.paragraph}>
            Symptoms typically last 5–7 days, but fatigue and cough may linger
            for several more days.
          </Text>
        </ScrollView>
      )}

      {disease === "COVID" && (
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>Symptoms COVID</Text>
          <Text style={styles.paragraph}>
            Fever, sore throat, runny nose, headache, muscle aches, cough,
            tiredness
          </Text>
          <Text style={styles.link}>More About Flu Symptoms &gt;</Text>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            The flu is a respiratory tract infection caused by the influenza
            virus. Flu symptoms include fever, sore throat, runny nose,
            headache, cough, muscle aches, and fatigue. The flu spreads easily
            from person to person. Most people recover at home with rest and
            over-the-counter medications, but for some people flu can be severe.
          </Text>
          <Text style={styles.link}>Read more &gt;</Text>

          <Text style={styles.sectionTitle}>What Happens with the Flu</Text>
          <Text style={styles.paragraph}>
            After being infected, symptoms may appear within 1 to 4 days. The
            virus attacks the respiratory system, leading to inflammation, body
            aches, and fatigue. Most people recover in about a week, but
            complications can occur in vulnerable individuals.
          </Text>

          <Text style={styles.sectionTitle}>Treatment</Text>
          <Text style={styles.paragraph}>
            The flu usually gets better on its own in one to two weeks with
            rest. Antihistamines, decongestants, pain relievers, drinking plenty
            of fluids, and inhaling steam may help ease symptoms. For people at
            risk for complications and those with severe symptoms, antiviral
            medications such as oseltamivir (Tamiflu), baloxavir (Xofluza),
            peramivir (Rapivab), or zanamivir (Relenza) may help reduce the
            duration of symptoms, shorten the illness, and prevent complications
            if taken early.
          </Text>
          <Text style={styles.link}>
            Which Treatments are Effective for the Flu? &gt;
          </Text>

          <Text style={styles.sectionTitle}>Prevention</Text>
          <Text style={styles.paragraph}>
            Wash your hands frequently, avoid close contact with sick people,
            stay home when you’re sick, and get a flu vaccine every year.
          </Text>

          <Text style={styles.sectionTitle}>When to See a Doctor</Text>
          <Text style={styles.paragraph}>
            Seek medical attention if your symptoms worsen, you have trouble
            breathing, chest pain, or a persistent high fever, especially if
            you're in a high-risk group like children, the elderly, or those
            with chronic health conditions.
          </Text>

          <Text style={styles.sectionTitle}>How Long Does It Last?</Text>
          <Text style={styles.paragraph}>
            Symptoms typically last 5–7 days, but fatigue and cough may linger
            for several more days.
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
    color: "black",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 24,
  },
  link: {
    color: "#007AFF",
    fontSize: 15,
    marginBottom: 10,
  },
});

export default MoreDetails;
