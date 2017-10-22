#include <stdio.h>
#include <emscripten/emscripten.h>
#include <stdlib.h>

int main(int argc, char ** argv) {
    printf("Hello World\n");
}

#ifdef __cplusplus
extern "C" {
#endif

void EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv) {
  printf("MyFunction Called\n");
}

float* EMSCRIPTEN_KEEPALIVE whiteNoise(float *doubleVector) {
  for(int i = 0; i < 1024; i++) {
    doubleVector[i] = rand()/(float)RAND_MAX;
  }
  
  return doubleVector;
}

#ifdef __cplusplus
}
#endif

