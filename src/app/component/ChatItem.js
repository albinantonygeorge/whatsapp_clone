// const { Card } = require("@mui/material")

// function ChatItem({ sender, message, time, status }) {
//     return (
//         <Card>
//             {sender}: {message}
//             <p>{time}</p>
//             <p>{status}</p>
//         </Card>
//     )
// }

// export default ChatItem

// Function to generate a random name
function generateRandomName() {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Katie', 'Leo', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rose', 'Sam', 'Tara', 'Uma', 'Vincent', 'Wendy', 'Xavier', 'Yara', 'Zack'];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  // Generate 20 random contacts
  const contacts = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, name: generateRandomName() }));
  
  // Generate conversations for each contact
  const messages = [];
  contacts.forEach(contact => {
    for (let i = 0; i < 10; i++) {
      messages.push({
        sender: contact.name,
        message: `Message ${i + 1} from ${contact.name}`,
        time: `${(10 + i).toString().padStart(2, '0')}:00 AM`
      });
    }
  });
  
  console.log('Contacts:', contacts);
  console.log('Messages:', messages);
  