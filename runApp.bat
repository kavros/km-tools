start /min cmd.exe /c http-server -p 4200
start /min cmd.exe /c java -jar  rest-service-0.0.1-SNAPSHOT.jar
start /min chrome http://localhost:4200/