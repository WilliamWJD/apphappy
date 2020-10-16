import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetail from '../pages/OrphanageDetail';

const Stack = createStackNavigator();

const Routes:React.FC = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="OrphanageMap" component={OrphanagesMap}/>
                <Stack.Screen name="OrphanageDetail" component={OrphanageDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;