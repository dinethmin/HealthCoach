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

const tableData = [
  { key: "1", Symptom: "Symptom onset", Cold: "Gradual", Flu: "Abrupt" },
  { key: "2", Symptom: "Fever", Cold: "Rare", Flu: "Common: lasts 3-4 days" },
  { key: "3", Symptom: "Aches", Cold: "Slight", Flu: "Common: often severe" },
  { key: "4", Symptom: "Chills", Cold: "Uncommon", Flu: "Fairly common" },
  { key: "5", Symptom: "Fatigue, weakness", Cold: "Sometimes", Flu: "Usual" },
  { key: "6", Symptom: "Sneezing", Cold: "Common", Flu: "Sometimes" },
  {
    key: "7",
    Symptom: "Chest discomfort",
    Cold: "Mild to moderate",
    Flu: "Common: can be severe",
  },
  { key: "8", Symptom: "Stuffy nose", Cold: "Common", Flu: "Sometimes" },
  { key: "9", Symptom: "Sore throat", Cold: "Common", Flu: "Sometimes" },
  { key: "10", Symptom: "Headache", Cold: "Rare", Flu: "Common" },
  {
    key: "11",
    Symptom: "cough",
    Cold: "hacking cough",
    Flu: "Common: can be severe",
  },
];

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
          <Text style={styles.sectionTitle}>Symptoms</Text>
          <Text style={styles.paragraph}>
            Symptoms of a common cold may include throat pain and sensitivity,
            sneezing, runny or stuffy nose, low-grade fever, headache, muscle
            aches, cough, and tiredness.
          </Text>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            The common cold is an illness affecting your nose and throat. Most
            often, it's harmless, but it might not feel that way. Germs called
            viruses cause a common cold.
          </Text>
          <Text style={styles.paragraph}>
            Often, adults may have two or three colds each year. Infants and
            young children may have colds more often.
          </Text>
          <Text style={styles.paragraph}>
            Because more than 200 viruses cause colds, and new ones develop all
            the time, the body can't build immunity to colds. Colds spread
            easily from person to person and are the most common illness in the
            world.
          </Text>

          <Text style={styles.sectionTitle}>Cold vs Flu</Text>
          <View style={styles.tableContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Symptoms</Text>
              <Text style={styles.headerText}>Cold</Text>
              <Text style={styles.headerText}>Flu</Text>
            </View>
            {tableData.map((item) => (
              <View style={styles.row} key={item.key}>
                <Text style={styles.cell}>{item.Symptom}</Text>
                <Text style={styles.cell}>{item.Cold}</Text>
                <Text style={styles.cell}>{item.Flu}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Treatment</Text>
          <Text style={styles.paragraph}>
            Colds usually get better on their own in a few days. Antihistamines,
            decongestants, pain relievers, drinking plenty of fluids, and
            breathing in steam may help ease symptoms.
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.mayoclinic.org/diseases-conditions/common-cold/in-depth/cold-remedies/art-20046403#:~:text=Drink%20plenty%20of%20fluids.,Ease%20stuffiness"
              )
            }
          >
            <Text style={styles.link}>
              Which Treatments are Effective for Cold? &gt;
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Prevention</Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Washing your hands regularly with soap and water.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Avoiding close contact with people who have cold symptoms.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Keeping your hands away from your face, especially your eyes, nose,
            and mouth.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Covering your mouth and nose when sneezing or coughing.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Using tissues or elbows to cover sneezes and coughs.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Staying hydrated to keep your immune system strong.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Getting enough sleep to support your immune system.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Avoiding smoking and secondhand smoke, as it weakens your
            respiratory system.
          </Text>
          <Text style={styles.bulletPoint3}>
            <Entypo name="dot-single" size={16} color="black" />
            Disinfecting surfaces that are frequently touched by others (e.g.,
            phones, doorknobs, remote controls).
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
                    <Octicons name="dot-fill" size={14} color="black" /> Fever
                    of 100.4 degrees Fahrenheit (38 degrees Celsius) in newborns
                    up to 12 weeks.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Rising
                    fever or fever lasting more than two days in a child of any
                    age.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    More-intense symptoms, such as headache, throat pain or
                    cough.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Trouble
                    with breathing or wheezing.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Ear
                    pain.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Fussiness or drowsiness that isn't typical.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> No
                    interest in eating.
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
                  See your health care provider if you have:
                </Text>

                <View
                  style={{ justifyContent: "center", marginLeft: 10, gap: 5 }}
                >
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Symptoms that get worse or do not get better.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Fever
                    greater than 101.3 degrees Fahrenheit (38.5 degrees Celsius)
                    that lasts more than three days.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Fever
                    returning after a fever-free period.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Shortness of breath.
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" />{" "}
                    Wheezing
                  </Text>
                  <Text style={styles.bulletPoint}>
                    <Octicons name="dot-fill" size={14} color="black" /> Intense
                    sore throat, headache or sinus pain.
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
            Most often, you don't need medical care for a common cold. But seek
            medical attention if you have a fever above 102 degrees Fahrenheit,
            chills, vomiting, shortness of breath, stomach pain, or don't get
            better after 10 days.
          </Text>
          <Text style={styles.paragraph}>
            For young children, elderly, pregnant women, or people with weakened
            immune systems, it's best to consult a doctor early.
          </Text>

          <Text style={styles.sectionTitle}>How Long Does It Last?</Text>
          <Text style={styles.paragraph}>
            Most people recover from a common cold in 7 to 10 days. Symptoms
            might last longer in people who smoke.
          </Text>
        </ScrollView>
      )}

      {disease === "COVID" && (
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          <Text style={styles.paragraph}>
            Fever, Coughing, Shortness of breath, Trouble breathing, Fatigue,
            Chills sometimes with shaking, Body aches, Headache, Sore throat,
            Congestion/runny nose, Loss of smell or taste, Nausea, and Diarrhea.
          </Text>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            COVID-19, also known as the coronavirus disease 2019, is an
            infectious disease caused by the SARS-CoV-2 virus. It primarily
            spreads through respiratory droplets when an infected person coughs,
            sneezes, or talks. It can also spread by touching surfaces
            contaminated with the virus and then touching the face.
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.who.int/health-topics/coronavirus#tab=tab_1"
              )
            }
          >
            <Text style={styles.link}>Read more &gt;</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>How It Spreads</Text>
          <Text style={styles.paragraph}>
            COVID-19 spreads from person to person, mostly through:
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            Close contact with infected individuals.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            Inhaling respiratory droplets from coughing, sneezing, or talking.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            Touching surfaces contaminated by the virus and then touching the
            mouth, nose, or eyes.
          </Text>

          <Text style={styles.sectionTitle}>Treatment</Text>
          <Text style={styles.paragraph}>
            There is currently no specific antiviral treatment for COVID-19, but
            treatments are available to help manage symptoms. Hospitalization
            may be required for severe cases, particularly for those with
            breathing difficulties or pneumonia.
          </Text>

          <Text style={styles.sectionTitle}>
            What to Do if You Have Symptoms
          </Text>
          <Text style={styles.paragraph}>
            If you are experiencing symptoms of COVID-19, it is recommended to:
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Stay Home</Text> Isolate
            yourself to prevent spreading the virus.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Get Tested</Text> Schedule a
            test to confirm whether or not you have COVID-19.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Monitor Your Symptoms</Text> If
            symptoms worsen, seek medical attention immediately.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>
              Follow Public Health Guidelines
            </Text>{" "}
            Adhere to local health protocols regarding quarantine or isolation.
          </Text>

          <Text style={styles.sectionTitle}>Prevention</Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Vaccination</Text> Getting
            vaccinated is one of the most effective ways to reduce the risk of
            severe illness, hospitalization, and death from COVID-19.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Mask-Wearing</Text> Wearing a
            mask in crowded places or in areas of high transmission can help
            reduce the spread of the virus.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Social Distancing</Text>{" "}
            Maintain at least 6 feet of distance from others, particularly in
            crowded or indoor settings.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>Hand Hygiene</Text> Wash hands
            frequently with soap and water for at least 20 seconds or use hand
            sanitizer with at least 60% alcohol.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>
              Avoid Touching Your Face
            </Text>{" "}
            Avoid touching your eyes, nose, and mouth with your unwashed hands.
          </Text>
          <Text style={styles.bulletPoint4}>
            <Entypo name="dot-single" size={16} color="black" />
            <Text style={{ fontWeight: "500" }}>
              Disinfecting Surfaces
            </Text>{" "}
            Clean frequently touched surfaces like doorknobs, light switches,
            and phones regularly.
          </Text>

          <Text style={styles.sectionTitle}>When to See a Doctor</Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Don’t wait.</Text> It’s
            important to get tested quickly if you have symptoms of COVID.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>At-Risk Groups</Text> Older
            adults (ages 65 and older), People with underlying health conditions
            such as diabetes, heart disease, or respiratory illnesses, and
            Pregnant women. Seek immediate medical care if you experience:
          </Text>
          <View
            style={{
              justifyContent: "center",
              gap: 5,
              backgroundColor: ColorPalette.greyLight2,
              borderRadius: 20,
              padding: 10,
              paddingLeft: 15,
            }}
          >
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Difficulty
              breathing or shortness of breath
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Persistent
              chest pain or pressure
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Confusion or
              inability to stay awake
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Pale, gray,
              or blue-colored skin, lips, or nail beds: Changes in skin color
              that suggest a lack of oxygen.
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> A sudden or
              new onset of confusion or disorientation.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>How Long Does It Last?</Text>
          <Text style={styles.paragraphTitle}>Mild Cases</Text>
          <Text style={styles.paragraph}>
            For individuals with mild symptoms, the illness usually lasts
            between 7 to 14 days. Most people will begin to feel better after
            the first few days, though some may experience lingering symptoms,
            such as fatigue or a cough, for several weeks.
          </Text>
          <Text style={styles.paragraphTitle}>Severe Cases</Text>
          <Text style={styles.paragraph}>
            In more severe cases, especially for those requiring
            hospitalization, the illness can last several weeks to months.
            People with severe symptoms may experience ongoing complications,
            including damage to the lungs, heart, or other organs.
          </Text>
          <Text style={styles.paragraphTitle}>Long COVID</Text>
          <Text style={styles.paragraph}>
            Some individuals may experience lingering effects even after they
            have recovered from the acute phase of the illness. This is known as
            Long COVID or Post-COVID Conditions, and it can last for weeks or
            months. Common symptoms of Long COVID include:
          </Text>
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "transparent",
              paddingLeft: 15,
            }}
          >
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Extreme
              fatigue
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Shortness of
              breath
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Joint pain
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Brain fog
            </Text>
            <Text style={styles.bulletPoint1}>
              <Octicons name="dot-fill" size={14} color="black" /> Difficulty
              concentrating
            </Text>
          </View>
          <Text style={styles.paragraphTitle}>Recovery Time</Text>
          <Text style={styles.paragraph}>
            Recovery time can vary based on the severity of the infection, with
            people recovering in about 2 weeks for mild cases but potentially
            taking 4-6 weeks or longer for severe cases.
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
  paragraphTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "justify",
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
  bulletPoint1: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
    color: "#333",
    flexDirection: "row",
    textAlign: "justify",
  },
  bulletPoint2: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  bulletPoint3: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    textAlign: "justify",
  },
  bulletPoint4: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 5,
    textAlign: "justify",
  },
  tableContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
});

export default MoreDetails;
