import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { block } from "react-native-reanimated";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Manufacturers = [
  {
    brand: "Nissan",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/1189px-Nissan-logo.svg.png",
  },
  {
    brand: "Hyundai",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    brand: "SAIC",
    image:
      "https://www.logotaglines.com/wp-content/uploads/2018/11/SAIC-Motor-Logo-Tagline-1200x900.jpg",
  },
  {
    brand: "BMW",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
  },
  {
    brand: "Honda",
    image:
      "https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-transparent-background-0.jpg",
  },
  {
    brand: "General Motors",
    image:
      "https://www.cnet.com/a/img/-rlJ3In8npt8NI2TupwEH8zNJd0=/940x0/2021/01/08/16573426-bb3b-4513-9451-a5e05f729f9a/gm.jpg",
  },
  {
    brand: "Ford",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/2560px-Ford_Motor_Company_Logo.svg.png",
  },
  {
    brand: "Daimler",
    image: "https://soulof.yoga/wp-content/uploads/2020/12/Daimler.jpg",
  },
  {
    brand: "Volkswagen",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    brand: "Toyota",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBuxbwzgYbFZjNcTByyadAnKtVzpNIqBfFFL0JHLTNXFNnrmamK3Dkdqr2OTY1Hy_w8Ro&usqp=CAU",
  },
];

const uploadData = (make, model, makeYear, engineCapacity, color, image) => {
  var requestOptions = {
    method: "POST",
    body: JSON.stringify({
      Make: make,
      Model: model,
      Year: makeYear,
      EngineCapacity: engineCapacity,
      Color: color,
      Image: image,
    }),
  };

  fetch(
    "https://labterminal-1300a-default-rtdb.asia-southeast1.firebasedatabase.app/Cars.json",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ManageCars = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [isRefreshing, setisRefreshing] = useState(true);

  const retireveData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "https://labterminal-1300a-default-rtdb.asia-southeast1.firebasedatabase.app/Cars.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let arr = Object.entries(result).map((item) => ({
          ...item[1],
          key: item[0],
        }));
        console.log(arr);
        setisRefreshing(false);
        setCars(arr);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteData = (deleteKey) => {
    var requestOptions = {
      method: "DELETE",
    };

    fetch(
      "https://labterminal-1300a-default-rtdb.asia-southeast1.firebasedatabase.app/Cars/" +
        deleteKey +
        ".json",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setisRefreshing(true);
        wait(4000).then(retireveData());
      })
      .catch((error) => console.log("error", error));
  };

  console.log(cars);
  useEffect(() => {
    retireveData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "silver" }}>
      <FlatList
        data={cars}
        onRefresh={() => {
          setisRefreshing(true);
          retireveData();
        }}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View
              style={{ backgroundColor: "white", padding: 5, marginBottom: 5 }}
              key={item.key}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "85%",
                    borderColor: "darkslategray",
                    borderRightWidth: 5,
                    borderBottomWidth: 2,
                    borderBottomRightRadius: 100,
                  }}
                >
                  <Image
                    style={{
                      width: "99%",
                      height: 150,
                      borderColor: "black",
                      borderRightWidth: 2,
                      borderBottomRightRadius: 100,
                    }}
                    source={{ uri: item.Image }}
                    resizeMode="cover"
                  />
                </View>
                <Ionicons
                  name="ios-trash"
                  color="#d9534f"
                  size={40}
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    Alert.alert(
                      "Delete " + item.Make + " " + item.Model + " ?",
                      "",
                      [
                        {
                          text: "No",
                          onPress: () => {},
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            deleteData(item.key);
                          },
                        },
                      ]
                    );
                  }}
                />
              </View>
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={() => {
                  navigation.navigate("Cars Details", { data: item });
                }}
              >
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: "bold",
                    color: "darkslategray",
                  }}
                >
                  {item.Make}
                </Text>
                <Text style={{ fontSize: 20, color: "darkslategray" }}>
                  {item.Model}
                </Text>
                <Text>Read more{">>"}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
const CarsDetails = ({ navigation, route }) => {
  const { data } = route.params;

  console.log(data);
  return (
    <ScrollView>
      <View style={{height:250}}>
      <ImageBackground
          style={{ width: "100%", height: 250 }}
          source={{ uri: data.Image }}
          >
        <LinearGradient colors={['transparent','black']} style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom:0,
      height: '30%'
   }}/>
          </ImageBackground>
          
      </View>
      <View style={{marginTop:20,width:'90%', borderWidth:2,borderRadius:25, alignSelf:"center"}}>
      <Text style={{fontSize:32, fontWeight:'bold',alignSelf:'center'}}>Specifications</Text>
      <View style={{ marginVertical:10,flexDirection: "row", justifyContent:"space-between", alignSelf:'center'}}>
        <Text style={{fontSize:28, fontWeight:'bold'}}>Make:</Text>
        <Text style={{fontSize:28}}>{data.Make}</Text>
      </View>
      <View style={{ marginVertical:10,flexDirection: "row", justifyContent:"space-between", alignSelf:'center'}}>
        <Text style={{fontSize:28, fontWeight:'bold'}}>Model:</Text>
        <Text style={{fontSize:28}}>{data.Model}</Text>
      </View>
      <View style={{ marginVertical:10,flexDirection: "row", justifyContent:"space-between", alignSelf:'center'}}>
        <Text style={{fontSize:28, fontWeight:'bold'}}>Year:</Text>
        <Text style={{fontSize:28}}>{data.Year}</Text>
      </View>
      <View style={{ marginVertical:10,flexDirection: "row", justifyContent:"space-between", alignSelf:'center'}}>
        <Text style={{fontSize:28, fontWeight:'bold'}}>Engine:</Text>
        <Text style={{fontSize:28}}>{data.EngineCapacity}</Text>
      </View>
      <View style={{ marginVertical:10,flexDirection: "row", justifyContent:"space-between", alignSelf:'center'}}>
        <Text style={{fontSize:28, fontWeight:'bold'}}>Color:</Text>
        <Text style={{fontSize:28}}>{data.Color}</Text>
      </View>
      </View>
    </ScrollView>
  );
};
const AddNewCars = ({ navigation }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [makeYear, setMakeYear] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [color, setColor] = useState("");
  const [pictureURL, setPictureURL] = useState("");

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 28 }}>Enter Car Details</Text>
      <TextInput
        style={{
          width: "70%",
          marginVertical: 10,
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
        }}
        placeholder="Make"
        value={make}
        onChangeText={(text) => {
          setMake(text);
        }}
      />
      <TextInput
        style={{
          width: "70%",
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
        }}
        placeholder="Model"
        value={model}
        onChangeText={(text) => {
          setModel(text);
        }}
      />
      <TextInput
        style={{
          width: "70%",
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
        }}
        placeholder="Year"
        keyboardType="numeric"
        value={makeYear}
        onChangeText={(text) => {
          if (text > -1 && text < 999999) setMakeYear(text);
        }}
      />
      <TextInput
        style={{
          width: "70%",
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
        }}
        placeholder="Engine Capacity"
        value={engineCapacity}
        onChangeText={(text) => {
          setEngineCapacity(text);
        }}
      />
      <TextInput
        style={{
          width: "70%",
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
        }}
        placeholder="Color"
        value={color}
        onChangeText={(text) => {
          setColor(text);
        }}
      />
      <TextInput
        style={{
          width: "70%",
          padding: 10,
          borderRadius: 10,
          borderBottomWidth: 2,
        }}
        placeholder="Image URL"
        value={pictureURL}
        onChangeText={(text) => {
          setPictureURL(text);
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor:
            make == "" ||
            model == "" ||
            makeYear == "" ||
            engineCapacity == "" ||
            color == "" ||
            pictureURL == ""
              ? "gray"
              : "#42ba96",
          marginTop: 25,
          width: "40%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          borderRadius: 100,
        }}
        disabled={
          make == "" &&
          model == "" &&
          makeYear == "" &&
          engineCapacity == "" &&
          color == "" &&
          pictureURL == ""
            ? true
            : false
        }
        onPress={() => {
          uploadData(make, model, makeYear, engineCapacity, color, pictureURL);
          navigation.goBack();
        }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
const ManageBrands = ({navigation}) => {
  
  return (
    <ScrollView>
      {Manufacturers.map((item, index) => {
        return (
          <View
            style={{
              marginVertical: 5,
              alignItems: "center",
              backgroundColor: "white",
            }}
            key={index}
          >
            <Image
              style={{ width: 150, height: 150, borderRadius: 100 }}
              source={{ uri: item.image }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {item.brand}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Manage Cars">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Ionicons
                name="reorder-three-outline"
                size={32}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Ionicons
                name="ios-add"
                size={40}
                onPress={() => {
                  navigation.navigate("Add new Car");
                }}
              />
            </View>
          ),
        }}
        name="Manage Cars"
        component={ManageCars}
      />
      <Stack.Screen name="Cars Details" component={CarsDetails} />
      <Stack.Screen name="Add new Car" component={AddNewCars} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Manage Cars" component={HomeScreen} />
        <Drawer.Screen
          options={{
            headerShown: true,
          }}
          name="Manage Brands"
          component={ManageBrands}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
