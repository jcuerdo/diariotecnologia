rm DiarioTecnologia.apk
rm app-release-unsigned.apk
ionic cordova build android --release 
mv platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./
#keytool -genkey -v -keystore diariotecnologia.jks -keyalg RSA -keysize 2048 -validity 10000 -alias diariotecnologia
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore diariotecnologia.jks app-release-unsigned.apk diariotecnologia
~/Library/Android/sdk/build-tools/29.0.0/zipalign -v 4 app-release-unsigned.apk DiarioTecnologia.apk
