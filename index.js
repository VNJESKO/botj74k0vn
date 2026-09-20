const mineflayer = require('mineflayer');
const http = require('http');

// Tạo một web server nhỏ để giữ bot không bị Render tắt (Keep-Alive)
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'tm9271.aternos.me', // Thay bằng IP server của bạn (bỏ :port)
    port: 17843,                  // Thay bằng số Port của bạn
    username: 'BotAFK_Aternos',   // Tên của bot trong game
    version: false                // Tự động nhận diện phiên bản server });

  bot.on('spawn', () => {
    console.log('Bot đã vào server thành công!');
  });

  // Tự động kết nối lại nếu bị mất kết nối hoặc server restart
  bot.on('end', () => {
    console.log('Bot bị mất kết nối, đang thử lại sau 15 giây...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Lỗi: ', err));
}

createBot();
