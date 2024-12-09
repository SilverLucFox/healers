import mongoose from 'mongoose';
import readline from 'readline';

let isRetrying = false; // Flag to track if a retry attempt is already in progress

const connect = async () => {
  if (isRetrying) {
    console.log("Already retrying. Please wait.");
    return; // Prevent retry attempts if one is already in progress
  }
  isRetrying = true; // Set retrying flag

  try {
    // Log before attempting connection
    console.log("Attempting to connect to MongoDB...");

    // Attempt to connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/healers`);
    
    console.log("\x1b[36m");
    console.log("░█████╗░ ░█████╗░ ███╗░░██╗   ████████╗ ░█████╗░   ██████╗░ ██████╗░");
    console.log("██╔══██╗ ██╔══██╗ ████╗░██║   ╚══██╔══╝ ██╔══██╗   ██╔══██╗ ██╔══██╗");
    console.log("██║░░╚═╝ ██║░░██║ ██╔██╗██║   ░░░██║░░░ ██║░░██║   ██║░░██║ ██████╦╝");
    console.log("██║░░██╗ ██║░░██║ ██║╚████║   ░░░██║░░░ ██║░░██║   ██║░░██║ ██╔══██╗");
    console.log("╚█████╔╝ ╚█████╔╝ ██║░╚███║   ░░░██║░░░ ╚█████╔╝   ██████╔╝ ██████╦╝");
    console.log("░╚════╝░ ░╚════╝░ ╚═╝░░╚══╝   ░░░╚═╝░░░ ░╚════╝░   ╚═════╝░ ╚═════╝░");
    console.log("\x1b[0m");

    isRetrying = false; // Reset retrying flag after successful connection
  } catch (error) {
    console.error("\x1b[31mDatabase connection error\x1b[0m", error);

    const errorArt = `
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░█████╗░ ░█████╗░ ███╗░░██╗   ███████╗ ██████╗░ ██████╗░ ░█████╗░ ██████╗░
    ██╔══██╗ ██╔══██╗ ████╗░██║   ██╔════╝ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗
    ██║░░╚═╝ ██║░░██║ ██╔██╗██║   █████╗░░ ██████╔╝ ██████╔╝ ██║░░██║ ██████╦╝
    ██║░░██╗ ██║░░██║ ██║╚████║   ██╔══╝░░ ██╔══██╗ ██╔══██╗ ██║░░██║ ██╔══██╗
    ╚█████╔╝ ╚█████╔╝ ██║░╚███║   ███████╗ ██║░░██║ ██║░░██║ ╚█████╔╝ ██║░░██║
    ░╚════╝░ ░╚════╝░ ╚═╝░░╚══╝   ╚══════╝ ╚═╝░░╚═╝ ╚═╝░░╚═╝ ░╚════╝░ ╚═╝░░╚═╝
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    `;
    
    console.log("\x1b[31m%s\x1b[0m", errorArt);

    // Ask the user to retry connection
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function handleRetry() {
      rl.question("Failed to connect. Do you want to try again? (y/n): ", (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('\x1b[32m%s\x1b[0m', "Attempting another retry...");
          rl.close();
          connect(); // Retry the connection
        } else if (answer.toLowerCase() === 'n') {
          console.log("Stopping further connection attempts.");
          rl.close();
          isRetrying = false; // Reset retry flag when stopping retries
        } else {
          console.log("Invalid input. Please enter 'y' or 'n'.");
          handleRetry(); // Re-prompt on invalid input
        }
      });
    }

    handleRetry();
  }
};

// Initially attempt to connect
connect();

export default connect;
