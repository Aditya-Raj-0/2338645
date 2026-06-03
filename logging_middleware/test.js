const { Log } = require("./src/index");

async function testLog() {
  const result = await Log(
    "frontend",
    "info",
    "page",
    "Testing logging middleware"
  );

  console.log(result);
}

testLog();