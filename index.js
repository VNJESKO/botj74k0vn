const mineflayer = require('mineflayer');
const http = require('http');

// Tạo web server nhỏ để Render không tắt ứng dụng
http.createServer((req, res) => {
  res.write("Bot is running perfectly!");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'tm9271.aternos.me', // IP Aternos của bạn
    port: 17843,                // Bạn nhớ kiểm tra xem số Port trên web Aternos hiện tại có đúng là số này không nhé
    username: 'BotAFK', 
    version: false              
  });

  bot.on('spawn', () => {
    console.log('Bot đã vào server thành công!');
  });

  bot.on('end', () => {
    console.log('Bot bị mất kết nối, đang tự động thử lại sau 15 giây...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Lỗi kết nối (Có thể do sai Port hoặc Server đang tắt): ', err.message);
    setTimeout(createBot, 15000); // Tự động kết nối lại khi có lỗi xảy ra
  });
}

createBot();
