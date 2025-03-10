export default {
  testEnvironment: "node",
  transform: {}, // Asegura que Jest no intente transformar archivos innecesarios
  
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};