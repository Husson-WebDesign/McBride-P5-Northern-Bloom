/* =====================================================
   Northern Bloom Floral & Events
   JavaScript and Interactive Features
===================================================== */


// =========================
// Page Setup
// =========================
document.documentElement.classList.add("js");


// =========================
// Mobile Navigation
// =========================
const menuButton = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
const desktopLayoutQuery = window.matchMedia("(min-width: 1101px)");

function setMenuState(isOpen) {
    mainNavigation.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
}

function toggleMenu() {
    const menuIsOpen = mainNavigation.classList.contains("open");
    setMenuState(!menuIsOpen);
}

if (menuButton && mainNavigation) {
    menuButton.addEventListener("click", toggleMenu);

    document.addEventListener("keydown", function (event) {
        const menuIsOpen = mainNavigation.classList.contains("open");

        if (event.key === "Escape" && menuIsOpen) {
            setMenuState(false);
            menuButton.focus();
        }
    });

    desktopLayoutQuery.addEventListener("change", function (event) {
        if (event.matches) {
            setMenuState(false);
        }
    });
}


// =========================
// Service Data (data/services.json)
// =========================
const SERVICE_DATA_URL = "data/services.json";
const DATA_ERROR_MESSAGE =
    "Service information could not be displayed right now. " +
    "Please contact the studio for details about our services and pricing.";
let serviceData = null;
let serviceDataRequest = null;

function loadServiceData() {
    if (!serviceDataRequest) {
        serviceDataRequest = fetch(SERVICE_DATA_URL)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Could not load " + SERVICE_DATA_URL + " (" + response.status + ")");
                }
                return response.json();
            })
            .then(function (data) {
                serviceData = data;
                return data;
            });
    }

    return serviceDataRequest;
}

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }
    if (text) {
        element.textContent = text;
    }

    return element;
}

function formatPrice(amount) {
    return "$" + amount.toLocaleString("en-US");
}

function createPriceLine(amount) {
    const priceLine = createElement("p", "price");

    priceLine.appendChild(createElement("span", "price-label", "Starting at"));
    priceLine.appendChild(document.createTextNode(formatPrice(amount)));
    return priceLine;
}

function appendListBlock(card, label, items) {
    const labelLine = createElement("p", "card-meta");
    const list = createElement("ul", "card-list");

    labelLine.appendChild(createElement("strong", "", label + ":"));
    items.forEach(function (item) {
        list.appendChild(createElement("li", "", item));
    });
    card.appendChild(labelLine);
    card.appendChild(list);
}

function createServiceCard(service, isCompact, loadImageNow) {
    const card = createElement("article", "card service-card");
    const image = createElement("img", "card-image");
    const actions = createElement("div", "card-actions");
    const inquiryLink = createElement("a", "button", service.inquiry.label);
    const learnMoreLink = createElement("a", "text-link", service.learnMore.label);

    image.addEventListener("error", function () {
        image.remove();
    });
    image.alt = service.image.alt;
    image.width = service.image.width;
    image.height = service.image.height;
    image.loading = loadImageNow ? "eager" : "lazy";
    image.src = service.image.src;
    card.appendChild(image);
    card.appendChild(createElement("h3", "", service.name));
    card.appendChild(createElement("p", "", isCompact ? service.summary : service.description));

    if (!isCompact) {
        const occasions = createElement("p", "card-meta");

        occasions.appendChild(createElement("strong", "", "Suited to:"));
        occasions.appendChild(document.createTextNode(" " + service.occasions.join(", ")));
        card.appendChild(occasions);
    }

    inquiryLink.href = service.inquiry.href;
    learnMoreLink.href = service.learnMore.href;
    actions.appendChild(inquiryLink);
    actions.appendChild(learnMoreLink);
    card.appendChild(actions);
    return card;
}

function createCategoryCard(category, isCompact) {
    const card = createElement("article", "card service-card price-card");

    card.appendChild(createElement("h3", "", category.name));
    card.appendChild(createElement("p", "", isCompact ? category.homeSummary : category.description));

    if (!isCompact && category.includes.length > 0) {
        appendListBlock(card, category.includesLabel, category.includes);
    }
    if (!isCompact && category.note !== "") {
        card.appendChild(createElement("p", "card-note", category.note));
    }

    card.appendChild(createPriceLine(category.startingPrice));
    return card;
}

function createPackageCard(packageInfo, isCompact) {
    const card = createElement("article", "card service-card price-card");

    card.appendChild(createElement("h3", "", packageInfo.name + " Package"));
    card.appendChild(createElement("p", "", packageInfo.description));

    if (!isCompact) {
        appendListBlock(card, "Included services", packageInfo.includes);
        card.appendChild(createElement("p", "card-note", packageInfo.note));
    }

    card.appendChild(createPriceLine(packageInfo.startingPrice));

    if (!isCompact) {
        const actions = createElement("div", "card-actions");
        const askLink = createElement("a", "button", "Ask About the " + packageInfo.name + " Package");

        askLink.href = "contact.html?service=event";
        actions.appendChild(askLink);
        card.appendChild(actions);
    }

    return card;
}

function fillContainer(container, items, createCard) {
    container.textContent = "";
    items.forEach(function (item) {
        container.appendChild(createCard(item));
    });
}

const renderers = {
    "services-compact": function (container, data) {
        fillContainer(container, data.services, function (item) { return createServiceCard(item, true); });
    },
    "services-full": function (container, data) {
        fillContainer(container, data.services, function (item) { return createServiceCard(item, false); });
    },
    "categories-featured": function (container, data) {
        const featured = data.floralCategories.filter(function (item) { return item.featured; });
        fillContainer(container, featured, function (item) { return createCategoryCard(item, true); });
    },
    "categories-all": function (container, data) {
        fillContainer(container, data.floralCategories, function (item) { return createCategoryCard(item, false); });
    },
    "packages-compact": function (container, data) {
        fillContainer(container, data.packages, function (item) { return createPackageCard(item, true); });
    },
    "packages-full": function (container, data) {
        fillContainer(container, data.packages, function (item) { return createPackageCard(item, false); });
    },
    "finder-options": function (container, data) {
        renderFinderOptions(container, data);
    },
    "service-select": function (select, data) {
        populateServiceSelect(select, data);
    }
};

function showDataError(container) {
    const message = createElement("p", "data-message", DATA_ERROR_MESSAGE + " ");
    const contactLink = createElement("a", "", "Contact the Studio");

    contactLink.href = "contact.html";
    message.appendChild(contactLink);
    container.textContent = "";
    container.appendChild(message);
}

function renderServiceData() {
    const targets = document.querySelectorAll("[data-render]");

    if (targets.length === 0) {
        return;
    }

    loadServiceData()
        .then(function (data) {
            targets.forEach(function (target) {
                const render = renderers[target.dataset.render];

                if (render) {
                    render(target, data);
                }
            });
        })
        .catch(function (error) {
            console.error(error);

            targets.forEach(function (target) {
                if (target.tagName !== "SELECT") {
                    showDataError(target);
                }
            });
        });
}


// =========================
// Inquiry Form (Preview Demonstration)
// =========================
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const inquiryPreview = document.querySelector("#inquiry-preview");
const previewList = document.querySelector("#preview-list");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
    name: function (value) {
        if (value === "") {
            return "Please enter your full name.";
        }
        return "";
    },

    email: function (value) {
        if (value === "") {
            return "Please enter your email address.";
        }
        if (!emailPattern.test(value)) {
            return "Please enter a valid email address, such as name@example.com.";
        }
        return "";
    },

    phone: function (value) {
        if (value === "") {
            return "";
        }
        const digitCount = value.replace(/\D/g, "").length;
        const usesPhoneCharactersOnly = /^[+\d\s().-]+$/.test(value);

        if (!usesPhoneCharactersOnly || digitCount < 7 || digitCount > 15) {
            return "Please enter a valid phone number, or leave this field blank.";
        }
        return "";
    },

    service: function (value) {
        if (value === "") {
            return "Please choose the service you are interested in.";
        }
        return "";
    },

    "event-date": function (value) {
        if (value === "") {
            return "";
        }
        const chosenDate = new Date(value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (chosenDate < today) {
            return "Please choose today's date or a date in the future.";
        }
        return "";
    },

    "guest-count": function (value) {
        if (value === "") {
            return "";
        }
        const guestCount = Number(value);

        if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5000) {
            return "Please enter a whole number of guests, such as 75.";
        }
        return "";
    },

    message: function (value) {
        if (value === "") {
            return "Please tell us about your request.";
        }
        if (value.length < 10) {
            return "Please write at least 10 characters so we understand your request.";
        }
        return "";
    }
};

const formFields = contactForm
    ? Array.from(contactForm.querySelectorAll("input, select, textarea")).filter(function (field) {
          return field.id in validators;
      })
    : [];

const previewFields = [
    { label: "Name", id: "name" },
    { label: "Email", id: "email" },
    { label: "Phone", id: "phone" },
    { label: "Service", id: "service" },
    { label: "Event date", id: "event-date" },
    { label: "Approximate guest count", id: "guest-count" },
    { label: "Preferred colors or style", id: "style-notes" },
    { label: "Estimated budget", id: "budget" },
    { label: "Details about your request", id: "message" }
];

function showError(field, message) {
    document.querySelector("#" + field.id + "-error").textContent = message;
    field.setAttribute("aria-invalid", "true");
    field.closest(".form-group").classList.add("has-error");
}

function clearError(field) {
    document.querySelector("#" + field.id + "-error").textContent = "";
    field.removeAttribute("aria-invalid");
    field.closest(".form-group").classList.remove("has-error");
}

function validateField(field) {
    const errorMessage = validators[field.id](field.value.trim());

    if (errorMessage !== "") {
        showError(field, errorMessage);
        return false;
    }

    clearError(field);
    return true;
}

function validateForm() {
    const invalidFields = [];

    formFields.forEach(function (field) {
        if (!validateField(field)) {
            invalidFields.push(field);
        }
    });

    return invalidFields;
}

function setFormStatus(message, statusType) {
    formStatus.textContent = message;
    formStatus.classList.remove("success", "error");

    if (statusType) {
        formStatus.classList.add(statusType);
    }
}

function getPreviewValue(field) {
    if (field.tagName === "SELECT") {
        return field.options[field.selectedIndex].textContent;
    }

    const value = field.value.trim();

    if (field.id === "event-date" && value !== "") {
        return new Date(value + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return value;
}

function buildPreview() {
    previewList.textContent = "";

    previewFields.forEach(function (item) {
        const value = getPreviewValue(contactForm.querySelector("#" + item.id));
        const detail = createElement("dd", value === "" ? "empty" : "", value === "" ? "Not provided" : value);

        previewList.appendChild(createElement("dt", "", item.label));
        previewList.appendChild(detail);
    });
}

function showPreview() {
    buildPreview();
    contactForm.hidden = true;
    inquiryPreview.hidden = false;
    inquiryPreview.focus();
}

function editInquiry() {
    inquiryPreview.hidden = true;
    contactForm.hidden = false;
    contactForm.querySelector("#name").focus();
}

function startOverInquiry() {
    contactForm.reset();
    formFields.forEach(clearError);
    setFormStatus("", "");
    updateServiceDescription();
    inquiryPreview.hidden = true;
    contactForm.hidden = false;
    contactForm.querySelector("#name").focus();
}

function handleFormSubmit(event) {
    event.preventDefault();

    const invalidFields = validateForm();

    if (invalidFields.length > 0) {
        const fieldWord = invalidFields.length === 1 ? "field needs" : "fields need";
        setFormStatus(
            "Error: " + invalidFields.length + " " + fieldWord +
            " your attention. Please read the message under each highlighted field.",
            "error"
        );
        invalidFields[0].focus();
        return;
    }

    setFormStatus("", "");
    showPreview();
}

function revalidateIfShowingError(field) {
    if (field.closest(".form-group").classList.contains("has-error")) {
        validateField(field);
    }
}

if (contactForm) {
    contactForm.setAttribute("novalidate", "");
    contactForm.addEventListener("submit", handleFormSubmit);
    document.querySelector("#edit-inquiry").addEventListener("click", editInquiry);
    document.querySelector("#start-over-inquiry").addEventListener("click", startOverInquiry);

    formFields.forEach(function (field) {
        field.addEventListener("blur", function () {
            const hasValue = field.value.trim() !== "";
            const hasError = field.closest(".form-group").classList.contains("has-error");

            if (hasValue || hasError) {
                validateField(field);
            }
        });

        field.addEventListener("input", function () {
            revalidateIfShowingError(field);
        });

        field.addEventListener("change", function () {
            revalidateIfShowingError(field);
        });
    });

    const eventDateField = contactForm.querySelector("#event-date");
    const now = new Date();
    const todayInputValue =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    if (eventDateField) {
        eventDateField.setAttribute("min", todayInputValue);
    }
}


// =========================
// Service Shortcut and Description
// =========================
const serviceSelect = document.querySelector("#service");
const serviceDescription = document.querySelector("#service-description");

function findService(serviceId) {
    if (!serviceData) {
        return null;
    }

    return serviceData.services.find(function (service) {
        return service.id === serviceId;
    }) || null;
}

function preselectServiceFromUrl() {
    if (!serviceSelect) {
        return;
    }

    const requestedService = new URLSearchParams(window.location.search).get("service");
    const isKnownService = Array.from(serviceSelect.options).some(function (option) {
        return option.value !== "" && option.value === requestedService;
    });

    if (isKnownService) {
        serviceSelect.value = requestedService;
    }
}

function updateServiceDescription() {
    const service = findService(serviceSelect.value);

    serviceDescription.textContent = service ? service.summary : "";
}

function populateServiceSelect(select, data) {
    const currentChoice = select.value;

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.services.forEach(function (service) {
        const option = document.createElement("option");

        option.value = service.id;
        option.textContent = service.name;
        select.appendChild(option);
    });

    select.value = currentChoice;
    updateServiceDescription();
}

if (serviceSelect && serviceDescription) {
    serviceSelect.addEventListener("change", updateServiceDescription);
}

preselectServiceFromUrl();


// =========================
// Service Finder
// =========================
const serviceFinder = document.querySelector("#service-finder");
const finderResult = document.querySelector("#finder-result");

function createFinderOption(value, labelText) {
    const option = createElement("div", "finder-option");
    const radio = createElement("input");
    const label = createElement("label", "", labelText);

    radio.type = "radio";
    radio.name = "need";
    radio.id = "need-" + value;
    radio.value = value;
    label.htmlFor = radio.id;
    option.appendChild(radio);
    option.appendChild(label);
    return option;
}

function renderFinderOptions(container, data) {
    container.textContent = "";
    data.services.forEach(function (service) {
        container.appendChild(createFinderOption(service.id, service.needLabel));
    });
    container.appendChild(createFinderOption("unsure", data.finder.unsureLabel));
}

function showFinderMessage(message, messageType) {
    finderResult.textContent = "";
    finderResult.appendChild(createElement("p", "finder-message " + messageType, message));
}

function handleFinderSubmit(event) {
    event.preventDefault();

    if (!serviceData) {
        showFinderMessage(DATA_ERROR_MESSAGE, "error");
        return;
    }

    const chosenOption = serviceFinder.querySelector('input[name="need"]:checked');

    if (!chosenOption) {
        showFinderMessage("Please choose an option to see a match.", "error");
        return;
    }

    const service = findService(chosenOption.value);

    if (service) {
        finderResult.textContent = "";
        finderResult.appendChild(createElement("p", "finder-message info", "Based on your answer, this service looks like the best fit."));
        finderResult.appendChild(createServiceCard(service, false, true));
    } else {
        const contactLink = createElement("a", "button", "Contact the Studio");

        showFinderMessage(serviceData.finder.unsureMessage, "info");
        contactLink.href = "contact.html";
        finderResult.appendChild(contactLink);
    }

    finderResult.scrollIntoView({ block: "nearest" });
}

if (serviceFinder && finderResult) {
    serviceFinder.addEventListener("submit", handleFinderSubmit);

    serviceFinder.addEventListener("reset", function () {
        finderResult.textContent = "";
    });
}


// =========================
// FAQ Accordion
// =========================
const faqQuestions = document.querySelectorAll(".faq-question");

function toggleFaqItem(questionButton) {
    const faqItem = questionButton.closest(".faq-item");
    const isOpen = faqItem.classList.toggle("open");

    questionButton.setAttribute("aria-expanded", String(isOpen));
}

faqQuestions.forEach(function (questionButton) {
    questionButton.addEventListener("click", function () {
        toggleFaqItem(questionButton);
    });
});


renderServiceData();
