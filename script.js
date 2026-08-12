// ============================================
// AfterSchool - Interactive JavaScript
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------
    // Elements
    // --------------------------------------------

    const searchInput = document.querySelector(".search-bar input");
    const activityCards = Array.from(
        document.querySelectorAll(".activity-card")
    );

    const ageFilter = document.querySelector(".age-filter");
    const distanceFilter = document.querySelector(".distance-filter");

    const hearts = document.querySelectorAll(".heart");

    const closePopup = document.querySelector(".close-popup");
    const mapPopup = document.querySelector(".map-popup");
    const viewDetails = document.querySelector(".view-details");

    const mapMarkers = document.querySelectorAll(".map-marker");

    const zoomButtons = document.querySelectorAll(".map-controls button");

    const categoryButton = document.querySelectorAll(".select-button")[1];
    const tagsButton = document.querySelectorAll(".select-button")[2];

    const moreFiltersButton = document.querySelector(".more-filters");

    const paginationButtons = document.querySelectorAll(
        ".pagination button"
    );

    const sortButton = document.querySelector(".sort button");

    const locationButton = document.querySelector(".location-button");
    const useLocationButton = document.querySelector(".use-location");

    const searchAsMoveMap = document.querySelector(
        '.map-toolbar input[type="checkbox"]'
    );


    // --------------------------------------------
    // Activity data
    // --------------------------------------------

    const activities = [
        {
            name: "Guitar Basics for Beginners",
            provider: "Melody School of Music",
            category: "Music",
            ageMin: 6,
            ageMax: 14,
            price: 1500,
            spots: 8
        },

        {
            name: "Football Fun League",
            provider: "Kickstart Sports Academy",
            category: "Sports",
            ageMin: 7,
            ageMax: 16,
            price: 2000,
            spots: 5
        },

        {
            name: "Creative Painting Workshop",
            provider: "Art Studio Koramangala",
            category: "Art & Craft",
            ageMin: 6,
            ageMax: 13,
            price: 1200,
            spots: 12
        },

        {
            name: "Robotics for Kids",
            provider: "STEM Innovators",
            category: "STEM",
            ageMin: 8,
            ageMax: 16,
            price: 2500,
            spots: 3
        }
    ];


    // --------------------------------------------
    // SEARCH
    // --------------------------------------------

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchText =
                searchInput.value.toLowerCase().trim();

            activityCards.forEach((card) => {

                const cardText =
                    card.textContent.toLowerCase();

                if (cardText.includes(searchText)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

            updateResultsCount();

        });

    }


    // --------------------------------------------
    // HEART / FAVOURITES
    // --------------------------------------------

    hearts.forEach((heart) => {

        heart.style.cursor = "pointer";

        heart.addEventListener("click", () => {

            if (heart.textContent.trim() === "♡") {

                heart.textContent = "♥";
                heart.classList.add("liked");

            } else {

                heart.textContent = "♡";
                heart.classList.remove("liked");

            }

        });

    });


    // --------------------------------------------
    // AGE RANGE
    // --------------------------------------------

    if (ageFilter) {

        const rangeLine =
            ageFilter.querySelector(".range-line");

        if (rangeLine) {

            rangeLine.style.cursor = "pointer";

            rangeLine.addEventListener("click", (event) => {

                const rect =
                    rangeLine.getBoundingClientRect();

                const percentage =
                    (event.clientX - rect.left) / rect.width;

                const selectedAge =
                    Math.round(5 + percentage * 13);

                filterByAge(selectedAge);

            });

        }

    }


    function filterByAge(age) {

        activityCards.forEach((card, index) => {

            const activity = activities[index];

            if (!activity) return;

            if (
                age >= activity.ageMin &&
                age <= activity.ageMax
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

        updateResultsCount();

    }


    // --------------------------------------------
    // DISTANCE FILTER
    // --------------------------------------------

    if (distanceFilter) {

        const rangeLine =
            distanceFilter.querySelector(".range-line");

        if (rangeLine) {

            rangeLine.style.cursor = "pointer";

            rangeLine.addEventListener("click", (event) => {

                const rect =
                    rangeLine.getBoundingClientRect();

                const percentage =
                    (event.clientX - rect.left) / rect.width;

                const distance =
                    Math.round(percentage * 50);

                showDistanceMessage(distance);

            });

        }

    }


    function showDistanceMessage(distance) {

        alert(
            `Showing activities within ${distance} km`
        );

    }


    // --------------------------------------------
    // CATEGORY BUTTON
    // --------------------------------------------

    if (categoryButton) {

        categoryButton.addEventListener("click", () => {

            const categories = [
                "Music",
                "Sports",
                "Art & Craft",
                "STEM"
            ];

            const selected =
                prompt(
                    "Choose a category:\n\n" +
                    "1. Music\n" +
                    "2. Sports\n" +
                    "3. Art & Craft\n" +
                    "4. STEM"
                );

            if (!selected) return;

            const category =
                categories[Number(selected) - 1];

            if (!category) return;

            activityCards.forEach((card) => {

                const text =
                    card.textContent.toLowerCase();

                if (
                    text.includes(category.toLowerCase())
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

            categoryButton.textContent =
                `☆ ${category} selected ⌄`;

            updateResultsCount();

        });

    }


    // --------------------------------------------
    // TAG BUTTON
    // --------------------------------------------

    if (tagsButton) {

        tagsButton.addEventListener("click", () => {

            const tag =
                prompt(
                    "Enter a tag to filter by:\n\n" +
                    "Music\n" +
                    "Sports\n" +
                    "Outdoor\n" +
                    "Creative\n" +
                    "Robotics"
                );

            if (!tag) return;

            activityCards.forEach((card) => {

                const text =
                    card.textContent.toLowerCase();

                if (
                    text.includes(tag.toLowerCase())
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

            tagsButton.textContent =
                `☆ ${tag} selected ⌄`;

            updateResultsCount();

        });

    }


    // --------------------------------------------
    // MORE FILTERS
    // --------------------------------------------

    if (moreFiltersButton) {

        moreFiltersButton.addEventListener("click", () => {

            alert(
                "More filters coming soon!\n\n" +
                "You can filter activities by:\n" +
                "• Price\n" +
                "• Availability\n" +
                "• Activity type\n" +
                "• Weekend / weekday"
            );

        });

    }


    // --------------------------------------------
    // MAP POPUP
    // --------------------------------------------

    mapMarkers.forEach((marker, index) => {

        marker.style.cursor = "pointer";

        marker.addEventListener("click", () => {

            if (!mapPopup) return;

            mapPopup.style.display = "grid";

            const activity =
                activities[index % activities.length];

            if (!activity) return;

            const title =
                mapPopup.querySelector("h3");

            const paragraphs =
                mapPopup.querySelectorAll("p");

            const spots =
                mapPopup.querySelector("strong");

            if (title) {
                title.textContent =
                    activity.name;
            }

            if (paragraphs[1]) {
                paragraphs[1].textContent =
                    `Age ${activity.ageMin} – ${activity.ageMax} yrs`;
            }

            if (spots) {
                spots.textContent =
                    `${activity.spots} spots left`;
            }

        });

    });


    // --------------------------------------------
    // CLOSE MAP POPUP
    // --------------------------------------------

    if (closePopup) {

        closePopup.addEventListener("click", () => {

            mapPopup.style.display = "none";

        });

    }


    // --------------------------------------------
    // VIEW DETAILS
    // --------------------------------------------

    if (viewDetails) {

        viewDetails.addEventListener("click", () => {

            alert(
                "Activity Details\n\n" +
                "Guitar Basics for Beginners\n\n" +
                "Provider: Melody School of Music\n" +
                "Age: 6 – 14 years\n" +
                "Time: 10:00 AM – 12:00 PM\n" +
                "Price: ₹1,500 / month\n\n" +
                "8 spots remaining."
            );

        });

    }


    // --------------------------------------------
    // MAP ZOOM
    // --------------------------------------------

    let zoomLevel = 1;

    const map =
        document.querySelector(".map-placeholder");

    if (zoomButtons.length >= 2 && map) {

        zoomButtons[0].addEventListener("click", () => {

            zoomLevel += 0.1;

            if (zoomLevel > 1.5) {
                zoomLevel = 1.5;
            }

            map.style.backgroundSize =
                `${150 * zoomLevel}px ${150 * zoomLevel}px`;

        });


        zoomButtons[1].addEventListener("click", () => {

            zoomLevel -= 0.1;

            if (zoomLevel < 0.7) {
                zoomLevel = 0.7;
            }

            map.style.backgroundSize =
                `${150 * zoomLevel}px ${150 * zoomLevel}px`;

        });

    }


    // --------------------------------------------
    // FULLSCREEN MAP
    // --------------------------------------------

    if (zoomButtons.length >= 3 && map) {

        zoomButtons[2].addEventListener("click", () => {

            if (!document.fullscreenElement) {

                map.requestFullscreen();

            } else {

                document.exitFullscreen();

            }

        });

    }


    // --------------------------------------------
    // LOCATION BUTTON
    // --------------------------------------------

    if (useLocationButton) {

        useLocationButton.addEventListener("click", () => {

            if (!navigator.geolocation) {

                alert(
                    "Your browser does not support location services."
                );

                return;

            }

            navigator.geolocation.getCurrentPosition(
                (position) => {

                    alert(
                        "Location detected successfully!\n\n" +
                        "Latitude: " +
                        position.coords.latitude.toFixed(4) +
                        "\nLongitude: " +
                        position.coords.longitude.toFixed(4)
                    );

                },

                () => {

                    alert(
                        "Unable to access your location. " +
                        "Please allow location permission in your browser."
                    );

                }
            );

        });

    }


    // --------------------------------------------
    // LOCATION DROPDOWN
    // --------------------------------------------

    if (locationButton) {

        locationButton.addEventListener("click", () => {

            const newLocation =
                prompt(
                    "Enter your location:",
                    "Koramangala, Bengaluru"
                );

            if (!newLocation) return;

            const locationText =
                locationButton.querySelector("span");

            if (locationText) {
                locationText.textContent =
                    newLocation;
            }

        });

    }


    // --------------------------------------------
    // SORT
    // --------------------------------------------

    if (sortButton) {

        sortButton.addEventListener("click", () => {

            const choice =
                prompt(
                    "Sort activities by:\n\n" +
                    "1. Date (Newest)\n" +
                    "2. Price (Low to High)\n" +
                    "3. Price (High to Low)\n" +
                    "4. Name (A-Z)"
                );

            if (!choice) return;

            const cards =
                Array.from(activityCards);

            const container =
                document.querySelector(".activity-list");

            if (!container) return;


            if (choice === "2") {

                cards.sort((a, b) => {

                    return getPrice(a) - getPrice(b);

                });

                sortButton.textContent =
                    "Price (Low to High) ⌄";

            }


            else if (choice === "3") {

                cards.sort((a, b) => {

                    return getPrice(b) - getPrice(a);

                });

                sortButton.textContent =
                    "Price (High to Low) ⌄";

            }


            else if (choice === "4") {

                cards.sort((a, b) => {

                    const nameA =
                        a.querySelector("h2")
                            ?.textContent
                            .trim()
                            .toLowerCase();

                    const nameB =
                        b.querySelector("h2")
                            ?.textContent
                            .trim()
                            .toLowerCase();

                    return nameA.localeCompare(nameB);

                });

                sortButton.textContent =
                    "Name (A-Z) ⌄";

            }


            else {

                sortButton.textContent =
                    "Date (Newest) ⌄";

            }


            cards.forEach((card) => {

                container.appendChild(card);

            });

        });

    }


    function getPrice(card) {

        const priceText =
            card.querySelector(".activity-price strong")
                ?.textContent || "0";

        return Number(
            priceText
                .replace("₹", "")
                .replace(",", "")
        );

    }


    // --------------------------------------------
    // PAGINATION
    // --------------------------------------------

    paginationButtons.forEach((button) => {

        button.addEventListener("click", () => {

            if (
                button.textContent === "‹" ||
                button.textContent === "›"
            ) {

                return;

            }

            paginationButtons.forEach((btn) => {

                btn.classList.remove("current");

            });

            button.classList.add("current");

            alert(
                `Page ${button.textContent} selected`
            );

        });

    });


    // --------------------------------------------
    // SEARCH AS I MOVE THE MAP
    // --------------------------------------------

    if (searchAsMoveMap) {

        searchAsMoveMap.addEventListener(
            "change",
            () => {

                if (searchAsMoveMap.checked) {

                    console.log(
                        "Search as I move the map: ON"
                    );

                } else {

                    console.log(
                        "Search as I move the map: OFF"
                    );

                }

            }
        );

    }


    // --------------------------------------------
    // RESULTS COUNT
    // --------------------------------------------

    function updateResultsCount() {

        const resultsText =
            document.querySelector(".results-header span");

        if (!resultsText) return;

        const visibleCards =
            activityCards.filter(
                card => card.style.display !== "none"
            );

        resultsText.textContent =
            `${visibleCards.length} activities found`;

    }


    // --------------------------------------------
    // INITIAL SETUP
    // --------------------------------------------

    if (mapPopup) {

        mapPopup.style.display = "grid";

    }

    console.log(
        "AfterSchool interactive features loaded successfully."
    );

});