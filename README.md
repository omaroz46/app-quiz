**app-quiz** Readme

Schritte zur Installation und Nutzung der App
1. Installation von erforderlichen Tools
Vor der Nutzung dieser App müssen einige Tools installiert werden. Stelle sicher, dass du die folgenden Anweisungen befolgst:

Node.js: Installiere Node.js von der offiziellen Node.js-Website.

Visual Studio Code: Lade Visual Studio Code von der offiziellen VS Code-Website herunter und installiere es.

Android Studio: Lade Android Studio von der offiziellen Android Studio-Website herunter und führe die Standardinstallation durch.

2. Setzen von Umgebungs-Variablen
   
Stelle sicher, dass die folgenden Umgebungsvariablen korrekt gesetzt sind:

JAVA_HOME: C:\Program Files\Android\Android Studio\jbr
ANDROID_HOME: C:\Users{dein_Benutzername}\AppData\Local\Android\Sdk

3. Set up Ionic
Installiere Ionic global mit dem folgenden Befehl:

bash
Copy code
npm i -g @ionic/cli
Starte ein Ionic-Projekt im Browser:

bash
Copy code
ionic serve

4. Installiere Capacitor-Plugins
   
Führe die folgenden Befehle aus, um die erforderlichen Capacitor-Plugins zu installieren:

bash

Copy code

npm install @capacitor/camera

npm install @capacitor/device

npm install @capacitor/share

Synchronisiere Capacitor mit dem Projekt:

bash

Copy code

npx cap sync


5. Vorschau auf einem Android-Gerät

Führe die folgenden Schritte aus, um die App auf einem Android-Gerät zu testen:

bash

Copy code

ionic capacitor add android

ionic build

ionic cap open android

ionic capacitor run android -l --external

Wenn ionic serve läuft, kannst du die Web-App nutzen. Wenn ionic cap open android und ionic capacitor run android -l --external ausgeführt werden, kannst du die App als mobile Anwendung nutzen.
