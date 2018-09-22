// g++ -std=c++11 cpp.cpp -o cpp
#include <iostream>

int main() {
  unsigned int i, count=0;
  for(i=0; i<1000; ++i) {
    count = i;
  }
  std::cout << count << std::endl;
  return 0;
}
