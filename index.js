import {AppRegistry} from 'react-native';
/**
 * @format
 */
import Root from 'index';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Root));
