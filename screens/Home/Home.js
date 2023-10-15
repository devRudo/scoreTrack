import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AverageScoreCard } from "../../components/AverageScoreCard";
import CommonPicker from "../../components/CommonPicker/CommonPicker";
import { ActivityIndicator, Card } from "react-native-paper";
import { CircularProgress } from "../../components/CircularProgress";
import { router } from "expo-router";
import { studentsData } from "../../data";

const Home = () => {
  const [sortBy, setSortBy] = useState("name");
  const [fetchingStudentsList, setFetchingStudentsList] = useState(false);
  const [salutation, setSalutation] = useState("");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    setFetchingStudentsList(true);
    setTimeout(() => {
      setStudents(studentsData?.data || []);
      setFetchingStudentsList(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(new Date().getHours());
    if (new Date().getHours() >= 0 && new Date().getHours() < 12) {
      setSalutation("Good Morning");
    } else if (new Date().getHours() >= 12 && new Date().getHours() < 17) {
      setSalutation("Good Afternoon");
    } else if (new Date().getHours() >= 17 && new Date().getHours() < 24) {
      setSalutation("Good Evening");
    }
  }, [new Date().getHours()]);

  return (
    <View
      style={{
        padding: 15,
        paddingHorizontal: 20,
        gap: 10,
      }}
    >
      {fetchingStudentsList ? (
        <View
          style={{
            minHeight: 300,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text style={{ color: "#999" }}>Fetching students list ....</Text>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            {salutation}!
          </Text>
          <AverageScoreCard students={students}></AverageScoreCard>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Sort by: </Text>
            <View
              style={{
                borderColor: "#d3d3d3",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 5,
              }}
            >
              <CommonPicker
                items={[
                  { label: "Name", value: "name" },
                  {
                    label: "Percentage (low to high)",
                    value: "ascPercentage",
                  },
                  {
                    label: "Percentage (hight to low)",
                    value: "dscPercentage",
                  },
                ]}
                value={sortBy}
                handleChange={(itemValue) => {
                  console.log(itemValue);
                  // console.log(sortBy);
                  setSortBy(itemValue);
                }}
              />
            </View>
          </View>
          <FlatList
            contentContainerStyle={{
              gap: 20,
            }}
            // refreshing={fetchingStudentsList}
            data={students}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/scorecard",
                    params: { id: item.id },
                  })
                }
              >
                <Card
                  contentStyle={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:
                          item.section === "science" ? "#fa661b" : "#fbb03b",
                        borderRadius: 50,
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: 30, color: "#fff", fontWeight: 400 }}
                      >
                        {item.firstName.split("")[0]}
                      </Text>
                    </View>
                    <View
                      style={{
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >
                        {`${item?.firstName} ${item?.lastName}`}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#999",
                        }}
                      >
                        {`${item?.section
                          ?.split("")?.[0]
                          .toUpperCase()}${item?.section
                          ?.split("")
                          ?.slice(1)
                          ?.join("")}`}
                      </Text>
                    </View>
                  </View>
                  <CircularProgress
                    value={item?.scoreInPercentage}
                    size={60}
                    width={8}
                    showWithPercentSign={false}
                  />
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
