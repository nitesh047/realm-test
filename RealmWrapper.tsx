// import {useApp} from '@realm/react';
// import {ActivityIndicator, SafeAreaView} from 'react-native';
// import App from './App'
// import {useEffect, useState} from 'react';
// import { RealmProvider } from "@realm/react";



// function RealmWrapper(): JSX.Element {
//   const app = useApp();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const login = async () => {
//       const credetials = Realm.Credentials.anonymous();
//       await app.logIn(credetials);
//       setIsLoggedIn(true);
//     };
//     login();
//   }, [app]);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       {isLoggedIn ? (
//         <RealmProvider
//         schema={[Task]}>
//           < App/>
//         </RealmProvider>
//       ) : (
//         <ActivityIndicator size={'large'} />
//       )}
//     </SafeAreaView>
//   );
// }

// export default RealmWrapper;
