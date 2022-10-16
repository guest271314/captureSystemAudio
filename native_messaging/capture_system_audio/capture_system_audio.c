// Native Messaging host C
// https://stackoverflow.com/q/64400254
// https://gist.github.com/zed/4459378be67a4b37f53430e0703cb700
// https://www.reddit.com/r/cpp_questions/comments/vdm4pg/comment/icl1j6s/
// https://www.reddit.com/r/C_Programming/comments/y4omt0/how_to_fix_memory_leak/
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

uint8_t* getMessage(size_t *inputLength) {
  uint32_t messageLength = 0;
  fread(&messageLength, sizeof(messageLength), 1, stdin);
  uint8_t *message = calloc(messageLength, sizeof(*message));
  fread(message, sizeof(*message), messageLength, stdin);
  *inputLength = messageLength;
  return message;
}

void sendMessage(uint8_t *response) {
  const uint32_t responseLength = strlen(response);
  fwrite(&responseLength, sizeof responseLength, 1, stdout);
  fwrite(response, responseLength, 1, stdout);
  fflush(stdout);
}
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

int main(void) {
  size_t messageLength = 0;
  uint8_t *const message = getMessage(&messageLength);
  char *command = strdelch((char *)message, '"');
  uint8_t buffer[1764]; // 441 * 4
  char *output = malloc((1764 * 4) + 3);
  FILE *pipe = popen(command, "r");
  free(message);
  while (1) {
    size_t count = fread(buffer, 1, sizeof(buffer), pipe);
    output[0] = '[';
    output[1] = 0;
    for (size_t i = 0; i < count; i++) {
      char data[5];
      sprintf(data, "%d", buffer[i]);
      strcat(output, data);
      if (i < count - 1) {
        strcat(output, ",");
      }
    }
    strcat(output, "]");
    sendMessage((uint8_t *)output);
  }
  free(output);
  return 0;
}
