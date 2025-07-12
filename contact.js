const BOT_TOKEN = "7586409321:AAGgu_O2N-QKaQx9o3HoKdqB809DkFnVKV0";
const CHAT_ID = "6388460910";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const d = new FormData(e.target);
  const msg = `
<b>📬 Yangi Buyurtma!</b>
👤 <b>Ism:</b> ${d.get("fullname")}
📧 <b>Email:</b> ${d.get("email")}
📞 <b>Tel:</b> ${d.get("phone")}
📦 <b>Mahsulot:</b> ${d.get("product")}
  `.trim();

  const status = document.getElementById("status");
  status.textContent = "⏳ Yuborilmoqda...";

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg,
        parse_mode: "HTML"
      })
    });

    if (res.ok) {
      status.textContent = "✅ Yuborildi!";
      e.target.reset();
    } else {
      status.textContent = "❌ Xatolik: yuborilmadi.";
    }
  } catch (err) {
    status.textContent = "❌ Internet muammo.";
  }
});