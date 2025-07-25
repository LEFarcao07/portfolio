document.addEventListener("DOMContentLoaded", function () {
function getToastOptions(icon, message) {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    toast: true,
    position: 'bottom',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 2200,
    width: 'auto',
    background: isDark ? 'rgba(31, 41, 55, 0.85)' : 'rgba(255, 255, 255, 0.9)',
    color: isDark ? '#f3f4f6' : '#1f2937',
    customClass: {
      popup: 'rounded-xl shadow-xl px-4 py-2 text-sm'
    }
  };
}

const menu = document.getElementById("customContextMenu");

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;

  let posX = e.clientX;
  let posY = e.clientY;

  if (posX + menuWidth > winWidth) posX = winWidth - menuWidth - 10;
  if (posY + menuHeight > winHeight) posY = winHeight - menuHeight - 10;

  menu.style.top = posY + "px";
  menu.style.left = posX + "px";
  menu.classList.remove("hidden");
});

document.addEventListener("click", () => {
  menu.classList.add("hidden");
});

window.copyText = function () {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    navigator.clipboard.writeText(selectedText)
      .then(() => {
        Swal.fire(getToastOptions('success', 'Teks disalin!'));
      })
      .catch(() => {
        Swal.fire(getToastOptions('error', 'Gagal menyalin'));
      });
  } else {
    Swal.fire(getToastOptions('warning', 'Sorot dulu teksnya!'));
  }
  menu.classList.add("hidden");
};


window.toggleDarkMode = function () {
  document.documentElement.classList.toggle("dark");
  menu.classList.add("hidden");
};

  // Efek hover yang lebih dinamis
  document.querySelectorAll(".project-card, .skill-badge").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-10px) scale(1.02)";
      item.style.boxShadow =
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0) scale(1)";
      item.style.boxShadow = "";
    });
  });

  // Efek scroll reveal untuk teks
  function animateTextOnScroll() {
    const textElements = document.querySelectorAll("h1, h2, h3, p");

    textElements.forEach((el) => {
      const elPosition = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elPosition < windowHeight * 0.75) {
        el.classList.add("text-reveal");
      }
    });
  }

  // Jalankan saat load dan scroll
  window.addEventListener("load", animateTextOnScroll);
  window.addEventListener("scroll", animateTextOnScroll);

  const portfolioTitle = document.getElementById("portfolio-title");
  let easterEggTriggered = false;

  if (portfolioTitle) {
    portfolioTitle.addEventListener("click", function (e) {
      // Prevent default only if it's not the first click
      if (easterEggTriggered) {
        e.preventDefault();
        return;
      }

      easterEggTriggered = true;

      // Get all elements except script, style, and cursor elements
      const allElements = document.querySelectorAll(
        "body *:not(script):not(style):not(.cursor-outer):not(.cursor-inner)"
      );

      // Make all elements fall simultaneously
      allElements.forEach((el) => {
        if (el.classList.contains("falling-element")) return;

        // Save original position and styles
        const rect = el.getBoundingClientRect();
        // Save original styles
        el.dataset.originalPosition = window.getComputedStyle(el).position;
        el.dataset.originalTop = rect.top;
        el.dataset.originalLeft = rect.left;

        // Apply falling animation
        el.classList.add("falling-element");

        // Set fixed position at original location
        el.style.position = "fixed";
        el.style.top = `${rect.top}px`;
        el.style.left = `${rect.left}px`;
        el.style.width = `${rect.width}px`;
        el.style.height = `${rect.height}px`;

        // Random rotation for more natural effect
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        const rotationDegrees = 5 + Math.random() * 15;
        el.style.transform = `rotateZ(${
          rotationDegrees * rotationDirection
        }deg)`;
      });

      // Show notification and reload after animation
      setTimeout(() => {
        Swal.fire({
          title: "New Text",
          text: "New Text",
          icon: "warning",
          confirmButtonText: "New Text",
        }).then(() => {
          location.reload();
        });
      }, 3000);
    });
  }

  // Eye tracking for chatbot
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      // Hanya aktif di desktop
      const eyes = document.querySelectorAll(".pupil");
      const eyesContainer = document.querySelector("#chatbotIcon");
      if (eyes.length && eyesContainer) {
        const rect = eyesContainer.getBoundingClientRect();

        // Posisi tengah ikon
        const iconCenterX = rect.left + rect.width / 2 + window.scrollX;
        const iconCenterY = rect.top + rect.height / 2 + window.scrollY;

        // Hitung sudut antara kursor dan tengah ikon
        const angle = Math.atan2(e.pageY - iconCenterY, e.pageX - iconCenterX);

        // Jarak maksimal pupil bergerak (dalam px)
        const distance = 2;

        // Posisi pupil
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        eyes.forEach((eye) => {
          eye.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
      }
    }
  });

  // Chatbot functionality
  const chatbotIcon = document.getElementById("chatbotIcon");
  const chatbotBox = document.getElementById("chatbotBox");
  const closeBtn = document.getElementById("closeBtn");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const buttonOptions = document.getElementById("buttonOptions");

  const qaPairs = [
    {
      question: "Apa keahlian Anda?",
      answer:
        "Saya ahli dalam pengembangan web, desain UI/UX, dan JavaScript modern.",
    },
    {
      question: "Bisa lihat proyek terbaru?",
      answer:
        "Silakan kunjungi bagian <a href='#projects' class='text-indigo-600 underline'>Projects</a> di portfolio ini.",
    },
    {
      question: "Bagaimana kontak Anda?",
      answer:
        "Email: lefarcao@gmail.com<br>LinkedIn: <a href='https://www.linkedin.com/in/lefarcao' target='_blank' class='text-indigo-600 underline'>link</a>",
    },
    {
      question: "Teknologi apa yang digunakan?",
      answer:
        "Tech stack favorit: React, Tailwind CSS, Node.js, dan Figma untuk desain.",
    },
  ];

  function renderButtons() {
    if (buttonOptions) {
      buttonOptions.innerHTML = qaPairs
        .map(
          (qa) => `
        <button 
          class="option-btn border-transparent bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-3 rounded-lg text-sm transition-colors"
          data-question="${qa.question}"
          data-answer="${qa.answer.replace(/"/g, "&quot;")}"
        >
          ${qa.question}
        </button>
      `
        )
        .join("");
    }
  }

  function addMessage(message, isBot = true, isHTML = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `mb-3 ${isBot ? "" : "text-right"}`;

    const bubble = document.createElement("div");
    bubble.className = `inline-block rounded-lg px-4 py-2 max-w-[85%] ${
      isBot
        ? "bg-gray-200 rounded-tl-none"
        : "bg-primary text-white rounded-tr-none"
    }`;

    bubble[isHTML ? "innerHTML" : "textContent"] = message;

    messageDiv.appendChild(bubble);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleOptionClick(e) {
    if (e.target.classList.contains("option-btn")) {
      const question = e.target.getAttribute("data-question");
      const answer = e.target.getAttribute("data-answer");

      addMessage(question, false);
      setTimeout(() => {
        addMessage(answer, true, true);
      }, 500);
    }
  }

  function openChatbot() {
    chatbotBox.classList.remove("hidden");
    chatbotBox.classList.add("flex");
    chatbotIcon.classList.add("hidden");

    initWeather();
    setInterval(updateClock, 1000);
  }

  function closeChatbot() {
    chatbotBox.classList.add("hidden");
    chatbotBox.classList.remove("flex");
    chatbotIcon.classList.remove("hidden");
  }

  chatbotIcon.addEventListener("click", openChatbot);
  closeBtn.addEventListener("click", closeChatbot);
  buttonOptions.addEventListener("click", handleOptionClick);

  // Fungsi utama untuk mendapatkan lokasi dan cuaca
  async function initWeather() {
    showLoading(true);

    try {
      // 1. Dapatkan lokasi pengguna
      const position = await getUserLocation();

      // 2. Dapatkan data cuaca berdasarkan koordinat
      const weatherData = await getWeatherByCoords(
        position.coords.latitude,
        position.coords.longitude
      );

      // 3. Update tampilan dengan data cuaca
      updateWeatherDisplay(weatherData);

      // 4. Update waktu lokal
      updateLocalTime(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.error("Error:", error);
      // Fallback ke lokasi default jika gagal
      fallbackWeather();
    } finally {
      showLoading(false);
    }
  }

  // 1. Fungsi untuk mendapatkan lokasi pengguna
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => {
            console.warn("Geolocation error:", error);
            reject(error);
          },
          { timeout: 5000 }
        );
      } else {
        reject(new Error("Geolocation tidak didukung"));
      }
    });
  }

  // 2. Fungsi untuk mendapatkan cuaca berdasarkan koordinat
  async function getWeatherByCoords(lat, lon) {
    try {
      const apiKey = "4bd8b8484f06fff4f8d3c8e1b9f79057"; // Ganti dengan API key Anda
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=id`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  }

  // 3. Fungsi untuk menampilkan data cuaca
  function updateWeatherDisplay(weatherData) {
    const weatherIcon = document.getElementById("weather-icon");
    const currentTemp = document.getElementById("current-temp");
    const weatherDesc = document.getElementById("weather-desc");
    const currentLocation = document.getElementById("current-location");

    // Set icon berdasarkan kondisi cuaca
    const weatherCode = weatherData.weather[0].id;
    weatherIcon.textContent = getWeatherIcon(weatherCode);

    currentTemp.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherDesc.textContent = translateWeatherDesc(
      weatherData.weather[0].description
    );
    currentLocation.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
  }

  // 4. Fungsi untuk update waktu lokal
  function updateLocalTime(lat, lon) {
    const timeElement = document.getElementById("current-time");

    // Fallback: Tampilkan waktu device dulu sambil loading
    updateClock(new Date());

    // Gunakan API TimezoneDB dengan key yang valid (daftar di https://timezonedb.com/api)
    const apiKey = "Z1UF5NWLGLLH"; // Ganti dengan API key TimezoneDB yang valid

    fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (data.status !== "OK") throw new Error(data.message);

        const localTime = new Date(data.formatted);
        updateClock(localTime);
      })
      .catch((error) => {
        console.error("Error fetching timezone:", error);
        // Fallback ke waktu device dengan notifikasi
        updateClock(new Date());
        addMessage(
          "Couldn't fetch local time. Showing device time instead.",
          true
        );
      });
  }

  function updateClock(date = new Date()) {
    const timeElement = document.getElementById("current-time");
    if (!timeElement) return;

    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };

    timeElement.textContent = date.toLocaleTimeString(undefined, options);
  }

  // Tambahkan fungsi ini di script.js Anda
  function updateDateTime() {
    const now = new Date();

    // Update tanggal (Mon, Jun 5)
    const dateElement = document.getElementById("current-date");
    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }

    // Update waktu lengkap (12:34 PM)
    const timeFullElement = document.getElementById("current-time-full");
    if (timeFullElement) {
      timeFullElement.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
    }
  }

  // Panggil fungsi ini setiap detik
  setInterval(updateDateTime, 1000);

  // Panggil sekali saat pertama kali load
  updateDateTime();

  // Fungsi pembantu
  function getWeatherIcon(weatherCode) {
    const icons = {
      // Cuaca cerah
      800: "☀️",
      // Berawan
      801: "⛅",
      802: "⛅",
      803: "☁️",
      804: "☁️",
      // Hujan
      500: "🌧️",
      501: "🌧️",
      502: "🌧️",
      503: "🌧️",
      504: "🌧️",
      300: "🌦️",
      301: "🌦️",
      302: "🌦️",
      310: "🌦️",
      311: "🌦️",
      312: "🌦️",
      // Hujan lebat
      520: "🌧️",
      521: "🌧️",
      522: "🌧️",
      // Badai
      200: "⛈️",
      201: "⛈️",
      202: "⛈️",
      210: "⛈️",
      211: "⛈️",
      212: "⛈️",
      // Salju
      600: "❄️",
      601: "❄️",
      602: "❄️",
      611: "🌨️",
      612: "🌨️",
      613: "🌨️",
      // Kabut
      701: "🌫️",
      711: "🌫️",
      721: "🌫️",
      731: "🌫️",
      741: "🌫️",
    };
    return icons[weatherCode] || "🌤️";
  }

  function translateWeatherDesc(desc) {
    const translations = {
      "clear sky": "Cerah",
      "few clouds": "Sedikit Berawan",
      "scattered clouds": "Berawan",
      "broken clouds": "Berawan Tebal",
      "shower rain": "Hujan Ringan",
      rain: "Hujan",
      thunderstorm: "Badai Petir",
      snow: "Salju",
      mist: "Kabut",
    };
    return translations[desc.toLowerCase()] || desc;
  }

  function showLoading(show) {
    const loadingElement = document.getElementById("weather-loading");
    loadingElement.style.display = show ? "flex" : "none";
  }

  function fallbackWeather() {
    document.getElementById("weather-icon").textContent = "🌤️";
    document.getElementById("current-temp").textContent = "--°C";
    document.getElementById("weather-desc").textContent =
      "Tidak dapat memuat data cuaca";
    document.getElementById("current-location").textContent =
      "Lokasi tidak diketahui";
  }

  // Panggil initWeather saat chatbox dibuka
  chatbotIcon.addEventListener("click", () => {
    chatbotBox.classList.toggle("hidden");
    chatbotBox.classList.toggle("flex");
    chatbotIcon.classList.toggle("hidden");

    if (!chatbotBox.classList.contains("hidden")) {
      initWeather();
      setInterval(updateClock, 1000);
    }
  });

  if (chatbotIcon && chatbotBox) {
    // Tambahkan pesan ke chat
    function addMessage(message, isBot = true, isHTML = false) {
      if (!chatbotMessages) return;

      const messageDiv = document.createElement("div");
      messageDiv.className = `mb-3 ${isBot ? "" : "text-right"}`;

      const bubble = document.createElement("div");
      bubble.className = `inline-block rounded-lg px-4 py-2 max-w-[85%] ${
        isBot
          ? "bg-gray-200 rounded-tl-none"
          : "bg-primary text-white rounded-tr-none"
      }`;

      if (isHTML) {
        bubble.innerHTML = message;
      } else {
        bubble.textContent = message;
      }

      messageDiv.appendChild(bubble);
      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Event Listeners
    chatbotIcon.addEventListener("click", () => {
      chatbotBox.classList.toggle("hidden");
      chatbotBox.classList.toggle("flex");
      chatbotIcon.classList.toggle("hidden");
      renderButtons();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        chatbotBox.classList.add("hidden");
        chatbotBox.classList.remove("flex");
        chatbotIcon.classList.remove("hidden");
      });
    }

    if (buttonOptions) {
      buttonOptions.addEventListener("click", handleOptionClick);
    }

    // Pesan pembuka otomatis
    setTimeout(() => {
      addMessage(
        "Pilih pertanyaan di bawah atau klik ikon x jika ingin menutup ini",
        true
      );
    }, 1500);
  }

  // Theme Management System (Bagian Penting untuk Menyimpan Tema)
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

  // Fungsi untuk mengatur tema awal
  function setInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add("hidden");
      if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
      if (themeToggleLightIcon) themeToggleLightIcon.classList.add("hidden");
    }
  }

  // Fungsi untuk toggle tema
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    // Toggle class dark pada html
    html.classList.toggle("dark");

    // Simpan preferensi tema
    localStorage.setItem("theme", isDark ? "light" : "dark");

    // Update icon toggle
    if (themeToggleDarkIcon && themeToggleLightIcon) {
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");
    }
  }

  // Sinkronisasi tema antar tab
  function syncTheme(event) {
    if (event.key === "theme") {
      const newTheme = event.newValue;
      const html = document.documentElement;

      if (newTheme === "dark") {
        html.classList.add("dark");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add("hidden");
        if (themeToggleLightIcon)
          themeToggleLightIcon.classList.remove("hidden");
      } else {
        html.classList.remove("dark");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add("hidden");
      }
    }
  }

  // Inisialisasi tema
  setInitialTheme();

  // Event listener untuk tombol toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Event listener untuk sinkronisasi antar tab
  window.addEventListener("storage", syncTheme);

  // Form submission
  const form = document.getElementById("form");
  const btn = document.getElementById("button");

  if (form && btn) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const originalBtnValue = btn.value;
      btn.value = "Sending...";

      const serviceID = "portfolio"; // Replace with your service ID
      const templateID = "portfolio"; // Replace with your template ID

      // Show loading indicator
      Swal.fire({
        title: "Sending your message...",
        html: "Please wait a moment",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Send email
      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          // Success notification
          btn.value = originalBtnValue;
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for your message. I will get back to you soon.",
            confirmButtonColor: "#3085d6",
            timer: 4000,
            timerProgressBar: true,
          });
          this.reset(); // Reset form
        },
        (err) => {
          // Error notification
          btn.value = originalBtnValue;
          Swal.fire({
            icon: "error",
            title: "Failed to Send",
            text:
              "An error occurred: " + (err.text || "Please try again later"),
            confirmButtonColor: "#d33",
          });
          console.error("EmailJS Error:", err);
        }
      );
    });
  }

  // Image handling
  const profileImgContainer = document.querySelector(
    ".profile-image-container"
  );
  const aboutImgContainer = document.querySelector(".about-image-container");
  const profileImg = document.querySelector(".profile-image");
  const aboutImg = document.querySelector(".about-image");

  if (profileImgContainer && aboutImgContainer) {
    const profileImageUrl = "./img/my1.png";
    const aboutImageUrl = "./img/my2.png";

    // Preload gambar
    const profileImgEl = new Image();
    profileImgEl.src = profileImageUrl;

    const aboutImgEl = new Image();
    aboutImgEl.src = aboutImageUrl;

    // Animasi saat scroll
    function handleScroll() {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const aboutRect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Jika about section masuk ke viewport
      if (aboutRect.top < windowHeight * 0.7) {
        // Animasi keluar profile image
        if (profileImgContainer) {
          profileImgContainer.style.transform = "translateY(20px) scale(0.9)";
        }
        if (profileImg) {
          profileImg.style.opacity = "0.5";
        }

        // Animasi masuk about image
        if (aboutImgContainer) {
          aboutImgContainer.style.transform = "translateY(0)";
        }
        if (aboutImg) {
          aboutImg.style.opacity = "1";
        }

        // Set background image dengan efek fade
        setTimeout(() => {
          if (profileImg) {
            profileImg.style.backgroundImage = `url(${profileImageUrl})`;
          }
          if (aboutImg) {
            aboutImg.style.backgroundImage = `url(${aboutImageUrl})`;
          }
        }, 300);
      } else {
        // Kembalikan ke state awal
        if (profileImgContainer) {
          profileImgContainer.style.transform = "none";
        }
        if (profileImg) {
          profileImg.style.opacity = "1";
        }
        if (aboutImgContainer) {
          aboutImgContainer.style.transform = "translateY(20px)";
        }
        if (aboutImg) {
          aboutImg.style.opacity = "0.5";
        }
      }
    }

    // Inisialisasi
    if (aboutImgContainer) {
      aboutImgContainer.style.transform = "translateY(20px)";
    }
    if (aboutImg) {
      aboutImg.style.opacity = "0.5";
    }

    // Set background image awal
    if (profileImg) {
      profileImg.style.backgroundImage = `url(${profileImageUrl})`;
    }
    if (aboutImg) {
      aboutImg.style.backgroundImage = `url(${aboutImageUrl})`;
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
  }

  // Intersection Observer for section animations
  const sections = document.querySelectorAll(
    ".section-entry, .scroll-fade, .scroll-scale"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.style.transitionDelay = `${delay}ms`;
        }, 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section, index) => {
    section.dataset.delay = index * 100;
    sectionObserver.observe(section);
  });

  // Efek parallax saat scroll
  function handleParallax() {
    const parallaxElements = document.querySelectorAll(".parallax-element");

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.speed) || 0.3;
      const offset = window.pageYOffset * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener("scroll", handleParallax);
  window.addEventListener("resize", handleParallax);

  // Navbar scroll effect
  let lastScroll = 0;
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 10) {
        navbar.classList.remove("nav-scroll");
        navbar.style.transform = "translateY(0)";
        return;
      }

      // Smooth show/hide navbar saat scroll
      if (currentScroll > lastScroll && currentScroll > navbarHeight) {
        // Scrolling down
        navbar.style.transform = `translateY(-${navbarHeight}px)`;
        navbar.classList.add("nav-scroll");
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)";
        navbar.classList.add("nav-scroll");
      }

      lastScroll = currentScroll;
    });
  }

  // Tambahkan efek scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.className =
    "fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300";
  progressBar.style.width = "0%";
  document.body.prepend(progressBar);

  window.addEventListener("scroll", () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  });

  // Custom Cursor
  const cursorOuter = document.querySelector(".cursor-outer");
  const cursorInner = document.querySelector(".cursor-inner");
  const links = document.querySelectorAll(
    "a, button, .link, .btn, input, textarea"
  );

  if (cursorOuter && cursorInner) {
    let mouseX = 0;
    let mouseY = 0;
    let innerX = 0;
    let innerY = 0;
    let outerX = 0;
    let outerY = 0;

    const innerSpeed = 0.15;
    const outerSpeed = 0.1;

    function updateCursor() {
      const dx = mouseX - outerX;
      const dy = mouseY - outerY;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      innerX = mouseX;
      innerY = mouseY;
      cursorInner.style.left = innerX + "px";
      cursorInner.style.top = innerY + "px";

      outerX += dx * outerSpeed;
      outerY += dy * outerSpeed;
      cursorOuter.style.left = outerX + "px";
      cursorOuter.style.top = outerY + "px";

      cursorOuter.style.transform = `translate(-50%, -50%) rotate(${
        angle + 90
      }deg)`;

      requestAnimationFrame(updateCursor);
    }

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    links.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        document.body.classList.add("link-hover");
        cursorOuter.style.transform = "translate(-50%, -50%) scale(1.5)";
      });

      link.addEventListener("mouseleave", function () {
        document.body.classList.remove("link-hover");
        cursorOuter.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });

    // Initialize cursor animation
    updateCursor();
  }

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Add wave animation to profile title
  const title = document.querySelector("h1");
  if (title) {
    title.addEventListener("mouseenter", () => {
      title.classList.add("wave");
    });
    title.addEventListener("animationend", () => {
      title.classList.remove("wave");
    });
  }

  // Add pulse animation to contact button
  const contactBtn = document.querySelector('a[href="#contact"]');
  if (contactBtn) {
    setInterval(() => {
      contactBtn.classList.toggle("pulse");
    }, 4000);
  }
});
