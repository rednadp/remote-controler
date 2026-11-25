#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEService.h>
#include <BLEUtils.h>

const String SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const String CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const int MOTOR_N1 = 25;
const int MOTOR_N2 = 26;

class CarCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String command = pCharacteristic->getValue().c_str();

    if (command.length() > 0) {
      Serial.print("Recived command: ");
      Serial.println(command);

      if (command == "Forwards") {
        digitalWrite(MOTOR_N1, HIGH);
        digitalWrite(MOTOR_N2, LOW);
      } else if (command == "Backwards") {
        digitalWrite(MOTOR_N1, LOW);
        digitalWrite(MOTOR_N2, HIGH);
      } else if (command == "Stop") {
        digitalWrite(MOTOR_N1, LOW);
        digitalWrite(MOTOR_N2, LOW);
      };
    };

  };
};


class ServerCallbacks : public BLEServerCallbacks {
  void onDisconnect(BLEServer* pServer) {
    digitalWrite(MOTOR_N1, LOW);
    digitalWrite(MOTOR_N2, LOW);
    BLEDevice::startAdvertising();
  };
};


void setup() {

  Serial.begin(115200);

  pinMode(MOTOR_N1, OUTPUT);
  pinMode(MOTOR_N2, OUTPUT);
  digitalWrite(MOTOR_N1, LOW);
  digitalWrite(MOTOR_N2, LOW);

  BLEDevice::init("ESP32-Car");

  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);

  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_WRITE_NR
  );

  pCharacteristic->setCallbacks(new CarCallbacks());

  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  BLEDevice::startAdvertising();

  Serial.println("ESP32 ready, listening for connetionss.");
}

void loop() {
  delay(20);
}
