// C++ Native Messaging host
// https://browserext.github.io/native-messaging/
// https://developer.chrome.com/docs/apps/nativeMessaging/
// https://discourse.mozilla.org/t/webextension-with-native-messaging-c-app-side/30821
#include <iostream>
using namespace std;

void sendMessage(string message) {
  uint32_t size = uint32_t(message.size());
  char *length = reinterpret_cast<char *>(&size);
  fwrite(length, 4, sizeof(char), stdout);
  fwrite(message.c_str(), message.length(), sizeof(char), stdout);
  fflush(stdout);
}

string getMessage() {
  char length[4];
  fread(length, 4, sizeof(char), stdin);
  uint32_t len = *reinterpret_cast<uint32_t *>(length);
  if (!len) {
    exit(EXIT_SUCCESS);
  }
  char message[len];
  fread(message, len, sizeof(char), stdin);
  string content(message, message + sizeof(message) / sizeof(message[0]));
  return content;
}

int main() {
  string message = getMessage();
  // Exclude double quotation marks from beginning and end of string
  string input = message.substr(1, message.length() - 2);
  FILE *pipe = popen(input.c_str(), "r");
  while (true) {
    unsigned char buffer[1764]; // 441 * 4
    int count = fread(buffer, 1, sizeof(buffer), pipe);
    string output;
    output += "[";
    for (int i = 0; i < count; i++) {
      output += to_string((int)buffer[i]);
      if (i < count - 1) {
        output += ",";
      }
    }
    output += "]";
    sendMessage(output);
  }
}
