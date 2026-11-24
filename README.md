# Remote Controller

This is a remote controller for a Bluetooth device (ex: esp32) that relays on the phone's motion sensors. With a nice ui you can control your device in an easy way.

# Why this proyect?

Well, in the past I did a mini Beest robot [mini Beest robot](https://github.com/rednadp/Robocar), but I didn't do a controller for it. So, one day I thought it would be an amazing idea to control it with the phone, but instead of with a joystick or something similar, with the motion sensors.

# What I have learned

Well, in this project I have foucused more on the ui that on the Bluetooth functionality to be honest. Even more, I haven't even had time to try it in real life. I will do it in the near future. However, my intention was to learn how to do a nicer ui than my previous one and to learn how to use the motion sensors.

# How to use it

Well, I have stablish the UUID that I have found in google that are the default for arduinos and thinks like that. So, the app will connect to the selected device and sent "STOP", "FORWARD", "BACKWARD" in those channels in base64. However, que UUID can be changed in the controller.tsx file if needed.
