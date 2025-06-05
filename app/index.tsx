import { Alert, Text, View } from "react-native"
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin"
import { useState } from "react"

GoogleSignin.configure({
  webClientId:
    "368663170710-mequ32dgtgo5ah0pf2bc1h5uqaas6iv2.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
})

export default function Index() {
  const [user, setUser] = useState<User>()
  const [isInProgress, setIsInProgress] = useState<boolean>(false)

  const signIn = async () => {
    setIsInProgress(true)
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setUser(response.data)
      } else {
        console.log("Sign In could not be completed")
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert("Sign In in progress")

            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Play services not available or outdated")
            // Android only, play services not available or outdated
            break
          default:
            Alert.alert("Some other error happened")
          // some other error happened
        }
      } else {
        Alert.alert("Internal Error during sign in, try again later")
        // an error that's not related to google sign in occurred
      }
    }finally{
      setIsInProgress(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={() => {
    // initiate sign in
  }}
  disabled={isInProgress}
/>;
    </View>
  )
}
