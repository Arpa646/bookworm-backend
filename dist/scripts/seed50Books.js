"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../app/modules/Books/book.model"));
const user_model_1 = require("../app/modules/Registration/user.model");
// Genre IDs provided by user
const genres = {
    Adventure: "69650eb4defb2427a7cfd5f0",
    Autobiography: "69650eb4defb2427a7cfd5e3",
    Biography: "69650eb4defb2427a7cfd5e2",
    Business: "69650eb4defb2427a7cfd5e7",
    Childrens: "69650eb4defb2427a7cfd5f2",
    Comedy: "69650eb4defb2427a7cfd5ef",
    Cooking: "69650eb4defb2427a7cfd5ec",
    Drama: "69650eb4defb2427a7cfd5ee",
    Fantasy: "69650eb4defb2427a7cfd5dd",
    Fiction: "69650eb4defb2427a7cfd5da",
    FictionStory: "69650f7721e4be0bb30ca824",
    Fiction1: "6965b62e9710cd7451a0600e",
    Fiction3: "6965b8359710cd7451a06015",
    Fiction4: "6965b8869710cd7451a06019",
    HealthFitness: "69650eb4defb2427a7cfd5ea",
    History: "69650eb4defb2427a7cfd5e4",
    Horror: "69650eb4defb2427a7cfd5e1",
    Mystery: "69650eb4defb2427a7cfd5de",
    NonFiction: "69650eb4defb2427a7cfd5db",
    Philosophy: "69650eb4defb2427a7cfd5e5",
    Poetry: "69650eb4defb2427a7cfd5ed",
};
const dummyBooks = [
    // Adventure (3 books)
    {
        title: "The Lost Expedition",
        author: "James Mitchell",
        description: "A thrilling adventure following a team of explorers as they search for a lost city in the Amazon rainforest, facing dangerous wildlife and ancient traps.",
        isbn: "978-0-1234-5678-1",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81Z8JvJ8WxL.jpg",
        publishedDate: new Date("2020-03-15"),
        genre: genres.Adventure,
        pages: 342,
    },
    {
        title: "Mountain Peak Quest",
        author: "Sarah Anderson",
        description: "An epic journey to climb the world's most dangerous mountain, testing the limits of human endurance and courage.",
        isbn: "978-0-1234-5678-2",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg",
        publishedDate: new Date("2019-07-22"),
        genre: genres.Adventure,
        pages: 298,
    },
    {
        title: "Ocean Depths",
        author: "Michael Chen",
        description: "A deep-sea exploration adventure uncovering mysterious underwater civilizations and hidden treasures.",
        isbn: "978-0-1234-5678-3",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81zN2U0A1kL.jpg",
        publishedDate: new Date("2021-11-08"),
        genre: genres.Adventure,
        pages: 415,
    },
    // Autobiography (2 books)
    {
        title: "My Journey: From Nothing to Everything",
        author: "Robert Williams",
        description: "An inspiring autobiography chronicling the author's rise from poverty to success, sharing life lessons and personal struggles.",
        isbn: "978-0-1234-5678-4",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg",
        publishedDate: new Date("2022-01-10"),
        genre: genres.Autobiography,
        pages: 387,
    },
    {
        title: "Breaking Barriers: A Life Story",
        author: "Maria Garcia",
        description: "The personal memoir of a trailblazing woman who overcame discrimination to become a leader in her field.",
        isbn: "978-0-1234-5678-5",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91Q5d6Tc6OL.jpg",
        publishedDate: new Date("2023-05-20"),
        genre: genres.Autobiography,
        pages: 312,
    },
    // Biography (3 books)
    {
        title: "Einstein: The Genius Revealed",
        author: "David Thompson",
        description: "A comprehensive biography exploring the life, work, and legacy of Albert Einstein, one of history's greatest minds.",
        isbn: "978-0-1234-5678-6",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg",
        publishedDate: new Date("2021-08-14"),
        genre: genres.Biography,
        pages: 523,
    },
    {
        title: "The Queen's Legacy",
        author: "Elizabeth Brown",
        description: "An intimate portrait of a remarkable leader who shaped the course of history through wisdom and determination.",
        isbn: "978-0-1234-5678-7",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
        publishedDate: new Date("2020-12-05"),
        genre: genres.Biography,
        pages: 456,
    },
    {
        title: "Mozart: A Musical Life",
        author: "Peter Schmidt",
        description: "The fascinating life story of Wolfgang Amadeus Mozart, from child prodigy to musical legend.",
        isbn: "978-0-1234-5678-8",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2019-04-18"),
        genre: genres.Biography,
        pages: 389,
    },
    // Business (3 books)
    {
        title: "Startup Success: From Idea to IPO",
        author: "Jennifer Lee",
        description: "A practical guide to building a successful startup, covering everything from funding to scaling your business.",
        isbn: "978-0-1234-5678-9",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg",
        publishedDate: new Date("2022-06-12"),
        genre: genres.Business,
        pages: 267,
    },
    {
        title: "The Art of Negotiation",
        author: "Richard Martinez",
        description: "Master the skills of negotiation and learn how to achieve win-win outcomes in business and life.",
        isbn: "978-0-1234-5679-0",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QxYz8VHxL.jpg",
        publishedDate: new Date("2021-09-25"),
        genre: genres.Business,
        pages: 234,
    },
    {
        title: "Digital Marketing Mastery",
        author: "Amanda Taylor",
        description: "A comprehensive guide to modern digital marketing strategies that drive real results for businesses of all sizes.",
        isbn: "978-0-1234-5679-1",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIo8EGsL.jpg",
        publishedDate: new Date("2023-02-28"),
        genre: genres.Business,
        pages: 345,
    },
    // Children's (2 books)
    {
        title: "The Magic Forest Adventure",
        author: "Lucy Parker",
        description: "A delightful children's story about a young explorer who discovers a magical forest filled with talking animals and enchanted trees.",
        isbn: "978-0-1234-5679-2",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/712cDO7d73L.jpg",
        publishedDate: new Date("2022-10-15"),
        genre: genres.Childrens,
        pages: 128,
    },
    {
        title: "Princess and the Dragon",
        author: "Tommy Johnson",
        description: "A heartwarming tale of friendship between a brave princess and a misunderstood dragon, teaching children about acceptance and kindness.",
        isbn: "978-0-1234-5679-3",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2023-07-30"),
        genre: genres.Childrens,
        pages: 95,
    },
    // Comedy (2 books)
    {
        title: "The Hilarious Misadventures",
        author: "Bob Smith",
        description: "A collection of laugh-out-loud stories about everyday situations gone hilariously wrong, perfect for light reading.",
        isbn: "978-0-1234-5679-4",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
        publishedDate: new Date("2021-12-01"),
        genre: genres.Comedy,
        pages: 189,
    },
    {
        title: "Office Comedy Chronicles",
        author: "Patricia White",
        description: "Witty and humorous tales from the corporate world that will have you laughing at the absurdities of office life.",
        isbn: "978-0-1234-5679-5",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QxYz8VHxL.jpg",
        publishedDate: new Date("2022-04-18"),
        genre: genres.Comedy,
        pages: 201,
    },
    // Cooking (3 books)
    {
        title: "Italian Cuisine Masterclass",
        author: "Chef Marco Rossi",
        description: "Learn to cook authentic Italian dishes with traditional recipes passed down through generations, from pasta to desserts.",
        isbn: "978-0-1234-5679-6",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2020-05-20"),
        genre: genres.Cooking,
        pages: 312,
    },
    {
        title: "Vegan Delights: Plant-Based Recipes",
        author: "Sophie Green",
        description: "A comprehensive cookbook featuring delicious and nutritious vegan recipes for every meal of the day.",
        isbn: "978-0-1234-5679-7",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81zN2U0A1kL.jpg",
        publishedDate: new Date("2023-01-15"),
        genre: genres.Cooking,
        pages: 278,
    },
    {
        title: "Baking Basics for Beginners",
        author: "Emma Wilson",
        description: "Step-by-step guide to baking perfect breads, cakes, and pastries, with tips and techniques for novice bakers.",
        isbn: "978-0-1234-5679-8",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91Q5d6Tc6OL.jpg",
        publishedDate: new Date("2022-08-10"),
        genre: genres.Cooking,
        pages: 245,
    },
    // Drama (2 books)
    {
        title: "The Family Secret",
        author: "Daniel Harris",
        description: "A powerful drama exploring the impact of long-buried family secrets on relationships and personal identity.",
        isbn: "978-0-1234-5679-9",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
        publishedDate: new Date("2021-03-22"),
        genre: genres.Drama,
        pages: 378,
    },
    {
        title: "Broken Promises",
        author: "Rachel Adams",
        description: "An emotional journey through love, loss, and redemption in a small town where everyone knows everyone's business.",
        isbn: "978-0-1234-5680-0",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2022-11-14"),
        genre: genres.Drama,
        pages: 412,
    },
    // Fantasy (3 books)
    {
        title: "The Realm of Shadows",
        author: "Alexandra Knight",
        description: "An epic fantasy adventure in a world where magic and darkness collide, following a young mage's quest to save her kingdom.",
        isbn: "978-0-1234-5680-1",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/712cDO7d73L.jpg",
        publishedDate: new Date("2020-09-05"),
        genre: genres.Fantasy,
        pages: 567,
    },
    {
        title: "Dragons of the North",
        author: "Christopher Stone",
        description: "A thrilling fantasy tale of dragon riders and ancient prophecies in a land where mythical creatures still roam free.",
        isbn: "978-0-1234-5680-2",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81zN2U0A1kL.jpg",
        publishedDate: new Date("2021-06-18"),
        genre: genres.Fantasy,
        pages: 489,
    },
    {
        title: "The Enchanted Sword",
        author: "Victoria Moon",
        description: "A magical quest to find a legendary sword that can restore balance to a world torn apart by war and chaos.",
        isbn: "978-0-1234-5680-3",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2023-03-12"),
        genre: genres.Fantasy,
        pages: 523,
    },
    // Fiction (3 books)
    {
        title: "The Last Summer",
        author: "Nathaniel Brooks",
        description: "A poignant coming-of-age story set in a small coastal town, exploring themes of friendship, first love, and growing up.",
        isbn: "978-0-1234-5680-4",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2022-07-08"),
        genre: genres.Fiction,
        pages: 298,
    },
    {
        title: "Midnight Conversations",
        author: "Isabella Rose",
        description: "A beautifully written novel about two strangers who meet by chance and discover they have more in common than they thought.",
        isbn: "978-0-1234-5680-5",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
        publishedDate: new Date("2021-10-30"),
        genre: genres.Fiction,
        pages: 334,
    },
    {
        title: "The Art of Letting Go",
        author: "Michael Foster",
        description: "A moving story about learning to move forward after loss, finding hope in unexpected places.",
        isbn: "978-0-1234-5680-6",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91Q5d6Tc6OL.jpg",
        publishedDate: new Date("2023-04-25"),
        genre: genres.Fiction,
        pages: 287,
    },
    // Fiction-story (2 books)
    {
        title: "Tales from the Old Town",
        author: "Margaret Clark",
        description: "A collection of interconnected short stories that paint a vivid picture of life in a charming old town.",
        isbn: "978-0-1234-5680-7",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QxYz8VHxL.jpg",
        publishedDate: new Date("2020-11-12"),
        genre: genres.FictionStory,
        pages: 256,
    },
    {
        title: "The Storyteller's Gift",
        author: "Oliver James",
        description: "A heartwarming tale about an elderly storyteller who passes down wisdom and stories to the next generation.",
        isbn: "978-0-1234-5680-8",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIo8EGsL.jpg",
        publishedDate: new Date("2022-02-20"),
        genre: genres.FictionStory,
        pages: 223,
    },
    // Fiction1 (2 books)
    {
        title: "Parallel Lives",
        author: "Jessica Moore",
        description: "A thought-provoking novel exploring how small choices can lead to completely different life paths.",
        isbn: "978-0-1234-5680-9",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg",
        publishedDate: new Date("2021-05-15"),
        genre: genres.Fiction1,
        pages: 356,
    },
    {
        title: "The Time Between",
        author: "Robert Kim",
        description: "An introspective story about the moments that define us and the spaces between major life events.",
        isbn: "978-0-1234-5681-0",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81zN2U0A1kL.jpg",
        publishedDate: new Date("2023-08-05"),
        genre: genres.Fiction1,
        pages: 312,
    },
    // Fiction3 (2 books)
    {
        title: "Echoes of Yesterday",
        author: "Linda Martinez",
        description: "A compelling narrative about how the past influences the present and shapes our future decisions.",
        isbn: "978-0-1234-5681-1",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/712cDO7d73L.jpg",
        publishedDate: new Date("2022-09-18"),
        genre: genres.Fiction3,
        pages: 389,
    },
    {
        title: "The Unseen Thread",
        author: "Thomas Anderson",
        description: "A beautifully crafted story about the invisible connections that bind us all together.",
        isbn: "978-0-1234-5681-2",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91Q5d6Tc6OL.jpg",
        publishedDate: new Date("2021-12-10"),
        genre: genres.Fiction3,
        pages: 267,
    },
    // Fiction4 (2 books)
    {
        title: "Beyond the Horizon",
        author: "Catherine Lee",
        description: "An inspiring tale of adventure and self-discovery as characters journey beyond their known world.",
        isbn: "978-0-1234-5681-3",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
        publishedDate: new Date("2020-06-25"),
        genre: genres.Fiction4,
        pages: 445,
    },
    {
        title: "The Fourth Dimension",
        author: "Steven Wright",
        description: "A mind-bending exploration of reality, perception, and the nature of existence itself.",
        isbn: "978-0-1234-5681-4",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81Th0bAZJDL.jpg",
        publishedDate: new Date("2023-01-28"),
        genre: genres.Fiction4,
        pages: 378,
    },
    // Health & Fitness (2 books)
    {
        title: "The Complete Fitness Guide",
        author: "Dr. Mark Johnson",
        description: "A comprehensive guide to achieving optimal health and fitness through science-based nutrition and exercise strategies.",
        isbn: "978-0-1234-5681-5",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIo8EGsL.jpg",
        publishedDate: new Date("2022-03-15"),
        genre: genres.HealthFitness,
        pages: 298,
    },
    {
        title: "Mindful Movement: Yoga and Meditation",
        author: "Priya Sharma",
        description: "Learn how to integrate yoga and meditation into your daily routine for better physical and mental well-being.",
        isbn: "978-0-1234-5681-6",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71h5+dp8vIL.jpg",
        publishedDate: new Date("2021-07-22"),
        genre: genres.HealthFitness,
        pages: 234,
    },
    // History (3 books)
    {
        title: "The Great Wars: A Historical Account",
        author: "Professor James Wilson",
        description: "A detailed examination of the major conflicts that shaped the modern world, with insights from primary sources.",
        isbn: "978-0-1234-5681-7",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81VStYnDGrL.jpg",
        publishedDate: new Date("2020-04-10"),
        genre: genres.History,
        pages: 678,
    },
    {
        title: "Ancient Civilizations Uncovered",
        author: "Dr. Sarah Mitchell",
        description: "Explore the rise and fall of ancient empires, from Egypt to Rome, through archaeological discoveries and historical records.",
        isbn: "978-0-1234-5681-8",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIo8EGsL.jpg",
        publishedDate: new Date("2022-11-20"),
        genre: genres.History,
        pages: 512,
    },
    {
        title: "The Renaissance Era",
        author: "Dr. Leonardo Rossi",
        description: "A comprehensive study of the Renaissance period, its art, culture, and the revolutionary ideas that changed Europe forever.",
        isbn: "978-0-1234-5681-9",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2021-09-05"),
        genre: genres.History,
        pages: 445,
    },
    // Horror (2 books)
    {
        title: "The Haunting of Blackwood Manor",
        author: "Emily Dark",
        description: "A spine-chilling horror story about a family who moves into an old mansion only to discover it's haunted by malevolent spirits.",
        isbn: "978-0-1234-5682-0",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81Th0bAZJDL.jpg",
        publishedDate: new Date("2022-10-31"),
        genre: genres.Horror,
        pages: 389,
    },
    {
        title: "Midnight Shadows",
        author: "Victor Black",
        description: "A terrifying tale of a small town plagued by mysterious disappearances and dark forces that lurk in the shadows.",
        isbn: "978-0-1234-5682-1",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QxYz8VHxL.jpg",
        publishedDate: new Date("2023-05-15"),
        genre: genres.Horror,
        pages: 412,
    },
    // Mystery (3 books)
    {
        title: "The Vanishing Case",
        author: "Detective John Miller",
        description: "A gripping mystery novel following a seasoned detective as he unravels a complex case of a missing person with unexpected twists.",
        isbn: "978-0-1234-5682-2",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91Q5d6Tc6OL.jpg",
        publishedDate: new Date("2021-08-12"),
        genre: genres.Mystery,
        pages: 356,
    },
    {
        title: "The Secret Code",
        author: "Amanda Cross",
        description: "An intriguing mystery involving cryptic codes, hidden messages, and a race against time to solve a decades-old puzzle.",
        isbn: "978-0-1234-5682-3",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QxYz8VHxL.jpg",
        publishedDate: new Date("2022-06-25"),
        genre: genres.Mystery,
        pages: 323,
    },
    {
        title: "Murder at the Mansion",
        author: "Agatha Styles",
        description: "A classic whodunit set in an isolated mansion where everyone is a suspect in a baffling murder case.",
        isbn: "978-0-1234-5682-4",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81Th0bAZJDL.jpg",
        publishedDate: new Date("2020-12-18"),
        genre: genres.Mystery,
        pages: 298,
    },
    // Non-Fiction (2 books)
    {
        title: "Understanding the Universe",
        author: "Dr. Neil Carter",
        description: "An accessible exploration of cosmology, quantum physics, and the mysteries of the universe for curious minds.",
        isbn: "978-0-1234-5682-5",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIo8EGsL.jpg",
        publishedDate: new Date("2023-02-14"),
        genre: genres.NonFiction,
        pages: 445,
    },
    {
        title: "The Science of Happiness",
        author: "Dr. Lisa Park",
        description: "Evidence-based insights into what truly makes us happy, drawing from psychology, neuroscience, and behavioral research.",
        isbn: "978-0-1234-5682-6",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81zN2U0A1kL.jpg",
        publishedDate: new Date("2022-05-30"),
        genre: genres.NonFiction,
        pages: 312,
    },
    // Philosophy (2 books)
    {
        title: "The Meaning of Life: A Philosophical Inquiry",
        author: "Professor Alan Thompson",
        description: "A deep dive into existential questions about purpose, meaning, and the human condition through the lens of philosophy.",
        isbn: "978-0-1234-5682-7",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
        publishedDate: new Date("2021-11-08"),
        genre: genres.Philosophy,
        pages: 389,
    },
    {
        title: "Ethics in Modern Times",
        author: "Dr. Maria Santos",
        description: "An examination of ethical dilemmas in contemporary society and how ancient philosophical principles apply today.",
        isbn: "978-0-1234-5682-8",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
        publishedDate: new Date("2023-06-20"),
        genre: genres.Philosophy,
        pages: 334,
    },
    // Poetry (2 books)
    {
        title: "Whispers of the Heart",
        author: "Poet Maya Rivers",
        description: "A beautiful collection of poems exploring themes of love, loss, nature, and the human experience with lyrical elegance.",
        isbn: "978-0-1234-5682-9",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/712cDO7d73L.jpg",
        publishedDate: new Date("2022-04-12"),
        genre: genres.Poetry,
        pages: 156,
    },
    {
        title: "Urban Verses",
        author: "Alex Turner",
        description: "Modern poetry capturing the rhythm and soul of city life, with verses that reflect contemporary urban experiences.",
        isbn: "978-0-1234-5683-0",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71h5+dp8vIL.jpg",
        publishedDate: new Date("2021-12-25"),
        genre: genres.Poetry,
        pages: 128,
    },
];
function seed50Books() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect("mongodb+srv://sportFacility:eE8vmF9Tq8ebFt5s@cluster0.eep6yze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("✅ Connected to MongoDB");
            // Get the first user from the database or use default
            const DEFAULT_USER_ID = "673a0ad83e3e75c0f3804dab";
            let user = yield user_model_1.UserRegModel.findOne({ isDeleted: false });
            if (!user) {
                console.log(`⚠️  No user found, using default user ID: ${DEFAULT_USER_ID}`);
            }
            else {
                console.log(`✅ Using user ID: ${user._id}`);
            }
            const userId = ((_a = user === null || user === void 0 ? void 0 : user._id) === null || _a === void 0 ? void 0 : _a.toString()) || DEFAULT_USER_ID;
            // Add user ID and required fields to each book
            const booksWithUser = dummyBooks.map((book) => (Object.assign(Object.assign({}, book), { user: userId, isDeleted: false, isPublished: true })));
            // Insert books
            const result = yield book_model_1.default.insertMany(booksWithUser);
            console.log(`\n✅ Successfully seeded ${result.length} books!`);
            console.log("\n📚 Books created by genre:");
            // Group by genre for display
            const booksByGenre = {};
            result.forEach((book) => {
                var _a;
                const genreId = (_a = book.genre) === null || _a === void 0 ? void 0 : _a.toString();
                const genreName = Object.keys(genres).find(key => genres[key] === genreId) || 'Unknown';
                if (!booksByGenre[genreName]) {
                    booksByGenre[genreName] = [];
                }
                booksByGenre[genreName].push(`${book.title} by ${book.author}`);
            });
            Object.keys(booksByGenre).forEach((genre) => {
                console.log(`\n${genre} (${booksByGenre[genre].length} books):`);
                booksByGenre[genre].forEach((book, index) => {
                    console.log(`  ${index + 1}. ${book}`);
                });
            });
            process.exit(0);
        }
        catch (error) {
            console.error("❌ Error seeding books:", error);
            process.exit(1);
        }
    });
}
seed50Books();
