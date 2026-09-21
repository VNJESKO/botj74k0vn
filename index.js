const mineflayer = require('mineflayer');
const http = require('http');

// Giữ cổng mở kết nối với UptimeRobot 24/7
http.createServer((req, res) => {
  res.write("Bot AFK Online Continuous!");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'tm9271.aternos.me', 
    port: 17843, // Giữ nguyên số Port cố định của bạn               
    username: 'BotAFK', // Viết đúng y hệt tên hiển thị trên Aternos
    version: false              
  });

  bot.on('spawn', () => {
    console.log('Bot!');
    
    // Giả lập hành động nhảy tại chỗ sau mỗi 10 giây để giữ kết nối
    setInterval(() => {
      bot.setControlState('jump', true); 
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 10000);
  });

  bot.on('end', (reason) => {
    console.log(`Bot bị thoát do: ${reason}. Đang tự động trở lại sau 15 giây...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Lỗi kết nối mạng: ', err.message);
    setTimeout(createBot, 15000);
  });
}

createBot();
