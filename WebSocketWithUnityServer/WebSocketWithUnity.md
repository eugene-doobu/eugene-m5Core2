<h1>WebSocketWithUnityServer</h1>
This example is for communication between M5Core2 Client and Unity Server.</br>
<img url="m5Core2Client.PNG" alt="m5Core2ClientImg"></br>
</br></br>

<h2>.ino code</h2>
You must change the code in order to execute it.</br></br>

<strong>in setupWifi()</strong></br>
WiFi.begin(_name, _password); // need modify wifi name and password</br>
webSocket.begin(_ip, _port, "/"); // need modify ip and port</br>
</br>
<h2>Unity Server</h2>
<img url="unityServer.PNG" alt="UnityServerImg"></br>
Version: 2020.2.1f1</br>
Platform: Windows x86_64</br>
Api Compatibility Level: .NET 4.x</br>
</br>
<h2>References</h2>
<a href="https://note.com/katsushun89/n/nbd3201ed7536">UnityとM5Stack間をWebSocketで通信して、色を同期させてみた
</a>