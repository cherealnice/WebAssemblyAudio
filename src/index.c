const int SIZE = 1024;
int data[1024];

void add(int value) { 
  for (int i=0; i<SIZE; i++) {
    data[i] = data[i] + value;
  }
}

int* getData() {
  return &data[0];
}

void play() {
  for (int i=0; i<SIZE; i++) {
    data[i] = data[i];
  }
}
