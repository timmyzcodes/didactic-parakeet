// Data from Google Sheets dataset
// https://docs.google.com/spreadsheets/d/1DdvAjmW9TcLRLEEVSJM1yeGc7I2OMe15oXLoMvAKWGQ/edit

// Rate parameter explainers from Price details tab
const rateExplainers = {
    freeCancellation: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation. If you don't show up, the no-show fee will be the total price of the reservation.",
    nonRefundable: "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation.",
    mealsExcluded: "Buffet breakfast costs € 32 per person per night. Breakfast rated 8.3 – based on 389 reviews.",
    mealsIncluded: "Buffet breakfast included. Breakfast rated 8.3 – based on 389 reviews.",
    noPrepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
    prepayment: "The total price of the reservation is charged at the time of booking.",
    extra: "High-speed internet throughout your stay.",
    specialDeal: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026.",
    bookingPays: "You'll get a reduced rate when you pay online because Booking.com will pay part of the price."
};

const roomsData = [
    {
        id: 1,
        name: "Superior Twin Room",
        size: 22,
        type: "Room",
        sleeps: 4,
        bedType: "2 twin beds or 1 full bed",
        bedDescription: "2 twin beds or 1 full bed",
        bedOptions: [
            { id: "twin", label: "2 twin beds", icon: "bed" },
            { id: "full", label: "1 full bed", icon: "hotel" }
        ],
        images: [
            "images/Rooms/superior-twin-1.jpg",
            "images/Rooms/superior-twin-2.jpg",
            "images/Rooms/superior-twin-3.jpg"
        ],
        amenities: [
            { name: "Attached bathroom", icon: "shower" },
            { name: "Flat-screen TV", icon: "tv" },
            { name: "Heating", icon: "whatshot" },
            { name: "Coffee machine", icon: "local_cafe" },
            { name: "Wi-Fi", icon: "wifi" },
            { name: "Safe", icon: "lock" }
        ],
        description: "Offering free toiletries and bathrobes, this twin room includes a private bathroom with a hairdryer and slippers. The twin room offers a tea and coffee maker, a wardrobe, a safe deposit box, a carpeted floor and a flat-screen TV. The unit offers 2 beds.",
        availability: null,
        specialNote: null,
        allFacilities: [
            "Safe",
            "TV",
            "Ironing facilities",
            "Coffee machine",
            "Tea/Coffee maker",
            "Heating",
            "Carpeted",
            "Electric kettle",
            "Wake-up service",
            "Wardrobe or closet",
            "Clothes rack",
            "Iron",
            "Flat-screen TV",
            "Mini-bar",
            "Air conditioner"
        ],
        privateBathroomAmenities: [
            "Free toiletries",
            "Bathrobe",
            "Toilet",
            "Towels",
            "Slippers",
            "Hairdryer",
            "Toilet paper"
        ],
        customerReview: "I had a wonderful stay! The room was spotless, comfortable, and surprisingly spacious. The bed was cozy, the Wi-Fi worked great, and the staff made me feel welcome from the moment I arrived. I would definitely stay here again. – Craig, United Kingdom",
        rates: [
            {
                id: 1,
                uniqueId: "1-1",
                name: "Saver",
                features: [
                    "Non-refundable",
                    "High-speed internet"
                ],
                originalPrice: 642,
                currentPrice: 415,
                discount: 35,
                dealTags: ["35% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: null,
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 415, nights: 2, label: "€ 415 x 2 nights" },
                    specialDeal: { amount: -227, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 415
                },
                buttonText: "Select"
            },
            {
                id: 2,
                uniqueId: "1-2",
                name: "Flexible",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "High-speed internet"
                ],
                originalPrice: 714,
                currentPrice: 465,
                discount: 35,
                dealTags: ["35% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: null,
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 476, nights: 2, label: "€ 476 x 2 nights" },
                    specialDeal: { amount: -286, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    bookingComPays: { amount: -53, label: "Booking.com pays", note: "You'll get a reduced rate when you pay online because Booking.com will pay part of the price." },
                    total: 613
                },
                buttonText: "Select"
            },
            {
                id: 3,
                uniqueId: "1-3",
                name: "Saver + Breakfast",
                features: [
                    "Non-refundable",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 753,
                currentPrice: 485,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 485, nights: 2, label: "€ 485 x 2 nights" },
                    specialDeal: { amount: -268, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 485
                },
                buttonText: "Select"
            },
            {
                id: 4,
                uniqueId: "1-4",
                name: "Flexible + Breakfast",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 837,
                currentPrice: 539,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 539, nights: 2, label: "€ 539 x 2 nights" },
                    specialDeal: { amount: -298, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 539
                },
                buttonText: "Select"
            }
        ]
    },
    {
        id: 2,
        name: "Superior Double Room",
        size: 25,
        type: "Room",
        sleeps: 2,
        bedType: "Full bed",
        bedDescription: "Full bed",
        images: [
            "images/Rooms/superior-double-1.jpg",
            "images/Rooms/superior-double-2.jpg",
            "images/Rooms/superior-double-3.jpg"
        ],
        amenities: [
            { name: "Attached bathroom", icon: "shower" },
            { name: "Flat-screen TV", icon: "tv" },
            { name: "City View", icon: "location_city" },
            { name: "Coffee machine", icon: "local_cafe" },
            { name: "Wi-Fi", icon: "wifi" },
            { name: "Safe", icon: "lock" }
        ],
        description: "Offering free toiletries and bathrobes, this double room includes a private bathroom with a hairdryer and slippers. The double room offers a tea and coffee maker, a wardrobe, a safe deposit box, a carpeted floor and a flat-screen TV.",
        availability: "We have 1 left",
        specialNote: "Only room with great city view",
        allFacilities: [
            "Safe",
            "TV",
            "Ironing facilities",
            "Coffee machine",
            "Tea/Coffee maker",
            "Heating",
            "Carpeted",
            "Electric kettle",
            "Wake-up service",
            "Wardrobe or closet",
            "Clothes rack",
            "Iron",
            "Flat-screen TV",
            "Mini-bar",
            "Air conditioner"
        ],
        privateBathroomAmenities: [
            "Free toiletries",
            "Bathrobe",
            "Toilet",
            "Towels",
            "Slippers",
            "Hairdryer",
            "Toilet paper"
        ],
        customerReview: "I had a wonderful stay! The room was spotless, comfortable, and surprisingly spacious. The bed was cozy, the Wi-Fi worked great, and the staff made me feel welcome from the moment I arrived. I would definitely stay here again. – Craig, United Kingdom",
        rates: [
            {
                id: 1,
                uniqueId: "2-1",
                name: "Saver",
                features: [
                    "Non-refundable",
                    "High-speed internet"
                ],
                originalPrice: 650,
                currentPrice: 419,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: null,
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 419, nights: 2, label: "€ 419 x 2 nights" },
                    specialDeal: { amount: -231, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 419
                },
                buttonText: "Select"
            },
            {
                id: 2,
                name: "Saver + Breakfast",
                features: [
                    "Non-refundable",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 753,
                currentPrice: 485,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 485, nights: 2, label: "€ 485 x 2 nights" },
                    specialDeal: { amount: -268, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 485
                },
                buttonText: "Select"
            },
            {
                id: 3,
                uniqueId: "2-3",
                name: "Flexible + Breakfast",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 837,
                currentPrice: 539,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 539, nights: 2, label: "€ 539 x 2 nights" },
                    specialDeal: { amount: -298, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 539
                },
                buttonText: "Select"
            }
        ]
    },
    {
        id: 3,
        name: "Superior King Room",
        size: 25,
        type: "Room",
        sleeps: 2,
        bedType: "King bed",
        bedDescription: "King bed",
        images: [
            "images/Rooms/superior-king-1.jpg",
            "images/Rooms/superior-king-2.jpg",
            "images/Rooms/superior-king-3.jpg"
        ],
        amenities: [
            { name: "Attached bathroom", icon: "shower" },
            { name: "Flat-screen TV", icon: "tv" },
            { name: "Heating", icon: "whatshot" },
            { name: "Coffee machine", icon: "local_cafe" },
            { name: "Wi-Fi", icon: "wifi" },
            { name: "Safe", icon: "lock" }
        ],
        description: "Offering free toiletries and bathrobes, this double room includes a private bathroom with a hairdryer and slippers. The double room offers a tea and coffee maker, a wardrobe, a safe deposit box, a carpeted floor, as well as a flat-screen TV. The unit has 1 bed.",
        availability: null,
        specialNote: "Large bed",
        allFacilities: [
            "Safe",
            "Desk",
            "TV",
            "Ironing facilities",
            "Coffee machine",
            "Tea/Coffee maker",
            "Heating",
            "Carpeted",
            "Electric kettle",
            "Wake-up service",
            "Wardrobe or closet",
            "Clothes rack",
            "Iron",
            "Flat-screen TV"
        ],
        privateBathroomAmenities: [
            "Free toiletries",
            "Bathrobe",
            "Toilet",
            "Towels",
            "Slippers",
            "Hairdryer",
            "Toilet paper"
        ],
        customerReview: "I had a wonderful stay! The room was spotless, comfortable, and surprisingly spacious. The bed was cozy, the Wi-Fi worked great, and the staff made me feel welcome from the moment I arrived. I would definitely stay here again. – Craig, United Kingdom",
        rates: [
            {
                id: 1,
                name: "Saver",
                features: [
                    "Non-refundable",
                    "High-speed internet"
                ],
                originalPrice: 714,
                currentPrice: 460,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: null,
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 460, nights: 2, label: "€ 460 x 2 nights" },
                    specialDeal: { amount: -254, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 460
                },
                buttonText: "Select"
            },
            {
                id: 2,
                uniqueId: "1-2",
                name: "Flexible",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "High-speed internet"
                ],
                originalPrice: 793,
                currentPrice: 511,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: null,
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 511, nights: 2, label: "€ 511 x 2 nights" },
                    specialDeal: { amount: -282, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 511
                },
                buttonText: "Select"
            },
            {
                id: 3,
                uniqueId: "1-3",
                name: "Saver + Breakfast",
                features: [
                    "Non-refundable",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 817,
                currentPrice: 526,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 526, nights: 2, label: "€ 526 x 2 nights" },
                    specialDeal: { amount: -291, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 526
                },
                buttonText: "Select"
            },
            {
                id: 4,
                uniqueId: "1-4",
                name: "Flexible + Breakfast",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 908,
                currentPrice: 585,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 585, nights: 2, label: "€ 585 x 2 nights" },
                    specialDeal: { amount: -323, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 585
                },
                buttonText: "Select"
            }
        ]
    },
    {
        id: 4,
        name: "Executive King Room",
        size: 32,
        type: "Room",
        sleeps: 4,
        bedType: "Queen bed",
        bedDescription: "Queen bed",
        images: [
            "images/Rooms/executive-king-1.jpg",
            "images/Rooms/executive-king-2.jpg",
            "images/Rooms/executive-king-3.jpg"
        ],
        amenities: [
            { name: "Attached bathroom", icon: "shower" },
            { name: "Flat-screen TV", icon: "tv" },
            { name: "City View", icon: "location_city" },
            { name: "Coffee machine", icon: "local_cafe" },
            { name: "Wi-Fi", icon: "wifi" },
            { name: "Safe", icon: "lock" },
            { name: "Minibar", icon: "local_bar" },
            { name: "Work desk", icon: "work" }
        ],
        description: "Providing free toiletries and bathrobes, this double room includes a private bathroom with a hairdryer and slippers. The spacious double room provides a tea and coffee maker, a wardrobe, a safe deposit box, a carpeted floor and a flat-screen TV. The unit offers 1 bed.",
        availability: "We have 1 left",
        specialNote: "Only room with desk",
        allFacilities: [
            "Safe",
            "Desk",
            "TV",
            "Ironing facilities",
            "Coffee machine",
            "Tea/Coffee maker",
            "Heating",
            "Carpeted",
            "Electric kettle",
            "Wake-up service",
            "Wardrobe or closet",
            "Clothes rack",
            "Iron",
            "Flat-screen TV"
        ],
        privateBathroomAmenities: [
            "Free toiletries",
            "Bathrobe",
            "Toilet",
            "Towels",
            "Slippers",
            "Hairdryer",
            "Toilet paper"
        ],
        customerReview: "I had a wonderful stay! The room was spotless, comfortable, and surprisingly spacious. The bed was cozy, the Wi-Fi worked great, and the staff made me feel welcome from the moment I arrived. I would definitely stay here again. – Craig, United Kingdom",
        rates: [
            {
                id: 1,
                name: "Saver",
                features: [
                    "Non-refundable",
                    "High-speed internet"
                ],
                originalPrice: 755,
                currentPrice: 486,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: null,
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 486, nights: 2, label: "€ 486 x 2 nights" },
                    specialDeal: { amount: -269, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 486
                },
                buttonText: "Select"
            },
            {
                id: 2,
                uniqueId: "1-2",
                name: "Flexible",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "High-speed internet"
                ],
                originalPrice: 839,
                currentPrice: 540,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: null,
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 540, nights: 2, label: "€ 540 x 2 nights" },
                    specialDeal: { amount: -299, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 540
                },
                buttonText: "Select"
            },
            {
                id: 3,
                uniqueId: "1-3",
                name: "Saver + Breakfast",
                features: [
                    "Non-refundable",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 858,
                currentPrice: 553,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 553, nights: 2, label: "€ 553 x 2 nights" },
                    specialDeal: { amount: -305, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 553
                },
                buttonText: "Select"
            },
            {
                id: 4,
                uniqueId: "1-4",
                name: "Flexible + Breakfast",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 953,
                currentPrice: 614,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 614, nights: 2, label: "€ 614 x 2 nights" },
                    specialDeal: { amount: -339, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 614
                },
                buttonText: "Select"
            }
        ]
    },
    {
        id: 5,
        name: "Suite",
        size: 52,
        type: "Private suite",
        sleeps: 4,
        bedType: "Bedroom: full bed, Linving room: Sofa bed",
        bedDescription: "Bedroom: full bed, Linving room: Sofa bed",
        images: [
            "images/Rooms/suite-1.jpg",
            "images/Rooms/suite-2.jpg",
            "images/Rooms/suite-3.jpg"
        ],
        amenities: [
            { name: "Attached bathroom", icon: "shower" },
            { name: "Flat-screen TV", icon: "tv" },
            { name: "City View", icon: "location_city" },
            { name: "Coffee machine", icon: "local_cafe" },
            { name: "Wi-Fi", icon: "wifi" },
            { name: "Safe", icon: "lock" },
            { name: "Minibar", icon: "local_bar" },
            { name: "Work desk", icon: "work" },
            { name: "Living area", icon: "weekend" },
            { name: "Balcony", icon: "balcony" }
        ],
        description: "This spacious suite includes 1 living room, 1 separate bedroom and 1 bathroom with a hairdryer and free toiletries. The suite has carpeted floors, a seating area with a flat-screen TV, a tea and coffee maker, executive lounge access, as well as a wardrobe. The unit has 2 beds.",
        availability: null,
        specialNote: ["Largest room", "Executive lounge access"],
        allFacilities: [
            "Safe",
            "Desk",
            "TV",
            "Ironing facilities",
            "Coffee machine",
            "Tea/Coffee maker",
            "Heating",
            "Carpeted",
            "Electric kettle",
            "Wake-up service",
            "Wardrobe or closet",
            "Clothes rack",
            "Iron",
            "Flat-screen TV",
            "Executive lounge access",
            "Sitting area"
        ],
        privateBathroomAmenities: [
            "Free toiletries",
            "Bathrobe",
            "Toilet",
            "Towels",
            "Slippers",
            "Hairdryer",
            "Toilet paper"
        ],
        customerReview: "I had a wonderful stay! The room was spotless, comfortable, and surprisingly spacious. The bed was cozy, the Wi-Fi worked great, and the staff made me feel welcome from the moment I arrived. I would definitely stay here again. – Craig, United Kingdom",
        rates: [
            {
                id: 1,
                name: "Saver",
                features: [
                    "Non-refundable",
                    "High-speed internet"
                ],
                originalPrice: 1034,
                currentPrice: 672,
                discount: 35,
                dealTags: ["35% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: null,
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 672, nights: 2, label: "€ 672 x 2 nights" },
                    specialDeal: { amount: -362, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 672
                },
                buttonText: "Select"
            },
            {
                id: 2,
                name: "Saver + Breakfast",
                features: [
                    "Non-refundable",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 1146,
                currentPrice: 738,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "Non-refundable. No cancellation or changes allowed.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Full payment required at booking.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 738, nights: 2, label: "€ 738 x 2 nights" },
                    specialDeal: { amount: -408, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 738
                },
                buttonText: "Select"
            },
            {
                id: 3,
                name: "Flexible",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "High-speed internet"
                ],
                originalPrice: 1159,
                currentPrice: 746,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: null,
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 746, nights: 2, label: "€ 746 x 2 nights" },
                    specialDeal: { amount: -413, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 746
                },
                buttonText: "Select"
            },
            {
                id: 4,
                uniqueId: "1-4",
                name: "Flexible + Breakfast",
                features: [
                    "Free cancellation before Jan 18, 2026",
                    "Breakfast Top rated",
                    "High-speed internet"
                ],
                originalPrice: 1273,
                currentPrice: 820,
                discount: 36,
                dealTags: ["36% off", "Special deal"],
                cancellationPolicy: "You can cancel for free until 1 day before arrival. If you cancel within 1 day of arrival, the cancellation fee will be the total price of the reservation.",
                meals: {
                    included: "Buffet breakfast included",
                    rating: "Breakfast rated 8.3 – based on 389 reviews."
                },
                prepayment: "Payment is due January 16, 2026 (property time). You can choose to be charged automatically at that time or to pay when you book.",
                extras: ["High-speed internet throughout your stay."],
                priceBreakdown: {
                    base: { amount: 820, nights: 2, label: "€ 820 x 2 nights" },
                    specialDeal: { amount: -453, label: "Special Deal", note: "This property is offering a discount on stays between Nov 20, 2025 and Jan 31, 2026." },
                    total: 820
                },
                buttonText: "Select"
            }
        ]
    }
];

// Assign unique IDs to all rates
roomsData.forEach(room => {
    room.rates.forEach(rate => {
        if (!rate.uniqueId) {
            rate.uniqueId = `${room.id}-${rate.id}`;
        }
    });
});

// Helper function to find a rate by uniqueId
function getRateByUniqueId(uniqueId) {
    for (const room of roomsData) {
        const rate = room.rates.find(r => r.uniqueId === uniqueId);
        if (rate) {
            return { room, rate };
        }
    }
    return null;
}

// Selected rooms and rates
let selectedRooms = [];
