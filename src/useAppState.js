// ORIGINAL : https://github.com/react-native-community/hooks - useAppState()
import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

export const useAppState = () => {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);
  useEffect(() => {
    function onChange(newState) {
      setAppState(newState);
    }

    const subscription = AppState.addEventListener('change', onChange);

    return () => {
      // @ts-expect-error - React Native >= 0.65
      if (typeof subscription?.remove === 'function') {
        // @ts-expect-error - need update @types/react-native@0.65.x
        subscription.remove();
      } else {
        // React Native < 0.65
        AppState.removeEventListener('change', onChange);
      }
    };
  }, []);

  return appState;
};

// USAGE
// const currentAppState = useAppState()
