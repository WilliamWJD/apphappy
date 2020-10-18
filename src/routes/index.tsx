import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetail from '../pages/OrphanageDetail';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';

import Header from '../components/Header';

const Stack = createStackNavigator();

const Routes:React.FC = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false,
                cardStyle:{ backgroundColor:'#f2f3f5' }
            }}>
                <Stack.Screen 
                    name="OrphanageMap" 
                    component={OrphanagesMap}
                />
                <Stack.Screen 
                    name="OrphanageDetail" 
                    component={OrphanageDetail}
                    options={{
                        headerShown:true,
                        header:()=><Header showCancel={false} title="Orfanato"/>
                    }}
                />
                <Stack.Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown:true,
                        header:()=><Header title="Informe os dados"/>
                    }}
                />
                <Stack.Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown:true,
                        header:()=><Header title="Selecione no mapa"/>
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;