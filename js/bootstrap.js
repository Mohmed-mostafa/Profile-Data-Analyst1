
"use strict";

const languageToggle = document.getElementById("languageToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");

let currentLanguage = "en";

function setLanguage(language) {
  currentLanguage = language;

  const isArabic = language === "ar";

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  document.body.classList.toggle("en", !isArabic);

  document.querySelectorAll("[data-ar][data-en]").forEach(element => {
    element.textContent = element.dataset[language];
  });

  document.querySelectorAll(
    "[data-placeholder-ar][data-placeholder-en]"
  ).forEach(element => {
    element.placeholder = element.dataset["placeholder-" + language];
  });

  languageToggle.textContent = isArabic ? "EN" : "عربي";

  languageToggle.setAttribute(
    "aria-label",
    isArabic ? "Switch to English" : "التبديل إلى العربية"
  );

  menuToggle.setAttribute(
    "aria-label",
    isArabic ? "فتح القائمة" : "Open navigation"
  );

  document.title = isArabic
    ? "محمد مصطفى | محلل بيانات"
    : "Mohamed Mostafa | Data Analyst";

  document.querySelector('meta[name="description"]').content = isArabic
    ? "محمد مصطفى، محلل بيانات مهتم بتحليل البيانات وتنظيفها وتصويرها واستخلاص الرؤى."
    : "Mohamed Mostafa — Data Analyst specializing in data analysis, visualization, and actionable insights.";

  document.querySelectorAll("[data-arrow], .project-link i").forEach(icon => {
    icon.classList.remove("bi-arrow-up-left", "bi-arrow-up-right");
    icon.classList.add(isArabic ? "bi-arrow-up-left" : "bi-arrow-up-right");
  });

  document.getElementById("fullName").dir = isArabic ? "rtl" : "ltr";
  document.getElementById("email").dir = "ltr";
  document.getElementById("message").dir = isArabic ? "rtl" : "ltr";
}

// تبديل اللغة بين العربية والإنجليزية
languageToggle.addEventListener("click", () => {
  setLanguage(currentLanguage === "ar" ? "en" : "ar");
});

// فتح وإغلاق قائمة التنقل على الهاتف
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.innerHTML = isOpen
    ? '<i class="bi bi-x-lg"></i>'
    : '<i class="bi bi-list"></i>';

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// إغلاق القائمة بعد الضغط على أحد الروابط
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// إظهار عناصر الموقع تدريجيًا عند الوصول إليها
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// تحديد القسم النشط في شريط التنقل
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function highlightNavigation() {
  let activeId = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      activeId = section.id;
    }
  });

  navItems.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + activeId
    );
  });
}

window.addEventListener("scroll", highlightNavigation, {
  passive: true
});

highlightNavigation();

// نموذج التواصل عبر البريد الإلكتروني
contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const recipient = "YOUR_EMAIL@example.com";

  const name = document.getElementById("fullName").value.trim();
  const senderEmail = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (recipient === "YOUR_EMAIL@example.com") {
    alert(currentLanguage === "ar"
      ? "من فضلك استبدل YOUR_EMAIL@example.com ببريدك الحقيقي داخل الكود أولًا."
      : "Please replace YOUR_EMAIL@example.com with your real email address in the code first."
    );
    return;
  }

  const subject = encodeURIComponent(
    "Portfolio Contact - " + name
  );

  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + senderEmail +
    "\n\nMessage:\n" + message
  );

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
});

// تشغيل الموقع باللغة الإنجليزية افتراضيًا
setLanguage("en");

// تحديث سنة حقوق النشر تلقائيًا
document.getElementById("year").textContent =
  new Date().getFullYear();
