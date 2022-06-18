// Native Messaging host C
// https://stackoverflow.com/q/64400254
// https://gist.github.com/zed/4459378be67a4b37f53430e0703cb700
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char *getMessage() {
  uint32_t message_length;
  fread(&message_length, sizeof message_length, 1, stdin);
  char *message = malloc(message_length);
  fread(message, sizeof *message, message_length, stdin);
  return message;
}

void sendMessage(const char *response) {
  const uint32_t response_length = strlen(response);
  fwrite(&response_length, sizeof response_length, 1, stdout);
  fwrite(response, response_length, 1, stdout);
  fflush(stdout);
}

int main() {
  const char *message = getMessage();
  // Exclude double quotation marks from beginning and end of string
  // https://stackoverflow.com/a/67259615
  char *strdelch(char *str, char ch) {
    char *current = str;
    char *tail = str;

    while (*tail) {
      if (*tail == ch) {
        tail++;
      } else {
        *current++ = *tail++;
      }
    }
    *current = 0;
    return str;
  }
  char *command = strdelch((char *)message, '"');
  uint8_t buffer[1764]; // 441 * 4
  // https://www.reddit.com/r/cpp_questions/comments/vdm4pg/comment/icl1j6s/
  char *output = malloc(1764 * 4 + 3);
  fflush(NULL);
  FILE *pipe = popen(command, "r");
  while (1) {
    size_t count = fread(buffer, 1, sizeof(buffer), pipe);
    output[0] = '[';
    output[1] = 0;
    for (size_t i = 0; i < count; i++) {
      char cbuf[5];
      sprintf(cbuf, "%d", (int)buffer[i]);
      strcat(output, cbuf);
      if (i < count - 1) {
        strcat(output, ",");
      }
    }
    strcat(output, "]");
    sendMessage((const char *)output);
    fflush(NULL);
  }
  free(output);
  free(buffer);
}
