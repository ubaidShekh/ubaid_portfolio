import { Pressable, StyleSheet, Text } from 'react-native';

import { View } from 'react-native';

//const MyComposeView = requireNativeComponent('MyComposeUI');

//const { MyNativeModule,LocationModule } = NativeModules;
//const { CameraModule } = NativeModules;



export default function TabTwoScreen() {

{/*
  
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const openCamera = async () => {
  const hasPermission = await requestCameraPermission();

  if (!hasPermission) {
    console.log("Permission denied");
    return;
  }

  try {
    const res = await CameraModule.openCamera();
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};




 const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App ko aapki location chahiye",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.log(err);
    return false;
  }
};

  
   const getLocation = async () => {

      const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    console.log("Permission denied");
    return;
  }
  try {
    const loc = await LocationModule.getLocation();
    console.log("Lat:", loc.latitude);
    console.log("Lng:", loc.longitude);
    return loc;
  } catch (e) {
    console.log("Error:", e);
  }
}; */}
  return (
  
   
        <View style={{ flex: 1 }}>
     {/* <MyComposeView style={{ flex: 1 }} /> */}
       <Pressable 
       //onPress={getLocation}
        style={{position:'absolute',bottom:20,left:20,backgroundColor:'blue',padding:10,borderRadius:5}}> 
        <Text style={{color:'white'}}>Get Location</Text>
       </Pressable>
        <Pressable 
       // onPress={openCamera} 
        style={{position:'absolute',bottom:20,right:20,backgroundColor:'green',padding:10,borderRadius:5}}> 
          <Text style={{color:'white'}}>Open Camera</Text>
        </Pressable>  
    </View>
  

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
