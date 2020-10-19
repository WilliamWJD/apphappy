import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView,{PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import mapMarker from '../../assets/map-marker.png';

interface IOrphanage{
  id:number;
  name:string;
  latitude:number;
  longitude:number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

  const navigation = useNavigation();

  useEffect(()=>{
    async function loadOrphanages(){
      const response = await api.get('/orphanages');
      console.log(response.data)
      setOrphanages(response.data)
    }
    loadOrphanages();
  },[])

  function handleNavigateToDetail(id:number){
    navigation.navigate('OrphanageDetail', { id })
  }

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold
  });

  if(!fontsLoaded){
    return null
  }

  return(
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{
        latitude:-22.8327222,
        longitude:-47.1459692,
        latitudeDelta:0.008,
        longitudeDelta:0.008,
      }}>
        {orphanages.map(orphanage=>(
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x:2.8,
              y:0.8
            }}
            coordinate={{
              latitude:Number(orphanage.latitude),
              longitude:Number(orphanage.longitude),
            }}
          > 
            <Callout tooltip={true} onPress={()=> handleNavigateToDetail(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))} 
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
          <RectButton style={styles.createOrphanageButton} onPress={()=> navigation.navigate('SelectMapPosition')}>
            <Feather name="plus" size={20} color="#fff"/>
          </RectButton>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container:{
    flex:1
  },

  map:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },

  calloutContainer:{
    width:160,
    height:46,
    paddingHorizontal:16,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderRadius:16,
    justifyContent:'center'
  },

  calloutText:{
    color:'#0089a5',
    fontSize:14,
    fontFamily:'Nunito_700Bold'
  },

  footer:{
    position:'absolute',
    left:24,
    right:24,
    bottom:32,

    backgroundColor:'#fff',
    borderRadius:20,
    height:56,
    paddingLeft:24,
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    elevation:3
  },

  footerText:{
    color:'#8fa7b3',
    fontFamily:'Nunito_700Bold'
  },

  createOrphanageButton:{
    width:56,
    height:56,
    backgroundColor:'#15c3d6',
    borderRadius:20,

    justifyContent:'center',
    alignItems:'center'
  }
})

export default OrphanagesMap;