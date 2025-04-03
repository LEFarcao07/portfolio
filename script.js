document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      // Hanya aktif di desktop
      const eyes = document.querySelectorAll(".pupil");
      const eyesContainer = document.querySelector("#chatbotIcon");
      const rect = eyesContainer.getBoundingClientRect();

      // Posisi tengah ikon
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;

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
  });
  // Data Q&A
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

  // Elemen DOM
  const chatbotIcon = document.getElementById("chatbotIcon");
  const chatbotBox = document.getElementById("chatbotBox");
  const closeBtn = document.getElementById("closeBtn");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const buttonOptions = document.getElementById("buttonOptions");

  // Tampilkan tombol pilihan
  function renderButtons() {
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

  // Tambahkan pesan ke chat
  function addMessage(message, isBot = true, isHTML = false) {
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

  // Handle tombol option
  function handleOptionClick(e) {
    if (e.target.classList.contains("option-btn")) {
      const question = e.target.getAttribute("data-question");
      const answer = e.target.getAttribute("data-answer");

      // Tampilkan pertanyaan user
      addMessage(question, false);

      // Delay lalu tampilkan jawaban bot
      setTimeout(() => {
        addMessage(answer, true, true);
      }, 500);
    }
  }

  // Event Listeners
  chatbotIcon.addEventListener("click", () => {
    chatbotBox.classList.toggle("hidden");
    chatbotBox.classList.toggle("flex");
    chatbotIcon.classList.toggle("hidden");
    renderButtons();
  });

  closeBtn.addEventListener("click", () => {
    chatbotBox.classList.add("hidden");
    chatbotBox.classList.remove("flex");
    chatbotIcon.classList.remove("hidden");
  });

  buttonOptions.addEventListener("click", handleOptionClick);

  // Pesan pembuka otomatis
  setTimeout(() => {
    addMessage(
      "Pilih pertanyaan di bawah atau klik ikon x jika ingin menutup ini",
      true
    );
  }, 1500);
  const profileImgContainer = document.querySelector(
    ".profile-image-container"
  );
  const aboutImgContainer = document.querySelector(".about-image-container");
  const profileImg = document.querySelector(".profile-image");
  const aboutImg = document.querySelector(".about-image");
  const btn = document.getElementById("button");

  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "portfolio";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Email";
        alert("Sent!");
      },
      (err) => {
        btn.value = "Send Email";
        alert(JSON.stringify(err));
      }
    );
  });
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
    const aboutRect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Jika about section masuk ke viewport
    if (aboutRect.top < windowHeight * 0.7) {
      // Animasi keluar profile image
      profileImgContainer.style.transform = "translateY(20px) scale(0.9)";
      profileImg.style.opacity = "0.5";

      // Animasi masuk about image
      aboutImgContainer.style.transform = "translateY(0)";
      aboutImg.style.opacity = "1";

      // Set background image dengan efek fade
      setTimeout(() => {
        profileImg.style.backgroundImage = `url(${profileImageUrl})`;
        aboutImg.style.backgroundImage = `url(${aboutImageUrl})`;
      }, 300);
    } else {
      // Kembalikan ke state awal
      profileImgContainer.style.transform = "none";
      profileImg.style.opacity = "1";
      aboutImgContainer.style.transform = "translateY(20px)";
      aboutImg.style.opacity = "0.5";
    }
  }

  // Inisialisasi
  aboutImgContainer.style.transform = "translateY(20px)";
  aboutImg.style.opacity = "0.5";

  // Set background image awal
  profileImg.style.backgroundImage = `url(${profileImageUrl})`;
  aboutImg.style.backgroundImage = `url(${aboutImageUrl})`;

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);

  // Intersection Observer for section animations
  const sections = document.querySelectorAll(".section-entry");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove("nav-scroll");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !navbar.classList.contains("nav-scroll")
    ) {
      // Scrolling down
      navbar.classList.add("nav-scroll");
    } else if (
      currentScroll < lastScroll &&
      navbar.classList.contains("nav-scroll")
    ) {
      // Scrolling up
      navbar.classList.remove("nav-scroll");
    }

    lastScroll = currentScroll;
  });

  // Custom Cursor
  const cursorOuter = document.querySelector(".cursor-outer");
  const cursorInner = document.querySelector(".cursor-inner");
  const links = document.querySelectorAll(
    "a, button, .link, .btn, input, textarea"
  );

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

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!localStorage.getItem("color-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeToggleDarkIcon.classList.add("hidden");
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    themeToggleDarkIcon.classList.remove("hidden");
    themeToggleLightIcon.classList.add("hidden");
  }

  themeToggle.addEventListener("click", function () {
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    document.documentElement.classList.add("transition-colors");
    document.documentElement.classList.add("duration-300");

    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }

    setTimeout(() => {
      document.documentElement.classList.remove("transition-colors");
      document.documentElement.classList.remove("duration-300");
    }, 300);
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

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

  // Form submission
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }

  // Add wave animation to profile title
  const title = document.querySelector("h1");
  title.addEventListener("mouseenter", () => {
    title.classList.add("wave");
  });
  title.addEventListener("animationend", () => {
    title.classList.remove("wave");
  });

  // Add pulse animation to contact button
  const contactBtn = document.querySelector('a[href="#contact"]');
  setInterval(() => {
    contactBtn.classList.toggle("pulse");
  }, 4000);
});
