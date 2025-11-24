# WebPro2-Portofolie
Projekt lavet af Johanne Nissen og Emil Haenschke

Link til video af projektet: https://www.youtube.com/watch?v=SqJ4eQy559Q

Projektet køres fra vite-projekt folderen. I terminalen skal der køres følgende kommandoer:

node .\server.js
npm run dev

Forbind også til MongoDB localhost database. Vores database hedder weatherDB og collection hedder dmi_weather_data
Når disse er kørt kan projektet åbnes via linket, som findes i terminalen og vil se således ud:
  ➜  Local:   -----LINK-----
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

Når websiden er åben findes 2 knapper: "Get current weather" og "Get weather history".
"Get current weather" knappen kalder det nyeste datapunkt fra DMI's API, lægger det i databasen og viser det på hjemmesiden.
"Get weather history" knappen kalder databasen og viser de 10 nyeste datapunkter, som er gemt i databasen og viser dem på hjemmesiden.