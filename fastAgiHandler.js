const User = require('./models/Users');
const fastagi = require('fastagi.io');
const db = require('./db'); // Your Knex configuration
const PORT=3000;
 


 
// const handleFastAGI = async (channel) => {
//     console.log('FastAGI connection received');
    
//     // Get the extension from the request parameters
//     const { extension } = channel.params;

//     // Query the database to check if the extension is present
//     try {
//         const user = await User.query().findOne({ extension });
//         if (user) {
//             console.log('User found in the database:', user);
//             // Send a success response
//             channel.sayAlpha('User found');
//         } else {
//             console.log('User not found in the database');
//             // Send a failure response
//             channel.sayAlpha('User not found');
//         }
//     } catch (error) {
//         console.error('Error querying database:', error);
//         // Send an error response
//         channel.sayAlpha('Error querying database');
//     }

//     // Close the channel
//     channel.close();
// };

// const handleFastAGI = async (channel) => {
//     console.log('FastAGI connection received');
  
//     const { extension } = channel.params;
  
//     try {
//       const user = await User.query().findOne({ extension });
//       if (user) {
//         console.log('User found in the database:', user);
//         channel.sayAlpha(`User ${user.name} is available`); // Inform caller
//       } else {
//         console.log('User not found in the database');
//         channel.sayAlpha('User not available');
//       }
//     } catch (error) {
//       console.error('Error querying database:', error);
//       channel.sayAlpha('Error checking user availability');
//     }
  
//     channel.close();
//   };
const handleFastAGI = async (channel) => {
  console.log('FastAGI connection received');

  const { extension } = channel.params;

  try {
    const user = await User.query().findOne({ extension });
    if (user) {
      console.log('User found in the database:', user);
      // await channel.setVariable('USER_AVAILABLE', 'true');
      channel.sayAlpha(`User ${user.name} is available`);
    } else {
      console.log('User not found in the database');
      // await channel.setVariable('USER_AVAILABLE', 'false');
      channel.sayAlpha('User not available');
    }
  } catch (error) {
    console.error('Error querying database:', error);
    // await channel.setVariable('USER_AVAILABLE', 'error');
    channel.sayAlpha('Error checking user availability');
  }

  channel.close();
};

  
  




const agiServer = fastagi();
agiServer.agi('/fastagi', handleFastAGI);
agiServer.listen(PORT, () => {
    console.log(`FastAGI server is running on http://localhost:${PORT}`);
});

module.exports = handleFastAGI;



 

 
