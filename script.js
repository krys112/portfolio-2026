// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Update active link on scroll
window.addEventListener("scroll", updateActiveLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Contact form handling
// const contactForm = document.getElementById("contact-form");

// contactForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Get form data
//   const formData = new FormData(contactForm);
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const subject = formData.get("subject");
//   const message = formData.get("message");

//   // Basic form validation
//   if (!name || !email || !subject || !message) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   // Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   // Simulate form submission (replace with actual form handling)
//   const submitButton = contactForm.querySelector('button[type="submit"]');
//   const originalText = submitButton.textContent;

//   submitButton.textContent = "Sending...";
//   submitButton.disabled = true;

//   // Simulate API call delay
//   setTimeout(() => {
//     alert("Thank you for your message! I'll get back to you soon.");
//     contactForm.reset();
//     submitButton.textContent = originalText;
//     submitButton.disabled = false;
//   }, 2000);
// });

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".project-card, .timeline-item, .skill-category")
  .forEach((el) => {
    observer.observe(el);
  });

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Typing effect for home title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const titleElement = document.querySelector(".home-title");
  if (titleElement) {
    const originalText = titleElement.textContent;
    typeWriter(titleElement, originalText, 50);
  }
});

const revealInitiallyVisibleSections = () => {
  revealSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
      sectionObserver.unobserve(section);
    }
  });
};

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.style.opacity = "1";
  entry.target.style.transform = "translateY(0)";

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

revealSections.forEach((section) => {
  sectionObserver.observe(section);
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease-out";
});

revealInitiallyVisibleSections();

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Skills animation on scroll
const skillsSection = document.querySelector(".skills-section");
let skillsAnimated = false;

const animateSkills = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting && !skillsAnimated) {
    const skills = document.querySelectorAll(".skill");

    skills.forEach((skill, index) => {
      setTimeout(() => {
        skill.style.opacity = "1";
        skill.style.transform = "translateY(0)";
      }, index * 100);
    });

    skillsAnimated = true;
  }
};

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5,
  });

  skillsObserver.observe(skillsSection);

  // Initially hide skills for animation
  document.querySelectorAll(".skill").forEach((skill) => {
    skill.style.opacity = "0";
    skill.style.transform = "translateY(20px)";
    skill.style.transition = "all 0.3s ease-out";
  });
}

// Project Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const projectCards = document.querySelectorAll(".project-card");
  const carouselContainer = document.getElementById("modal-carousel-container");
  const carouselPrev = document.getElementById("modal-carousel-prev");
  const carouselNext = document.getElementById("modal-carousel-next");
  const carouselIndicators = document.getElementById(
    "modal-carousel-indicators",
  );

  let currentSlide = 0;
  let totalSlides = 0;

  // Project data with multiple images
  const projectData = {
    project1: {
      title: "n8n JSON Templates (Aphex Automate)",
      images: [
        "./assets/projects/n8n_templates/free-scripts.png?height=400&width=800&text=n8n JSON Templates Page",
        "./assets/projects/n8n_templates/fireflies-to-supabase.png?height=400&width=800&text=Fireflies Transcript to Supabase",
        "./assets/projects/n8n_templates/airtable-to-hubspot.png?height=400&width=800&text=Airtable to Hubspot",
        "./assets/projects/n8n_templates/gsheet-enrichment.png?height=400&width=800&text=GSheet Enrichment",
      ],
      description:
        "A list of personally created n8n JSON workflow templates publicly available on our website",
      overview:
        "I was tasked with creating clear and concise workflows that would be featured on our website for anyone to download and use as part of an engagement strategy. These workflows were designed to be well documented and with clearly defined variables for ease of use. They've also been chosen to showcase a myriad of different tools and use cases whilst keeping the automations basic and easily digestable.",
      features: [
        "Fireflies Transcript to Supabase - Extracts latest transcripts and formats data using embeddings to be saved into a Supabase vector DB with filterable metadata. Includes data validation to ensure transcript is not already in Supabase using meeting ID",
        "Airtable to Hubspot - Syncs contacts and companies from Airtable into Hubspot. Checks if company exists before adding (using domain) and same for contacts (using email). Airtable tracks which records have been synced using a checkbox.",
        "GSheet Enrichment using LI - Retrieves a list of linkedin profiles from Google sheet and enriches name, job title, company information, etc back into Google sheet. Enrichment is done using an API hosted on RapidAPI. Google sheet tracks which contacts have been enriched using an enriched column to prevent unnecessary credit usage.",
        "Tally.so submission to Google Doc and Slack - Webhook set up in Tally.so which triggers on form submissions and maps fields and values into a generated Google Docs with formatting logic for readability. Resulting Google Doc URL is sent to a Slack channel of choice with submission data.",
        "PandaDoc Contract Update to Slack and Welcome Email - Webhook set up in PandaDoc which triggers on contract state changes. All contract status updates are reported to a Slack channel with contract information. Additionally, a welcome email template is sent to the client if the resulting contract status is paid or completed.",
        "Scrape US Job Vacancies to Airtable - Active job listings in linkedin are scraped using an API hosted on RapidAPI and saved into Airtable using upsert logic to prevent duplication. List of keywords and date posted value are clearly defined and easily amendable.",
        "Fireflies Webhook to SOW Document - Webhook set up in Fireflies.ai which triggers after meetings are concluded. A transcript is retrieved using a GraphQL query, before being processed by an AI agent to determine if the call can be a potential sales call. If so, the transcript is again processed by an AI agent to generate a statement of work which is saved to a formatted Google Doc.",
      ],
      technologies: [
        "n8n",
        "Supabase",
        "Fireflies.ai",
        "Hubspot",
        "Google Sheets",
        "Slack",
        "Airtable",
      ],
      links: [
        {
          text: "View Templates",
          url: "https://aphexautomate.io/free-scripts",
          primary: false,
        },
      ],
    },
    project2: {
      title: "AI Generated Outreach Replies",
      images: [
        "./assets/projects/outbound_replies/slack-message-1.png?height=400&width=800&text=Reply Generation in Slack",
        "./assets/projects/outbound_replies/slack-message-2.png?height=400&width=800&text=Reply Generation in Slack",
        "./assets/projects/outbound_replies/instantly-webhook-workflow.png?height=400&width=800&text=Instantly Webhook Trigger",
        "./assets/projects/outbound_replies/slack-response-workflow.png?height=400&width=800&text=Set of Actions Based on Slack Response",
      ],
      description:
        "AI RAG workflow designed to generate replies using past Slack approved replies and client provided documents (ICP, Personas, Value Drivers)",
      overview:
        "This workflow was built with the aim of massively cutting down on the client's time spent replying to potential leads. This was achieved by generating AI responses to incoming replies and sending them to the client's slack channel with the ability to revise, reject or approve responses. Approved responses were subsequently saved into the Supabase vector DB, ready to be retrieved for future response generating, this enabled the AI agent to get progressively better at generating responses.",
      features: [
        "Instantly.ai and HeyReach.io webhooks set up to capture new replies in real time",
        "AI integrated with Supabase vector DB to retrieve relevant past reply examples",
        "AI generated reply tailored to the lead using past replies for material/tone",
        "Ability to modify AI reply in Slack before approving/rejecting",
        "Instantly and Heyreach API utilised to send approved replies back to lead",
        "Approved replies are automatically saved in Supabase to serve as future reply examples (AI training)",
        "Initial Instantly and Heyreach workflow reply threads scraped to build Supabase foundation",
      ],
      technologies: [
        "n8n",
        "Supabase",
        "JavaScript",
        "ChatGPT",
        "Slack",
        "Instantly.ai",
        "HeyReach.io",
      ],
      links: [
        // { text: "Live Demo", url: "#", primary: true },
        // { text: "GitHub", url: "#", primary: false },
      ],
    },
    project3: {
      title: "Onboarding Workflow",
      images: [
        "./assets/projects/onboarding_flow/kickoff-submission.png?height=400&width=800&text=n8n Onboarding Workflow",
        "./assets/projects/onboarding_flow/kickoff-airtable-form.png?height=400&width=800&text=Onboarding Kickoff Airtable Form",
        "./assets/projects/onboarding_flow/slack-channel-creation.png?height=400&width=800&text=Slack Channel Creation Workflow",
      ],
      description:
        "A comprehensive flow composed of multiple workflows designed to onboard new clients",
      overview:
        "The aim of this project was to provide the client with a streamlined series of automation steps that would be triggered  following a kick-off form submission in Airtable of a new client. The result is a main workflow, which in turn triggers numerous subflows in sequential order. The main challenges posed involved ensuring the workflow and subflows were kept organized and working in harmony following numerous scope iterations, various differing use cases and additional/modified automation steps.",
      features: [
        "Form designed in Airtable with various field types and conditional rules to ensure data validity",
        "Creation of two required Slack channels and an optional third depending on service chosen, the team and clients automatically added/invited to corresponding channels",
        "GDrive folder creation, including optional folder and file creations using template IDs stored in Airtable. Folders and files are selectable in the kick-off form. Folder is automatically shared with the client",
        "Client page created in Notion using an applicable template to the service chosen. Page properties are populated using data stored in Airtable",
        "Github client repo created and all Google Drive files are converted to markdown files before being pushed to Github repo, ready to be used with AI agents",
        "Error handling assigned to all workflows which notifies the team on Slack with a detailed message of error",
      ],
      technologies: [
        "n8n",
        "JavaScript",
        "Slack",
        "Airtable",
        "Google Drive",
        "Notion",
        "Github",
      ],
      links: [
        // { text: "Live Demo", url: "#", primary: true },
        // { text: "GitHub", url: "#", primary: false },
      ],
    },
    project4: {
      title: "Intake Form",
      images: [
        "./assets/projects/intake_form/form-heading.png?height=400&width=800&text=Custom Intake Form Example",
        "./assets/projects/intake_form/form-admin-panel.png?height=400&width=800&text=Custom Intake Form Admin Panel",
        "./assets/projects/intake_form/form-login.png?height=400&width=800&text=Custom Intake Form Admin Login",
      ],
      description:
        "Website developed using the aid of v0 by Vercel (AI) with the functionality of creating forms using API and allowing teams to collaboratively work on a single form.",
      overview:
        "The client needed a form website which could be used to generate new unique templated forms using an API that could then be sent to clients with a unique shareable link. Another requirement was to save form progress midway to allow the client to include multiple departments of their team to fill in corresponding sections of the form. No form website could be found on the market to meet these requirements so a custom website was developed.",
      features: [
        "Automatic form values saving to database hosted on MongoDB every 5 seconds to ensure form is synced",
        "Limited editing access to only one individual at a time to ensure values aren't overwritten between peers",
        "Editing access relinquishing logic based on inactivity to ensure form isn't unnecessarily locked from editing",
        "Various field types supported, including multiple select, rating out of five and multiple file upload",
        "Auth protected Admin dashboard providing a display of generated forms with key metrics, ability to edit/create templates, webhook integration and API keys",
        "Basic API implemented with endpoints to retrieve forms, templates and generate new forms with naming and template ID properties",
      ],
      technologies: [
        "Next.JS",
        "ReactJS",
        "Tailwind CSS",
        "MongoDB",
        "JavaScript",
      ],
      links: [
        // { text: "Form Example", url: "#", primary: true },
        // { text: "GitHub", url: "#", primary: false },
        // { text: "Documentation", url: "#", primary: false },
      ],
    },
    project5: {
      title: "Outbound Reports and Performance Metrics",
      images: [
        "./assets/projects/outbound_report/airtable_interface.png?height=400&width=800&text=Airtable Interface",
        "./assets/projects/outbound_report/slack_alerts.png?height=400&width=800&text=Slack Alerts",
      ],
      description:
        "A series of workflows designed to provide the team with a clear overview of account performance and populating client facing lead lists.",
      overview:
        "Our client faced an issue with inbox deliverability and monitoring all the inboxes associated to their clients' workspaces was proving a challenge, therefore we created an Airtable interface which collates all inbox stats with features to make data digestion easy for the team. Another part of the project was populating their clients' google sheets with all relevant lead and company data, including all metrics associated to outbound, for a clear breakdown of which leads have been contacted, replied, bounced, etc.",
      features: [
        "Daily refresh of all account stats by querying Instantly.ai API, attaching client IDs, and pushing data to Supabase and Airtable",
        "Custom color-coded Airtable performance fields which at a glance display key accounts with low deliverability",
        "Airtable interface integrated with grouping and filtering to efficiently segregate data and remove accounts with insufficient sample size",
        "n8n workflows which send Slack notifications to team when an account reaches a weekly bounce count threshold to allow for prompt action to be taken",
        "Instantly.ai/HeyReach.io webhook events are efficiently pushed to Gsheet lead lists in batches to prevent Gsheet API request issues",
        "Gsheet lead lists are composed of multiple sheets with formulas which interpret webhook event data into unique lead and company engagement breakdowns (eg number of leads contacted from a company, number of times a lead has replied, etc)",
      ],
      technologies: [
        "Airtable",
        "Supabase DB",
        "n8n",
        "Google Sheets API",
        "Instantly.ai",
        "HeyReach.io",
      ],
      links: [
        // { text: "Live Demo", url: "#", primary: true },
        // { text: "GitHub", url: "#", primary: false },
      ],
    },
    project6: {
      title: "Trademimic.io Website",
      images: [
        "./assets/projects/trademimic_website/trademimic-home.png?height=400&width=800&text=TradeMimic Website",
        "./assets/projects/trademimic_website/trademimic-login.png?height=400&width=800&text=TradeMimic Admin Login Page",
        "./assets/projects/trademimic_website/trademimic-admin-panel.png?height=400&width=800&text=TradeMimic Admin Panel",
      ],
      description:
        "A responsive website personally developed from provided Figma designs using React, node.js and MongoDB.",
      overview:
        "This was a full-stack project to develop a website for our main business at the time, which was providing copy trading solutions to FOREX signal providers. The idea was that signal providers would announce their trading positions on Telegram/Discord channels, and we would in turn execute these trades in proportion to their clients' account balances and selected risk options, using MetaApi.",
      features: [
        "Responsive design for all devices",
        "Smooth scroll animations and transitions",
        "Video embedding",
        "Contact form with validation",
        "SEO optimization",
        "Performance optimization",
        "Admin dashboard with ability to retrieve MetaApi logs",
      ],
      technologies: ["HTML5", "CSS", "JavaScript", "ReactJS", "Node.js"],
      links: [
        {
          text: "Open Website",
          url: "https://www.trademimic.io/",
          primary: false,
        },
      ],
    },
  };

  // Carousel functions
  function createCarouselSlides(images) {
    carouselContainer.innerHTML = "";
    carouselIndicators.innerHTML = "";

    images.forEach((image, index) => {
      // Create slide
      const slide = document.createElement("div");
      slide.className = "modal-carousel-slide";

      const img = document.createElement("img");
      img.src = image;
      img.alt = `Project image ${index + 1}`;
      img.className = "modal-image";

      slide.appendChild(img);
      carouselContainer.appendChild(slide);

      // Create indicator
      const indicator = document.createElement("button");
      indicator.className = "modal-carousel-indicator";
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToSlide(index));
      carouselIndicators.appendChild(indicator);
    });

    totalSlides = images.length;
    currentSlide = 0;
    updateCarousel();
  }

  function updateCarousel() {
    const translateX = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    document
      .querySelectorAll(".modal-carousel-indicator")
      .forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
      });

    // Update image counter
    const counter = document.getElementById("modal-image-counter");
    if (counter) {
      counter.textContent = `${currentSlide + 1}/${totalSlides}`;
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
  }

  function goToSlide(slideIndex) {
    currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    updateCarousel();
  }

  // Open modal function
  function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Create carousel
    createCarouselSlides(project.images);

    // Populate modal content
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-description").textContent =
      project.description;
    document.getElementById("modal-overview").textContent = project.overview;

    // Populate features list
    const featuresList = document.getElementById("modal-features");
    featuresList.innerHTML = "";
    project.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      li.style.marginBottom = "0.5rem";
      li.style.color = "#4a5568";
      featuresList.appendChild(li);
    });

    // Populate technologies
    const tagsContainer = document.getElementById("modal-tags");
    tagsContainer.innerHTML = "";
    project.technologies.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className = "modal-tag";
      tag.textContent = tech;
      tagsContainer.appendChild(tag);
    });

    // Populate links
    const linksContainer = document.getElementById("modal-links");
    linksContainer.innerHTML = "";
    project.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.text;
      a.className = link.primary ? "modal-link" : "modal-link secondary";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      linksContainer.appendChild(a);
    });

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close modal function
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Event listeners
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = card.getAttribute("data-project");
      openModal(projectId);
    });

    // Add cursor pointer style
    card.style.cursor = "pointer";
  });

  modalClose.addEventListener("click", closeModal);
  carouselPrev.addEventListener("click", prevSlide);
  carouselNext.addEventListener("click", nextSlide);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Keyboard navigation for carousel
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    }
  });
});
