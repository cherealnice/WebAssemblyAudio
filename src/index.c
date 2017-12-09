#include <stdio.h>
#include <emscripten/emscripten.h>
#include <stdlib.h>

int main(int argc, char ** argv) {
    printf("Hello World\n");
}

#ifdef __cplusplus
extern "C" {
#endif

float* EMSCRIPTEN_KEEPALIVE whiteNoise(float *doubleVector) {
  for(int i = 0; i < 1024; i++) {
    doubleVector[i] = rand()/(float)RAND_MAX;
  }
  
  return doubleVector;
}

float* EMSCRIPTEN_KEEPALIVE play(float *doubleVector) {

  return doubleVector;
}

#ifdef __cplusplus
}
#endif
