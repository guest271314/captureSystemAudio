// C++ Native Messaging host
// https://browserext.github.io/native-messaging/
// https://developer.chrome.com/docs/apps/nativeMessaging/
// https://discourse.mozilla.org/t/webextension-with-native-messaging-c-app-side/30821
#include <iostream>
using namespace std;

string getMessage() {
  uint32_t length;
  cin.read(reinterpret_cast<char *>(&length), 4);
  string content;
  content.resize(length);
  char* buffer = &(content[0]);
  cin.read(buffer, length);
  return content;
}

void sendMessage(string message) {
  uint32_t size = message.size();
  cout.write(reinterpret_cast<char *>(&size), 4);
  cout.write(message.c_str(), size);
  cout.flush();
}

int main() {
  string message = getMessage();
  // Exclude double quotation marks from beginning and end of string
  FILE *pipe = popen(message.substr(1, message.length() - 2).c_str(), "r");
  while (true) {
    uint8_t buffer[1764]; // 441 * 4
    size_t count = fread(buffer, 1, sizeof(buffer), pipe);
    string output;
    output.reserve((count * 4) + 2);
    output += "[";
    for (size_t i = 0; i < count; i++) {
      output += to_string(buffer[i]);
      if (i < count - 1) {
        output += ",";
      }
    }
    output += "]";
    sendMessage(output);
  }
}
