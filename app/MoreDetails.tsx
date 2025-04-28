import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import Octicons from "@expo/vector-icons/Octicons";
import { ColorPalette } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";

const MoreDetails = () => {
  const { disease } = useLocalSearchParams();
  const [uType, setType] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View style={{ backgroundColor: "white" }}>
        <Text style={styles.title}>
          Details about <Text>{disease}</Text>
        </Text>
      </View>
      {disease === "FLU" && (
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>Symptoms Flu</Text>
          <Text style={styles.paragraph}>
            Fever, sore throat, runny nose, headache, muscle aches, cough,
            tiredness
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.cdc.gov/flu/signs-symptoms/index.html"
              )
            }
          >
            <Text style={styles.link}>More About Flu Symptoms &gt;</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            The flu is a respiratory tract infection caused by the influenza
            virus. Flu symptoms include fever, sore throat, runny nose,
            headache, cough, muscle aches, and fatigue. The flu spreads easily
            from person to person. Most people recover at home with rest and
            over-the-counter medications, but for some people flu can be severe.
          </Text>

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
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.mayoclinic.org/diseases-conditions/flu/diagnosis-treatment/drc-20351725#:~:text=If%20you%20have%20a%20severe,or%20loose%20stools%20called%20diarrhea."
              )
            }
          >
            <Text style={styles.link}>
              Which Treatments are Effective for the Flu? &gt;
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Prevention</Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Getting
            vaccinated every year with the seasonal flu shot.
          </Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Washing your
            hands often with soap and water.
          </Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Avoiding close
            contact with people who are sick.
          </Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Wearing a mask
            in crowded places during flu season.
          </Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Covering your
            mouth and nose when coughing or sneezing.
          </Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Avoiding
            touching your eyes, nose, and mouth with unwashed hands.
          </Text>
          <Text style={styles.bulletPoint2}>
            <Entypo name="dot-single" size={16} color="black" /> Staying home
            when you feel sick to protect others.
          </Text>

          <Text style={styles.sectionTitle}>When to See a Doctor</Text>
          <Text style={styles.questionTitle}>
            Are you checking symptoms for a{" "}
            <Text style={{ color: "#D32F2F" }}>child or an adult?</Text>
          </Text>
          <View style={styles.questionContainer}>
            <TouchableOpacity
              style={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                backgroundColor: ColorPalette.blue2,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setType("child")}
            >
              <Text style={styles.questionTitle2}>Child</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                backgroundColor: ColorPalette.blue2,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setType("adult")}
            >
              <Text style={styles.questionTitle2}>Adult</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: ColorPalette.greyLight2,
              borderRadius: 20,
              marginBottom: 5,
            }}
          >
            {uType === "child" && (
              <ScrollView style={{ padding: 10, marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#D32F2F",
                    marginBottom: 10,
                  }}
                >
                  Seek medical attention immediately if your child has any of
                  the following:
                </Text>

                <View
                  style={{ justifyContent: "center", marginLeft: 10, gap: 5 }}
                >
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Fast
                    breathing or trouble breathing
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Bluish
                    lips or face
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Chest
                    pain
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Severe
                    muscle pain (refuses to walk)
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Dehydration (no urine for 8 hours, no tears when crying)
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Seizures
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Fever
                    above 104°F (40°C) or any fever in babies under 12 weeks
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Symptoms that improve but return worse
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Extreme
                    irritability or difficulty waking
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 20,
                    backgroundColor: ColorPalette.lightBlue,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setType("")}
                >
                  <Text style={styles.questionTitle2}>Clear</Text>
                </TouchableOpacity>
              </ScrollView>
            )}

            {uType === "adult" && (
              <ScrollView style={{ padding: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#D32F2F",
                    marginBottom: 10,
                  }}
                >
                  Seek medical attention immediately if you experience any of
                  the following:
                </Text>

                <View
                  style={{ justifyContent: "center", marginLeft: 10, gap: 5 }}
                >
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Difficulty breathing or shortness of breath
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Chest
                    pain or pressure
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Severe
                    dizziness, confusion, or trouble staying awake
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Persistent high fever not improving
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Symptoms that improve but worsen again
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Severe
                    weakness or feeling unsteady
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 20,
                    backgroundColor: ColorPalette.lightBlue,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setType("")}
                >
                  <Text style={styles.questionTitle2}>Clear</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
    color: "black",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
    color: "black",
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
    color: "black",
  },
  questionContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "transparent",
    gap: 10,
    marginBottom: 10,
  },
  questionTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 6,
    color: "black",
  },
  questionText: {
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
    textAlign: "justify",
  },
  link: {
    color: "#007AFF",
    fontSize: 15,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
    color: "#333",
    flexDirection: "row",
  },
  bulletPoint2: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});

export default MoreDetails;
