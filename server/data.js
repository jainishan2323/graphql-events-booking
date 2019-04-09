events = [{
        name: "Cocktail Gathering",
        url: "/cocktail",
        banner_url: "https://juven-stg.s3.amazonaws.com/images_1697_1548661055505_Test-123-cover",
        date: "2019-06-01 19:00:00",
        location: "Lan Kwai Fong, Central, Hong Kong",
        description: "Meet some new friends in this awesome cocktail gathering! Extra brownie points if you bring some cool friends.",
        ticket_types: [{
                name: "VIP",
                quantity_available: 100
            },
            {
                name: "Standard",
                quantity_available: null
            },
            {
                name: "Alumnus",
                quantity_available: null
            }
        ]
    },
    {
        name: "Helicopter Tour",
        url: "/heli",
        banner_url: "https://juven-stg.s3.amazonaws.com/images_1723_1549268249636_Juven-Clubbin-cover",
        date: "2019-05-15 12:00:00",
        location: "Sha Tin Heliport, Sha Tin, Hong Kong",
        description: "Get onboard this once-in-a-lifetime ride and see the majestic views of urban and rural Hong Kong from a fresh angle!",
        ticket_types: [{
                name: "Full HK tour",
                quantity_available: 2
            },
            {
                name: "30 minute Experience",
                quantity_available: 5
            }
        ]
    },
    {
        name: "Spaceship Experience",
        url: "/spaceship",
        banner_url: "https://juven-stg.s3.amazonaws.com/images_1743_1549968724608_Lets-celebrate-Juven-birthday-cover",
        date: "2021-08-31 18:00:00",
        location: "Singapore Spaceport, Changi, Singapore",
        description: "A literally out-of-this-world experience - take our cutting-edge spaceship and cruise to an altitude of 150km. A unique opportunity to join the exclusive Astronaut Club!",
        ticket_types: [{
                name: "Singapore to Hong Kong",
                quantity_available: null
            },
            {
                name: "Singapore to Sydney",
                quantity_available: 200
            },
            {
                name: "Singapore to New York",
                quantity_available: 50
            }
        ]
    }
];

module.exports = events;
