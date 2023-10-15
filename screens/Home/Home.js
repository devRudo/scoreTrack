import React, { memo, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AverageScoreCard } from "../../components/AverageScoreCard";
import CommonPicker from "../../components/CommonPicker/CommonPicker";
import { ActivityIndicator, Button, Card } from "react-native-paper";
import { CircularProgress } from "../../components/CircularProgress";
import { router } from "expo-router";
import { studentsData } from "../../data";
import { CardBase } from "../../components/CardBase";

const StudentCard = memo(function StudentCard({ item }) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/scorecard",
          params: { id: item.id },
        })
      }
    >
      <CardBase
        style={{
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
            flex: 1,
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
            <Text style={{ fontSize: 30, color: "#fff", fontWeight: 400 }}>
              {item.firstName.split("")[0]}
            </Text>
          </View>
          <View
            style={{
              gap: 5,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                flexWrap: "wrap",
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
              {`${item?.section?.split("")?.[0].toUpperCase()}${item?.section
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
      </CardBase>
    </TouchableOpacity>
  );
});

const Home = () => {
  const [sortBy, setSortBy] = useState("name");
  const [fetchingStudentsList, setFetchingStudentsList] = useState(false);
  const [salutation, setSalutation] = useState("");
  const flatlistRef = useRef(null);
  const [showMoveToTop, setShowMoveToTop] = useState(false);

  const [students, setStudents] = useState([]);

  const handleScroll = (e) => {
    // if (e?.nativeEvent?.contentOffset?.y > 500) {
    //   setShowMoveToTop(true);
    // } else {
    //   setShowMoveToTop(false);
    // }
  };

  useEffect(() => {
    setStudents(
      studentsData?.data?.sort((a, b) => {
        let valueA;
        let valueB;
        if (sortBy === "name") {
          valueA = a.firstName.toUpperCase();
          valueB = b.firstName.toUpperCase();
        } else if (sortBy === "ascPercentage") {
          valueA = a.scoreInPercentage;
          valueB = b.scoreInPercentage;
        }
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        } else if (sortBy === "dscPercentage") {
          valueA = a.scoreInPercentage;
          valueB = b.scoreInPercentage;
        }
        if (valueA > valueB) {
          return -1;
        }
        if (valueA < valueB) {
          return 1;
        }
        return 0;
      }) || []
    );
  }, [sortBy]);

  useEffect(() => {
    setFetchingStudentsList(true);
    setTimeout(() => {
      setStudents(
        studentsData?.data?.sort((a, b) => {
          const nameA = a.firstName.toUpperCase();
          const nameB = b.firstName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }) || []
      );
      setFetchingStudentsList(false);
    }, 2000);
  }, []);

  useEffect(() => {
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
        flex: 1,
        gap: 10,
        position: "relative",
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
          <View style={{ gap: 15, padding: 15, paddingHorizontal: 20 }}>
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
                    setSortBy(itemValue);
                  }}
                />
              </View>
            </View>
          </View>
          <FlatList
            contentContainerStyle={{
              gap: 20,
              padding: 5,
              paddingHorizontal: 15,
              // paddingBottom: 350,
            }}
            ref={flatlistRef}
            onScroll={(e) => handleScroll(e)}
            data={students}
            renderItem={({ item }) => <StudentCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
      {showMoveToTop ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1111111,
            width: "100%",
          }}
        >
          <Button
            mode="contained"
            icon={"arrow-up"}
            onPress={() => {
              flatlistRef.current.scrollToOffset({
                animated: true,
                offset: 0,
              });
            }}
            buttonColor="#d3d3d3"
            textColor="#343a40"
          >
            <Text>Move To Top</Text>
          </Button>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
