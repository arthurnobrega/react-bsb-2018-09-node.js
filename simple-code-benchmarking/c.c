// gcc -Wall c.c -o c
#include <stdio.h>

int main() {
  int count = 0;
  int i = 0;
  for(; i<1000; i++) {
    count += i;
  }
  printf("%d\n", count);
}
